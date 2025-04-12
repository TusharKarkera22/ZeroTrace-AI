import Navbar from './components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

// Simple lock icon component
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Secure Healthcare with ZEROTRACE-AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Train powerful healthcare machine learning models on sensitive patient data 
            while keeping patient data fully private and secure using breakthrough privacy-preserving technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/data-contribution" className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition">
              Contribute Healthcare Data
            </Link>
            <Link href="/train" className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-md font-medium hover:bg-gray-50 transition">
              Train Secure ML Models
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <LockIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy-First Approach</h3>
              <p className="text-gray-600">
                Built on groundbreaking technology to ensure your healthcare data never leaves your control.
                Your data remains encrypted throughout the entire process.
              </p>
            </div>
            
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 rounded-lg text-primary-600 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure ML Model Training</h3>
              <p className="text-gray-600">
                Train machine learning models on distributed healthcare data without ever exposing the underlying patient records.
              </p>
            </div>
            
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 rounded-lg text-primary-600 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Privacy Verification</h3>
              <p className="text-gray-600">
                Our transparent verification system allows you to visually confirm that your data remains secure throughout the computation process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto py-8 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Healthcare Secure ML</h2>
            <p className="text-gray-400">Secure healthcare ML platform powered by privacy-preserving technology.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
              <li><Link href="/data-contribution" className="text-gray-400 hover:text-white">Contribute Data</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Center</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/compliance" className="text-gray-400 hover:text-white">HIPAA Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">info@securehealth.example</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2023 SecureHealth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 