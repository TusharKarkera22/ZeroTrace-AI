"use client";

import Navbar from './components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from 'lucide-react';

// More visually appealing lock icon component
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

// Database icon
const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);

// Chart icon
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section - Improved with more visual elements */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-left md:w-3/5">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mb-6">
                Privacy-Preserving Healthcare ML
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-snug">
  Secure Healthcare with <span className="text-blue-600">ZeroTrace-AI</span>
</h1>

              <p className="text-xl text-gray-600 mb-8">
                Train powerful healthcare machine learning models on sensitive patient data 
                while keeping patient data fully private and secure using breakthrough privacy-preserving technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/data-contribution" className="px-6 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center justify-center">
                  Contribute Healthcare Data
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/train" className="px-6 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition shadow-md hover:shadow-lg">
                  Train Secure ML Models
                </Link>
              </div>
            </div>
            <div className="md:w-2/5">
              <div className="relative w-full h-64 md:h-80 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600 rounded-xl opacity-10"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-600 rounded-xl opacity-10"></div>
                <div className="h-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <LockIcon />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-blue-200 rounded-full opacity-50 animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-blue-300 rounded-full opacity-30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto">
  
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
      <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
        A secure, transparent journey from data to insight — here's how we protect your privacy every step of the way.
      </p>
    </div>

  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
        <div className="h-12 w-12 bg-primary-100 rounded-lg text-blue-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Secure ML Model Training</h3>
        <p className="text-gray-600">
          Train machine learning models on distributed healthcare data without ever exposing the underlying patient records.
        </p>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
        <div className="h-12 w-12 bg-primary-100 rounded-lg text-blue-600 flex items-center justify-center mb-4">
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





      {/* Testimonial Section - New
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Healthcare Providers</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 relative">
            <div className="absolute -top-5 left-10 text-6xl text-blue-200">"</div>
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-gray-700 italic mb-8">
                SecureHealth's platform has revolutionized how we approach machine learning in healthcare. 
                For the first time, we can collaborate on ML projects while maintaining strict patient privacy standards.
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-blue-600">JD</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Dr. Jane Doe</p>
                  <p className="text-gray-600">Chief Data Officer, Example Hospital</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-24">
              <div className="text-2xl font-bold text-gray-400">Partner 1</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-24">
              <div className="text-2xl font-bold text-gray-400">Partner 2</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-24">
              <div className="text-2xl font-bold text-gray-400">Partner 3</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-24">
              <div className="text-2xl font-bold text-gray-400">Partner 4</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Improved Footer */}
      <footer className="mt-auto py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">SH</span>
                </div>
                <h2 className="text-2xl font-bold">SecureHealth</h2>
              </div>
              <p className="text-gray-400 mb-6">Secure healthcare ML platform powered by privacy-preserving technology.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <span className="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <span className="sr-only">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <span className="sr-only">GitHub</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition">Dashboard</Link></li>
                <li><Link href="/data-contribution" className="text-gray-400 hover:text-white transition">Contribute Data</Link></li>
                <li><Link href="/train" className="text-gray-400 hover:text-white transition">Train Models</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Privacy</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Center</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/compliance" className="text-gray-400 hover:text-white transition">HIPAA Compliance</Link></li>
                <li><Link href="/security" className="text-gray-400 hover:text-white transition">Security Measures</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  info@securehealth.example
                </li>
                <li className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  123 Privacy Way, Secure City
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2023 SecureHealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}