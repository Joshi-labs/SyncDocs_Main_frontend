# SyncDocs

**Real-time collaborative document editing at scale — built on Amazon EKS, Kafka, and Operational Transformation.**

![Platform](https://img.shields.io/badge/platform-Amazon%20EKS-orange?style=flat-square&logo=amazon-aws)
![Kafka](https://img.shields.io/badge/messaging-AWS%20MSK%20%28Kafka%29-black?style=flat-square&logo=apachekafka)
![Node.js](https://img.shields.io/badge/backend-Node.js-339933?style=flat-square&logo=nodedotjs)
![React](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB?style=flat-square&logo=react)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)

> **Live at [sync-docs.vpjoshi.in](https://sync-docs.vpjoshi.in)** — deployed on Amazon EKS across 3 availability zones in `ap-south-1`.

---

## What is SyncDocs?

SyncDocs is a production-grade real-time collaborative document editor. Multiple users can edit the same document simultaneously — changes are synced in real time using a **delta-based approach** where only diffs are transmitted and stored, not the full document on every keystroke.

Concurrent edit conflicts are resolved via an **Operational Transformation (OT) algorithm**, ensuring every client converges to the same document state regardless of network order or edit timing.

---

## Why is this hard?

| Problem | Naive Approach | SyncDocs Approach |
|---|---|---|
| Concurrent edits | Last write wins → data loss | Operational Transformation |
| Write throughput at scale | Backend overwhelmed on spikes | Kafka (MSK) absorbs bursts |
| Full-doc sync on every keystroke | Massive bandwidth waste | Delta ops — only diffs |
| Stateful WebSocket scaling | Session stickiness, hard to scale | Stateless JWT, any pod serves any client |
| Multi-AZ shared storage | Per-pod local files, data split | EFS ReadWriteMany across all AZs |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
              ┌────────────▼────────────┐
              │   CloudFront (CDN)      │  ← static React SPA (S3 + OAC)
              └────────────┬────────────┘
                           │ REST / WebSocket
              ┌────────────▼────────────┐
              │  API Gateway + Lambda   │  ← auth only (JWT via DynamoDB)
              └────────────┬────────────┘
                           │ JWT
┌──────────────────────────▼──────────────────────────────────────┐
│                    Amazon EKS (ap-south-1)                       │
│                                                                  │
│   AZ-1a              AZ-1b              AZ-1c                    │
│  ┌──────────┐       ┌──────────┐       ┌──────────┐             │
│  │ Node.js  │       │ Node.js  │       │ Node.js  │  ← REST+WS  │
│  │ API pods │       │ API pods │       │ API pods │             │
│  └────┬─────┘       └────┬─────┘       └────┬─────┘             │
│       └────────────────┬─┘─────────────────┘                    │
│                        │ Kafka produce                           │
│           ┌────────────▼──────────────┐                         │
│           │      AWS MSK (Kafka)       │  ← 3 brokers, 1/AZ     │
│           │  • doc.delta.ops          │     RF = 3              │
│           │  • analytics.events       │                         │
│           └──────┬──────────┬─────────┘                         │
│                  │          │ consume                            │
│          ┌───────▼───┐  ┌───▼───────┐                           │
│          │IO Processor│  │Analytics  │  ← KEDA scaled on lag    │
│          │ (consumer) │  │(consumer) │                           │
│          └───────┬────┘  └───────────┘                          │
│                  │ write                                         │
│          ┌───────▼───────────────────┐                          │
│          │  Amazon EFS (ReadWriteMany)│  ← shared across all AZs│
│          └───────────────────────────┘                          │
└──────────────────────────────────────────────────────────────────┘
```

### How a single edit flows through the system

1. User types → client computes a **delta op** (diff only, not full doc)
2. Delta sent over **WebSocket** to Node.js API pod
3. API pod **broadcasts** the delta to all other connected clients on that doc (real-time peer sync)
4. API pod **publishes** the delta to `doc.delta.ops` on MSK
5. **IO Processor** consumes the event, applies **OT**, and persists the new document state to **EFS**
6. If two users edit concurrently, OT transforms their ops so both converge to the same final state

---

## Tech Stack

**Frontend**
- React + Vite — SPA collaborative editor UI
- Tailwind CSS — utility-first styling
- WebSocket client — real-time delta sync
- CloudFront + S3 (OAC) — CDN-served static assets, zero origin hits

**Backend**
- Node.js — REST + WebSocket API server
- Kafka producer (MSK) — publishes delta ops to `doc.delta.ops`
- JWT validation — stateless auth on every request, no session store

**Auth**
- AWS Lambda + API Gateway — serverless auth handler, scales to zero
- DynamoDB — user credential storage
- JWT — stateless session tokens (24h expiry, validated locally at each pod)

**Messaging & Processing**
- AWS MSK (Kafka) — 3 brokers (1 per AZ), replication factor 3
- IO Processor — Kafka consumer, applies OT algorithm, persists to EFS
- Analytics Processor — independent Kafka consumer for usage metrics
- KEDA — autoscales both consumers based on consumer group lag

**Infrastructure**
- Amazon EKS — multi-AZ Kubernetes across `ap-south-1a/b/c`
- Amazon EFS — `ReadWriteMany` shared filesystem via EFS CSI driver
- HPA — horizontal pod autoscaler for backend pods
- `topologySpreadConstraints` — balanced pod distribution across AZs

---

## Operational Transformation

The core algorithm that makes concurrent editing correct.

```
Document: "Hello"

User A types: insert " World" at pos 5  →  "Hello World"
User B types: insert "!" at pos 5       →  "Hello!"        (concurrent)

Without OT: one op silently overwrites the other  ✗

With OT:
  B's op is transformed against A's op
  → B's insert position adjusted from 5 → 11
  → Final result: "Hello World!"  ✓
```

OT transforms each incoming operation against all concurrent operations already applied — adjusting positions so every connected client converges to identical document state, regardless of network arrival order.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Docker + Docker Compose
- AWS credentials (for MSK, EFS, DynamoDB — or use local mocks)

### Local Development

```bash
# Clone the repo
git clone https://github.com/vpjoshi/sync-docs.git
cd sync-docs

# Install dependencies
npm install

# Copy environment config
cp .env.example .env
# Edit .env with your values (see Environment Variables below)

# Start all services locally
docker compose up -d

# Run the backend
npm run dev:server

# Run the frontend (in a separate terminal)
npm run dev:client
```

Frontend will be available at `http://localhost:5173`.
Backend API at `http://localhost:3000`.

### Environment Variables

```env
# Auth
JWT_SECRET=your_jwt_secret_here

# AWS
AWS_REGION=ap-south-1
DYNAMODB_TABLE=syncdocs-users

# Kafka (MSK or local)
KAFKA_BROKERS=localhost:9092
KAFKA_TOPIC_DELTAS=doc.delta.ops
KAFKA_TOPIC_ANALYTICS=analytics.events

# Storage
EFS_MOUNT_PATH=/efs/docs
```

> For local dev, a `docker-compose.yml` is included that spins up Kafka (Redpanda) and a DynamoDB local mock — no AWS account needed to run locally.

---

## Scalability Design

| Layer | Mechanism | What it solves |
|---|---|---|
| Backend pods | HPA + stateless JWT | Horizontal scale without session stickiness |
| Write ingestion | MSK Kafka buffer | Absorbs traffic spikes, zero data loss |
| IO Processor | KEDA lag-based scaling | Scales precisely to demand, not CPU proxies |
| Storage | EFS ReadWriteMany | All pods across all AZs share one filesystem |
| Availability | Multi-AZ EKS + MSK RF=3 | No single AZ is a SPOF |
| Bandwidth | Delta ops only | Scales with change rate, not document size |

---

## Project Structure

```
sync-docs/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Editor, toolbar, presence indicators
│   │   ├── hooks/        # useWebSocket, useDocument, useAuth
│   │   └── lib/          # OT client-side logic, delta utils
│   └── vite.config.ts
│
├── server/               # Node.js backend
│   ├── src/
│   │   ├── ws/           # WebSocket handler, delta broadcast
│   │   ├── kafka/        # MSK producer setup
│   │   ├── auth/         # JWT middleware
│   │   └── routes/       # REST API routes
│   └── index.js
│
├── io-processor/         # Kafka consumer — OT + EFS persistence
│   └── src/
│       ├── consumer.js   # Kafka consumer group
│       └── ot/           # Operational Transformation engine
│
├── analytics/            # Kafka consumer — usage metrics
├── infra/                # Kubernetes manifests, KEDA ScaledObjects
│   ├── eks/
│   ├── keda/
│   └── efs/
│
└── docker-compose.yml    # Local dev stack (Redpanda + DynamoDB local)
```

---

## License

MIT © [Vansh Prakash Joshi](https://vpjoshi.in)
