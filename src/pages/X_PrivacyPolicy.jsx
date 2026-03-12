import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const X_PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col antialiased font-sans">
      
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

      {/* ---  Privacy Policy --- */}
      <main className="flex-grow py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 border-b pb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mb-8 text-lg">
            Last updated: November 25, 2025
          </p>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              SyncDocs collects information that helps us provide our real-time collaboration service.
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">Account Data:</span> When you sign up, we collect your name, email address, and a hashed password (or credentials from a third-party login service).
              </li>
              <li>
                <span className="font-semibold text-gray-900">Document Content:</span> The content of the documents you create, upload, and share is stored on our servers. This is the core of our service.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Usage Data:</span> We collect non-personal data about how you interact with the service, such as IP addresses, browser type, access times, and referring website addresses, to monitor performance and security.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              Your information is used to power the SyncDocs application and provide you with a seamless experience:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Service Operation:</span> To create, maintain, and secure your account and documents.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Communication:</span> To send you important updates, security alerts, and support messages.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Improvement:</span> To monitor usage and analyze trends to enhance the platform's features and performance.</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              3. Sharing and Disclosure
            </h2>
            <p className="text-gray-700">
              We do not sell your personal data or document content. We may share information only in the following limited circumstances:
            </p>
            <ul className="space-y-3 pl-5 list-disc text-gray-700 mt-4">
              <li>
                <span className="font-semibold text-gray-900">With Your Consent:</span> When you explicitly share a document with another user, your content is shared with them.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Service Providers:</span> We may use trusted third-party services (like hosting or analytics providers) to help us operate the service, but only under strict confidentiality agreements.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Legal Requirements:</span> If required to do so by law or in response to valid requests by public authorities.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              4. Security
            </h2>
            <p className="text-gray-700">
              We are committed to protecting your information. We employ a variety of security measures, including encryption and strict access controls, to maintain the safety of your personal information and document content. However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-10 pt-4 border-t">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              5. Your Choices
            </h2>
            <p className="text-gray-700">
              You have the right to access, update, or delete your account information at any time from your account settings. If you wish to permanently delete your account and all associated documents, please contact us at the email below.
            </p>
          </section>

          <section className="pt-4 border-t">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us:
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

export default X_PrivacyPolicy;