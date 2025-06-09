import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import UserIcon from '@/components/icons/UserIcon'; // Import the UserIcon

const NavBar: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" legacyBehavior>
              <a className="font-bold text-xl text-blue-600 hover:text-blue-700">
                ECHO
              </a>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user && !loading ? (
              <>
                <Link href="/profile" legacyBehavior>
                  <a className={`text-sm font-medium px-3 py-2 rounded-md flex items-center gap-1 ${
                    router.pathname === '/profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
                  }`}>
                    <UserIcon className="w-5 h-5" />
                    Profile
                  </a>
                </Link>
                <Link href="/past-conversations" legacyBehavior>
                  <a className={`text-sm font-medium px-3 py-2 rounded-md ${
                    router.pathname === '/past-conversations' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
                  }`}>
                    History
                  </a>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-red-600 hover:text-red-700 px-3 py-2 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Show login/signup links if not logged in and not loading
              !loading && (
                <>
                  <Link href="/login" legacyBehavior>
                    <a className={`text-sm font-medium px-3 py-2 rounded-md ${
                      router.pathname === '/login' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
                    }`}>
                      Login
                    </a>
                  </Link>
                  <Link href="/signup" legacyBehavior>
                    <a className={`text-sm font-medium px-3 py-2 rounded-md ${
                      router.pathname === '/signup' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
                    }`}>
                      Sign Up
                    </a>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 