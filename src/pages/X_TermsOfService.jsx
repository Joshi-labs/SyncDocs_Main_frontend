import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, FileText, XOctagon } from 'lucide-react';

const X_TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col antialiased font-sans">
      
      {/* --- Header / Navbar  --- */}
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

      {/* --- Main Content: Terms of Service --- */}
      <main className="flex-grow py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 border-b pb-4">
            Terms of Service
          </h1>
          <p className="text-gray-500 mb-8 text-lg">
            Effective Date: November 25, 2025
          </p>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By accessing or using the SyncDocs service ("Service"), you agree to be bound by these **Terms of Service** ("Terms") and our **Privacy Policy**. If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              2. User Accounts and Eligibility
            </h2>
            <ul className="space-y-3 pl-5 list-disc text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">Account Responsibility:</span> You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Minimum Age:</span> The Service is only available to users who are at least 13 years old. If you are under 18, you must have permission from a legal guardian.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              3. Content and Ownership
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <FileText className="w-5 h-5 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Your Content:</span> You retain all ownership rights to the documents and content you create and store on SyncDocs. We claim no ownership over your content.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                <span><span className="font-semibold">License to SyncDocs:</span> By uploading content, you grant SyncDocs a worldwide, non-exclusive, royalty-free license to use, host, store, and display your content only as necessary to provide, improve, and promote the Service (e.g., syncing and sharing).</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              4. Prohibited Uses
            </h2>
            <p className="text-gray-700">
              You agree not to use the Service:
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-700 mt-4">
              <li>
                <XOctagon className="w-5 h-5 text-red-600 inline mr-2" />
                For any unlawful purpose or to promote illegal activities.
              </li>
              <li>
                <XOctagon className="w-5 h-5 text-red-600 inline mr-2" />
                To violate the rights of others, including privacy and intellectual property rights.
              </li>
              <li>
                <XOctagon className="w-5 h-5 text-red-600 inline mr-2" />
                To transmit any malicious or unsolicited software, including viruses or malware.
              </li>
              <li>
                <XOctagon className="w-5 h-5 text-red-600 inline mr-2" />
                To harass, abuse, or harm another person or group.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              5. Termination
            </h2>
            <p className="text-gray-700">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section className="pt-4 border-t">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us:
            </p>
            <p className="text-lg font-semibold text-indigo-600 mt-2">
              Email: support@vpjoshi.com
            </p>
          </section>

        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="w-full bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} SyncDocs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default X_TermsOfService;