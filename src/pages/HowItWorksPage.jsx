import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, ArrowRight, Layers, Database, Cloud, Zap, 
  Cpu, Server, Users, BarChart2, ShieldCheck, GitBranch,
  Github, Twitter, Linkedin, ArrowDown, Terminal, HardDrive
} from 'lucide-react';

/**
 * PublicHeader Component
 * A self-contained header for our public-facing pages (Home, How It Works)
 */
const PublicHeader = () => (
  <header className="w-full bg-white/90 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg">
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
      <Link to="/" className="text-3xl font-bold text-indigo-600">
        SyncDocs
      </Link>
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-600 font-medium hover:text-indigo-600 transition-colors">Home</Link>
        <Link to="/how-it-works" className="text-gray-600 font-medium hover:text-indigo-600 transition-colors">How It Works</Link>
        <a href="https://vpjoshi.in" className="text-gray-600 font-medium hover:text-indigo-600 transition-colors">Portfolio</a>
      </div>
      <div className="flex items-center space-x-3">
        <Link
          to="/auth"
          className="px-5 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors duration-200"
        >
          Login
        </Link>
        <Link
          to="/auth"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
        >
          Get Started
        </Link>
      </div>
    </nav>
  </header>
);

/**
 * PublicFooter Component
 * A self-contained, professional footer.
 */
const PublicFooter = () => (
  <footer className="w-full bg-gray-900 text-gray-400 py-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
      {/* Column 1: Brand */}
      <div className="md:col-span-1">
        <h1 className="text-3xl font-bold text-white mb-4">SyncDocs</h1>
        <p className="text-base mb-4">The future of collaboration.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white"><Github className="w-6 h-6" /></a>
          <a href="#" className="hover:text-white"><Twitter className="w-6 h-6" /></a>
          <a href="#" className="hover:text-white"><Linkedin className="w-6 h-6" /></a>
        </div>
      </div>
      {/* Column 2: Product */}
      <div>
        <h5 className="text-lg font-semibold text-white mb-4">Product</h5>
        <ul className="space-y-3">
          <li><Link to="/#features" className="hover:text-white transition-colors">Features</Link></li>
          <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
          <li><Link to="/auth" className="hover:text-white transition-colors">Sign Up</Link></li>
        </ul>
      </div>
      {/* Column 3: Company */}
      <div>
        <h5 className="text-lg font-semibold text-white mb-4">Company</h5>
        <ul className="space-y-3">
          <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
        </ul>
      </div>
      {/* Column 4: Legal */}
      <div>
        <h5 className="text-lg font-semibold text-white mb-4">Legal</h5>
        <ul className="space-y-3">
          <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-gray-700 mt-12 pt-8 px-6 text-center">
      <p>&copy; {new Date().getFullYear()} SyncDocs. A Hackathon Project. All rights reserved.</p>
    </div>
  </footer>
);

/**
 * HowItWorksPage Component
 * The main component for this route, explaining our system.
 * Sidebar has been removed, and content is massively expanded.
 */
