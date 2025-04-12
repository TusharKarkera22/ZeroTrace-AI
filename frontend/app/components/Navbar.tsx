import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">HC</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">SecureHealth</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-primary-500 text-sm font-medium text-gray-900">
                Home
              </Link>
              <Link href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Dashboard
              </Link>
              <Link href="/data-contribution" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Contribute Data
              </Link>
              <Link href="/privacy" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Privacy Center
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button className="btn-primary">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 