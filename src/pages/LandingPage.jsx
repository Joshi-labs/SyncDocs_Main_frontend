import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Share2, FileText, Clock, ShieldCheck, Download, 
  Github, Twitter, Linkedin, CheckCircle 
} from 'lucide-react';

/**
 * FeatureCard Component
 * Inlined here to make the LandingPage self-contained.
 */
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-105">
    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-5">
      {icon}
    </div>
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600 text-base">{description}</p>
  </div>
);

/**
 * LandingPage Component
 * A full, professional-grade landing page.
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col antialiased font-sans">
      
      {/* --- Header / Navbar --- */}
      <header className="w-full bg-white/90 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg">
        <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/" className="text-3xl font-bold text-indigo-600">
            SyncDocs
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 font-medium hover:text-indigo-600 transition-colors">Home</a>
            <a href="/#/how-it-works" className="text-gray-600 font-medium hover:text-indigo-600 transition-colors">How It Works</a>
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

      {/* --- Main Content --- */}
      <main className="flex-grow">
        
        {/* --- Hero Section --- */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-24 px-6">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 font-semibold rounded-full text-sm mb-4">
                Powered by Event-Driven Architecture
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Collaborate Without the Chaos.
              </h1>
              <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0 mb-10">
                SyncDocs is the clean, fast, and simple way for your team to create, edit, and share documents in real-time. Stop emailing files and start collaborating.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <Link
                  to="/auth"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
                >
                  Start for Free
                </Link>
                <a
                  href="#features"
                  className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Learn More
                </a>
              </div>
            </div>
            
            {/* Illustration / Image */}
            <div className="flex justify-center">
              <img
                src="https://placehold.co/600x450/E0E7FF/3730A3?text=Real-time+Collaboration\nIllustration"
                alt="Real-time Collaboration Illustration"
                className="rounded-lg shadow-2xl"
                onError={(e) => e.target.style.display='none'}
              />
            </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything you need. Nothing you don't.
              </h2>
              <p className="text-lg text-gray-600">
                Focus on your work, not on fighting your tools. We provide the essential features for seamless collaboration.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="w-8 h-8 text-indigo-600" />}
                title="Blazing Fast Sync"
                description="Our event-driven backend syncs changes instantly across all users. No lag, no waiting."
              />
              <FeatureCard
                icon={<Share2 className="w-8 h-8 text-indigo-600" />}
                title="Simple Sharing"
                description="Share with a single, secure link. Control who can view, comment, or edit with ease."
              />
              <FeatureCard
                icon={<FileText className="w-8 h-8 text-indigo-600" />}
                title="Clean Workspace"
                description="A minimal, distraction-free interface that lets you and your team focus on the content."
              />
              <FeatureCard
                icon={<Clock className="w-8 h-8 text-indigo-600" />}
                title="Version History"
                description="Never lose your work. Automatically save versions and restore to any previous point in time."
              />
              <FeatureCard
                icon={<ShieldCheck className="w-8 h-8 text-indigo-600" />}
                title="Secure & Private"
                description="Your documents are encrypted and your data is yours. We're built on secure, modern architecture."
              />
              <FeatureCard
                icon={<Download className="w-8 h-8 text-indigo-600" />}
                title="Export Anywhere"
                description="Easily export your documents to PDF, Markdown, or plain text to use in other applications."
              />
            </div>
          </div>
        </section>

        {/* --- How It Works Section --- */}
        <section id="how-it-works" className="bg-white py-24">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Get started in 3 simple steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full border-8 border-indigo-50 mb-6">
                  <span className="text-3xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Create Your Account</h3>
                <p className="text-gray-600">Sign up for free in seconds. No credit card required.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full border-8 border-indigo-50 mb-6">
                  <span className="text-3xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Start a New Document</h3>
                <p className="text-gray-600">Create a new doc from your dashboard with a single click.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full border-8 border-indigo-50 mb-6">
                  <span className="text-3xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Invite & Collaborate</h3>
                <p className="text-gray-600">Share a link to invite your team and start editing together.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Call to Action (CTA) Section --- */}
        <section id="pricing" className="bg-indigo-600">
          <div className="max-w-5xl mx-auto text-center py-20 px-6">
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Collaborating for Free
            </h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
              Join thousands of teams who are building, planning, and creating together on SyncDocs.
            </p>
            <Link
              to="/auth"
              className="bg-white text-indigo-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Sign Up Now
            </Link>
          </div>
        </section>

      </main>

      {/* --- Footer --- */}
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
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/auth" className="hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Company</h5>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
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
    </div>
  );
};

export default LandingPage;
