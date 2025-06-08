import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProfileForm from '@/components/ProfileForm';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

const ProfilePage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login'); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-700">Loading profile page...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Your Profile | AI Companion</title>
        <meta name="description" content="Manage your AI Companion profile." />
      </Head>
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        {/* Navigation Bar (same as index.tsx) */}
        <NavBar />

        <main className="flex-grow w-full container mx-auto px-4 py-8 sm:py-12">
          <ProfileForm />
        </main>

         <footer className="w-full py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-200">
          <p>AI Companion © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
};

export default ProfilePage;