const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col antialiased font-sans">
      <PublicHeader />

      {/* --- Notice Bar --- */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-3 px-6">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg">
                <Info className="h-6 w-6 text-white" />
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">Want to see the Full Docs?</span>
                <span className="hidden md:inline">
                  This is not a technical deep-dive. If you want to see the official docs, click --&gt;
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                JoshiDocs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="w-full flex-grow py-16 px-6">
        {/* --- Article Content --- */}
        <article className="prose prose-indigo lg:prose-lg max-w-4xl mx-auto">
          <h1 className="!text-5xl !font-extrabold !text-gray-900 !mb-6 text-center">
            How SyncDocs Works
          </h1>
          <p className="text-2xl text-gray-600 !mb-12 text-center">
            Our architecture is built from the ground up to be scalable, resilient, and blazing fast. 
            We use a modern, event-driven design to ensure real-time collaboration just works, 
            even under high load.
          </p>
          
          <img
            src="https://placehold.co/1000x500/E0E7FF/3730A3?text=SyncDocs+Full+System+Architecture"
            alt="SyncDocs Full System Architecture"
            className="w-full rounded-lg shadow-2xl my-12 border border-gray-200"
            onError={(e) => e.target.style.display='none'}
          />

          {/* --- Section 1: Overview --- */}
          <section id="overview" className="my-16">
            <h2>The Core Philosophy: Decoupling</h2>
            <p>
              At its core, SyncDocs is not a single "monolithic" application. It's a collection of 
              small, independent microservices that communicate using a central "message bus" (Apache Kafka).
              This is known as an **Event-Driven Architecture**.
            </p>
            <p>
              This design means that different parts of our app (like handling your connection, saving your 
              document, or running analytics) are all separate. If one part fails or slows down, it 
              doesn't crash the entire system. This gives us three main advantages:
            </p>
            <ul className="!my-8">
              <li><strong>Fault Tolerance:</strong> If the database-writer crashes, you can still type. Your work is safely queued, not lost.</li>
              <li><strong>Scalability:</strong> If 10,000 users log on, we can scale *just* the connection servers, not the whole app.</li>
              <li><strong>Extensibility:</strong> We can add new features (like analytics) by just adding a new "listener" to the message bus, without touching the core code.</li>
            </ul>
          </section>

          {/* --- Section 2: Hybrid Architecture --- */}
          <section id="architecture" className="my-16">
            <h2>Our Hybrid Cloud Architecture</h2>
            <p>
              We use a "best-of-both-worlds" approach, combining serverless functions for scalability and containerized microservices for complex, stateful work.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
              {/* Card 1: Serverless */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4 mb-3">
                  <Cloud className="w-10 h-10 text-green-600" />
                  <h3 className="text-2xl font-semibold text-gray-900">Serverless Components</h3>
                </div>
                <p className="text-gray-600 mb-4">For tasks that are stateless and need to scale instantly from zero to infinity.</p>
                <ul className="space-y-2 list-inside list-disc text-gray-700">
                  <li><strong>S3 + CloudFront:</strong> Hosts and delivers our React frontend globally at light speed.</li>
                  <li><strong>API Gateway:</strong> Provides the HTTP endpoints for our auth.</li>
                  <li><strong>AWS Lambda:</strong> Runs our authentication logic (Sign Up, Sign In).</li>
                  <li><strong>DynamoDB:</strong> Securely stores all user and profile data.</li>
                </ul>
              </div>
              
              {/* Card 2: Core App */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4 mb-3">
                  <Server className="w-10 h-10 text-blue-600" />
                  <h3 className="text-2xl font-semibold text-gray-900">Core App (EC2)</h3>
                </div>
                <p className="text-gray-600 mb-4">For stateful, complex, real-time work, all managed by Docker on a single instance.</p>
                <ul className="space-y-2 list-inside list-disc text-gray-700">
                  <li><strong>Backend Container:</strong> Manages all live Socket.io connections.</li>
                  <li><strong>Broker Container:</strong> The central message bus (Kafka/Mosquitto).</li>
                  <li><strong>Processor Container:</strong> The "worker" that saves data to disk.</li>
                  <li><strong>Analytics Container:</strong> A second "worker" for background jobs.</li>
                </ul>
              </div>
            </div>
            
            <img
              src="https://placehold.co/1000x500/F3F4F6/1F2937?text=Serverless+vs+Core+App+Containers"
              alt="Serverless vs Core App Containers"
              className="w-full rounded-lg shadow-xl my-8 border border-gray-200"
              onError={(e) => e.target.style.display='none'}
            />
          </section>

          {/* --- Section 3: Data Flow --- */}
          <section id="data-flow" className="my-16">
            <h2>The Data Flow: What Happens When You Type</h2>
            <p>
              When you type a single letter, a rapid, decoupled sequence of events is triggered.
            </p>
            
            {/* Step-by-step cards */}
            <div className="space-y-8 my-10 not-prose">
              <FlowStep 
                num="1" 
                title="Client Emits Event" 
                text="Your browser sends a `doc-change` event via Socket.io to the Backend Container. This message is tiny and fast."
                icon={<Zap className="w-6 h-6 text-white" />}
              />
              <FlowStep 
                num="2" 
                title="Live Broadcast (UI Update)" 
                text="The Backend Container immediately broadcasts this `doc-change` to all other users in the same room. This is the 'real-time' collaboration you see."
                icon={<Users className="w-6 h-6 text-white" />}
              />
              <FlowStep 
                num="3" 
                title="Event Production (Persistence)" 
                text="Simultaneously, the Backend Container produces the same event to the 'doc-events' topic on the Broker. This message is now queued and guaranteed to be processed."
                icon={<Layers className="w-6 h-6 text-white" />}
              />
              <FlowStep 
                num="4" 
                title="Event Consumption (Fan-Out)" 
                text="The Broker delivers the message to ALL subscribing services. This is a 'fan-out' pattern. Both the Processor and Analytics containers receive a copy."
                icon={<GitBranch className="w-6 h-6 text-white" />}
              />
              <FlowStep 
                num="5" 
                title="Processor Saves Data" 
                text="The Processor Container receives the event, applies the change to the master document on the EBS volume, and saves it. Your data is now persistent."
                icon={<HardDrive className="w-6 h-6 text-white" />}
              />
            </div>
            
            <h3>Why not just save to the database directly in Step 2?</h3>
            <p>
              This is the most critical design choice. By separating the "live broadcast" from the "database save," we ensure the user's UI is *never* blocked by a slow database write. The live collaboration feels instant, and the persistence is guaranteed to happen, even if it's a few milliseconds behind. This is called a **Write-Behind Cache** pattern.
            </p>
          </section>

          {/* --- Section 4: Deployment Strategy --- */}
          <section id="deployment-strategy" className="my-16">
            <h2>The "2-Copy" Deployment Strategy</h2>
            <p>
              Our architecture is built to run on anything. To prove this, we maintain two identical-looking environments with one key difference, all managed by a single "Adapter" in our code.
            </p>
            
            <img
              src="https://placehold.co/1000x300/111827/FFFFFF?text=Docker+%2B+Kafka+%2B+Mosquitto+%2B+Node.js"
              alt="Technology Logos"
              className="w-full rounded-lg shadow-xl my-8"
              onError={(e) => e.target.style.display='none'}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
              {/* Card 1: Local Dev */}
              <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg">
                <div className="flex items-center space-x-4 mb-3">
                  <Terminal className="w-8 h-8 text-gray-700" />
                  <h3 className="text-2xl font-semibold text-gray-900">Local Dev (GitHub)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  This is what we show on GitHub. It's the "full-scale" version that proves we can work with enterprise-grade tools.
                </p>
                <ul className="space-y-2 list-inside list-disc text-gray-700">
                  <li><strong>Broker:</strong> `bitnami/kafka` (Real Kafka)</li>
                  <li><strong>Client Lib:</strong> `kafkajs`</li>
                  <li><strong>Environment:</strong> `BROKER_TYPE=KAFKA`</li>
                  <li><strong>Pro:</strong> Proves enterprise-readiness.</li>
                </ul>
              </div>
              
              {/* Card 2: Production */}
              <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg">
                <div className="flex items-center space-x-4 mb-3">
                  <Cloud className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-semibold text-gray-900">Production (t3.micro)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  This is our lightweight, high-performance deployment for our low-resource server.
                </p>
                <ul className="space-y-2 list-inside list-disc text-gray-700">
                  <li><strong>Broker:</strong> `eclipse-mosquitto` (MQTT)</li>
                  <li><strong>Client Lib:</strong> `mqtt.js`</li>
                  <li><strong>Environment:</strong> `BROKER_TYPE=MQTT`</li>
                  <li><strong>Pro:</strong> 1/10th the RAM, just as fast.</li>
                </ul>
              </div>
            </div>
            <p>
              A single `utils/broker.js` file in our app contains an `if/else` statement. It checks the `BROKER_TYPE` environment variable and loads the correct library. The rest of the app just calls `broker.sendMessage()` and doesn't know (or care) which system is underneath.
            </p>
          </section>

          {/* --- Section 5: Scalability & Resilience --- */}
          <section id="scalability-resilience" className="my-16">
            <h2>Scalability & True Resilience</h2>
            <p>
              This design isn't just theoretical. It solves real-world problems.
            </p>
            
            <h3>What if the Processor Crashes?</h3>
            <p>
              In a normal app, if the server saving your data crashes, all data sent during that time is lost. Not here.
            </p>
            <ol className="!my-8">
              <li>A user is typing. The `processor-container` crashes.</li>
              <li>The user keeps typing. The `backend-container` is still running.</li>
              <li>All `doc-change` events are safely queued in the `broker-container`. No data is lost.</li>
              <li>Docker automatically restarts the `processor-container`.</li>
              <li>The processor reconnects to the broker, sees the backlog of messages, and processes them all in order.</li>
            </ol>
            <p><strong>Result:</strong> The user experienced zero downtime and zero data loss.</p>

            <img
              src="https://placehold.co/1000x400/FFFBEB/B45309?text=Fault+Tolerance+with+Message+Queues"
              alt="Fault Tolerance Diagram"
              className="w-full rounded-lg shadow-xl my-8 border border-gray-200"
              onError={(e) => e.target.style.display='none'}
            />

            <h3>What if we get 10x the traffic?</h3>
            <p>
              We can scale our services independently using Docker Compose.
            </p>
            <ul>
              <li><strong>Problem:</strong> Too many users connected, Socket.io is slow.
                <br />
                <strong>Solution:</strong> `docker-compose up --scale backend=5`. We now have 5 `backend-container`s handling connections.
              </li>
              <li><strong>Problem:</strong> Users are typing too fast, saving to disk is slow.
                <br />
                <strong>Solution:</strong> `docker-compose up --scale processor=3`. Kafka (or Mosquitto with shared subscriptions) will automatically load-balance the events across all 3 processors, tripling our write speed.
              </li>
            </ul>
          </section>
          
        </article>
      </div>

      <PublicFooter />
    </div>
  );
};

/**
 * FlowStep Component
 * A self-contained card for the "Data Flow" section.
 */
const FlowStep = ({ num, title, text, icon }) => (
  <div className="flex items-start space-x-6">
    <div className="flex-shrink-0 flex flex-col items-center">
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-xl">
        {num}
      </span>
      {num !== "5" && (
        <div className="w-0.5 h-16 bg-gray-300 mt-4" />
      )}
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-lg text-gray-600">{text}</p>
    </div>
  </div>
);

export default HowItWorksPage;