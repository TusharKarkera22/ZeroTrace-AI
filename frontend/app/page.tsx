"use client";

import Navbar from './components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon, ShieldIcon, LockIcon, ServerIcon, BarChart3Icon } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Hover scale animation
const hoverScale = {
  scale: 1.05,
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  transition: { duration: 0.3 }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Framer Motion */}

<section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
  {/* Enhanced background elements */}
  <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
  <div className="absolute top-40 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-10 blur-2xl"></div>
  
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="max-w-5xl mx-auto relative z-10"
  >
    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-left md:w-3/5"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mb-6 shadow-sm border border-blue-200"
        >
          Privacy-Preserving Healthcare ML with Nillion
        </motion.div>
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Secure Healthcare with <span className="text-blue-600 relative">
            ZeroTrace-AI
            {/* Subtle underline animation */}
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -bottom-1 left-0 h-1 bg-blue-400 opacity-50 rounded-full"
            ></motion.span>
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-600 mb-8 leading-relaxed"
        >
          Train powerful healthcare machine learning models on sensitive patient data 
          while keeping patient data fully private and secure using Nillion's breakthrough 
          privacy-preserving technology.
        </motion.p>
        
        {/* Improved button layout with subtle hover animation */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full"
        >
          <motion.div whileHover={hoverScale} className="w-full sm:w-auto">
            <Link 
              href="/data-contribution" 
              className="inline-block w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg flex items-center justify-center group"
            >
              <span className="truncate">Contribute Healthcare Data</span>
              <ChevronRightIcon className="ml-2 h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div whileHover={hoverScale} className="w-full sm:w-auto">
            <Link 
              href="/predict" 
              className="inline-block w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition shadow-md flex items-center justify-center"
            >
              <span className="truncate">Check your Diabetes Prediction</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Enhanced image section with floating animation */}
      <motion.div 
        className="md:w-2/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="relative w-full h-64 md:h-80 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.05, 1, 1.05, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600 rounded-xl opacity-10"
          ></motion.div>
          <motion.div 
            animate={{ 
              rotate: [0, -10, 0, 10, 0],
              scale: [1, 1.05, 1, 1.05, 1]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-600 rounded-xl opacity-10"
          ></motion.div>
          
          <div className="h-full flex items-center justify-center">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src="/home.png" 
                alt="Healthcare AI" 
                width={300} 
                height={300} 
                className="w-full h-full object-cover rounded-full shadow-lg" 
              />
            </motion.div>
          </div>
          
          {/* Added decorative elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-500 rounded-full opacity-20"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute top-8 -left-2 w-6 h-6 bg-indigo-500 rounded-full opacity-30"
          ></motion.div>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
</section>

      {/* Nillion Technology Section */}
      <motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={fadeIn}
  className="py-16 px-6 bg-white"
>
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <motion.h2 
        variants={fadeIn}
        className="text-4xl font-bold text-gray-900 mb-4"
      >
        Powered by Nillion
      </motion.h2>
      <motion.div variants={fadeIn} className="w-24 h-1 bg-blue-600 mx-auto"></motion.div>
      <motion.p 
        variants={fadeIn}
        className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto"
      >
        Our platform leverages Nillion's secure computation network that decentralizes trust for high-value, 
        sensitive, and private healthcare data in the same way that blockchains decentralize transactions.
      </motion.p>
    </div>

    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <motion.div 
        variants={itemVariants}
        whileHover={hoverScale}
        className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-gray-100"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <LockIcon className="text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Blind Computation</h3>
        </div>
        <p className="text-gray-700">
          Nillion enables blind computation - performing useful work on data while it remains encrypted. 
          Unlike traditional approaches that require decrypting data for processing (exposing it to computing 
          infrastructure operators), Nillion keeps your healthcare data fully protected throughout the entire computation 
          process, ensuring maximum privacy and regulatory compliance.
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        whileHover={hoverScale}
        className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-gray-100"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <ServerIcon className="text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Decentralized Architecture</h3>
        </div>
        <p className="text-gray-700">
          Nillion is a decentralized data storage and computation network with tools that allow 
          building powerful applications leveraging high-value healthcare data more safely. Its modular 
          and flexible architecture employs cutting-edge cryptographic techniques, eliminating single 
          points of failure and ensuring your sensitive healthcare information remains secure.
        </p>
      </motion.div>
    </motion.div>
  </div>
</motion.section>

{/* Advanced Features Section - Updated */}
<motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={fadeIn}
  className="py-20 px-6 bg-white"
>
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <motion.h2 
        variants={fadeIn}
        className="text-4xl font-bold text-gray-900 mb-4"
      >
        Advanced Privacy Features
      </motion.h2>
      <motion.div variants={fadeIn} className="w-24 h-1 bg-blue-600 mx-auto"></motion.div>
      <motion.p 
        variants={fadeIn}
        className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto"
      >
        Our integration with Nillion provides cutting-edge privacy capabilities for healthcare institutions.
      </motion.p>
    </div>

    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
    >
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row items-start gap-6"
      >
        <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Blind Modules</h3>
          <p className="text-gray-700">
            Nillion makes blind computation possible through Blind Modules that leverage privacy-enhancing 
            technologies (PETs) such as secure multi-party computation (MPC) and homomorphic encryption (HE). 
            Each blind module packages and combines one or more PETs in a developer-friendly way, bringing 
            these capabilities to healthcare data protection in an accessible format.
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row items-start gap-6"
      >
        <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy-Enhancing Technologies</h3>
          <p className="text-gray-700">
            With Nillion's advanced cryptographic technology, our system provides mathematical guarantees 
            that your healthcare data cannot be accessed or viewed by unauthorized parties. This creates a 
            trust layer that enables hospitals and research institutions to collaborate securely on sensitive medical data.
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row items-start gap-6"
      >
        <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Healthcare ML</h3>
          <p className="text-gray-700">
            Our platform utilizes Nillion's unique capabilities to unlock new opportunities in healthcare AI. 
            By enabling secure computation on sensitive data, we're creating both more secure versions of existing 
            healthcare workflows and unlocking new possibilities for medical research and predictive healthcare analytics.
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row items-start gap-6"
      >
        <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Architecture</h3>
          <p className="text-gray-700">
            Nillion's modular and flexible architecture is designed to adapt to the complex needs of healthcare data. 
            This allows our platform to support various healthcare applications, from private predictive AI to secure 
            storage solutions for healthcare credentials, all while maintaining complete audit trails for regulatory compliance.
          </p>
        </div>
      </motion.div>
    </motion.div>
  </div>
</motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="py-20 px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              variants={fadeIn}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              How It Works
            </motion.h2>
            <motion.div variants={fadeIn} className="w-24 h-1 bg-blue-600 mx-auto"></motion.div>
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto"
            >
              A secure, transparent journey from data to insight — here's how we protect your privacy every step of the way.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={hoverScale}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm transition"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShieldIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy-First Approach</h3>
              <p className="text-gray-600">
                Built on Nillion's groundbreaking technology to ensure your healthcare data never leaves your control.
                Your data remains encrypted throughout the entire process.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={hoverScale}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm transition"
            >
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ServerIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure ML Model Training</h3>
              <p className="text-gray-600">
                Train machine learning models on distributed healthcare data without ever exposing the underlying patient records.
                Nillion's MPC (Multi-Party Computation) ensures data integrity.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={hoverScale}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm transition"
            >
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Privacy Verification</h3>
              <p className="text-gray-600">
                Our transparent verification system allows you to visually confirm that your data remains secure throughout 
                the computation process, powered by Nillion's audit trails.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

     

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            variants={fadeIn}
            className="text-4xl font-bold mb-6"
          >
            Ready to transform healthcare data security?
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-xl mb-5 opacity-90"
          >
            Join leading healthcare organizations using Nillion-powered technology to advance medicine while preserving privacy.
          </motion.p>
          
        </div>
      </motion.section>

      {/* Improved Footer */}
      <footer className="mt-auto py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <h2 className="text-2xl font-bold">Zerotrace-AI</h2>
              </div>
              <p className="text-gray-400 mb-6">Secure healthcare ML platform powered by Nillion's privacy-preserving technology.</p>
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
            <p>© 2023 SecureHealth. All rights reserved. Powered by Nillion technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}