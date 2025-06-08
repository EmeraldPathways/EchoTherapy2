import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/components/AuthProvider';

const LoginPage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/'); // Redirect to home/chat if already logged in
    }
  }, [user, loading, router]);

  if (loading || (!loading && user)) {
    // Show loading indicator or null while checking auth state or redirecting
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login | AI Companion</title>
        <meta name="description" content="Login or Sign Up for AI Companion" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;