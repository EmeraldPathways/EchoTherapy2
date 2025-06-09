import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ChatWindow from '@/components/ChatWindow';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link'; // For navigation links
import NavBar from '@/components/NavBar'; // Import the new NavBar component
import InteractiveDemo from '@/components/InteractiveDemo'; // Import the new component

const HomePage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // No longer redirecting to login, instead show demo
      // router.replace('/login'); 
    }
  }, [user, loading, router]);

  if (loading) { // Only check loading, not user for initial render
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-700">Loading application...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI Companion | Chat</title>
        <meta
          name="description"
          content="Chat with your AI Mental Health Companion."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col items-center bg-secondary-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.1)_0%,_transparent_70%)] pointer-events-none"></div>

        {/* Navigation Bar */}
        <NavBar /> {/* Use the new NavBar component here */}

        {/* Main Chat Area */}
        <div className="flex-grow w-full flex flex-col items-center py-4 sm:py-8 px-2 sm:px-0 animate-fade-in">
            {/* Header within the main content area, below nav */}
            <header className="mb-4 sm:mb-6 text-center">
            </header>

            <main className="w-full max-w-3xl flex-grow flex flex-col">
                {user ? (
                    <ChatWindow />
                ) : (
                    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
                        <InteractiveDemo />
                        <div className="mt-8 text-center">
                            <p className="text-md text-gray-700 mb-4">Ready for your personal AI companion?</p>
                            <Link href="/signup" legacyBehavior>
                                <a className="btn-primary px-8 py-3 shadow-lg text-lg">
                                    Sign Up Now
                                </a>
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>


        <footer className="w-full py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-200">
          <p className="font-semibold mb-1 sm:mb-2">
            Disclaimer: Not a Substitute for Professional Advice
          </p>
          <p>
            This AI tool is for supportive listening. It is{" "}
            <strong className="text-red-600">not</strong> a replacement for
            professional medical advice, diagnosis, or treatment.
          </p>
          <p className="mt-1">
            If you are in crisis, please contact emergency services or a crisis hotline.
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;