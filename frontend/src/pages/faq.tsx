import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic'; // ADD THIS LINE

// Dynamically import NavBar with ssr: false
const NavBar = dynamic(() => import('@/components/NavBar'), { ssr: false });

const FAQ: React.FC = () => {
  return (
    <>
      <Head>
        <title>FAQ | AI Companion</title>
        <meta name="description" content="Frequently asked questions about our AI Companion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col items-center bg-secondary-50 relative overflow-hidden pt-24">
        <NavBar />
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.1)_0%,_transparent_70%)] pointer-events-none"></div>

        <main className="flex-grow w-full max-w-3xl flex flex-col items-center py-4 sm:py-16 px-4 sm:px-0 animate-fade-in text-gray-800">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-primary-700">Frequently Asked Questions</h1>

          <section className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">General Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900">What is EchoTherapy?</h3>
                <p className="text-gray-700 mt-2">EchoTherapy is an AI Companion designed to provide supportive listening and general information related to mental well-being. It is not a substitute for professional medical advice or therapy.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900">Is EchoTherapy a therapist?</h3>
                <p className="text-gray-700 mt-2">No, EchoTherapy is an AI tool and not a human therapist. It cannot diagnose, treat, or provide medical advice. For professional help, please consult a qualified mental health professional.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900">Is my data private?</h3>
                <p className="text-gray-700 mt-2">We take your privacy seriously. Please refer to our <Link href="/privacy-policy" className="text-blue-700 hover:underline">Privacy Policy</Link> for detailed information on how we collect, use, and protect your data.</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">Technical Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900">What technologies is EchoTherapy built with?</h3>
                <p className="text-gray-700 mt-2">The frontend is built with Next.js (React/TypeScript), and the backend uses FastAPI (Python). We utilize Supabase for authentication and database services, and the OpenAI Assistants API for AI interactions.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900">How do I report a bug or suggest a feature?</h3>
                <p className="text-gray-700 mt-2">You can contact us via the <Link href="/contact" className="text-blue-700 hover:underline">Contact Us</Link> page. We appreciate your feedback!</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full py-6 sm:py-8 bg-gray-100 text-center text-xs sm:text-sm text-gray-600 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4">
            <p className="font-medium mb-2">
              Disclaimer: This AI tool is for supportive listening only. It is not a replacement for professional medical advice, diagnosis, or treatment.
            </p>
            <p className="mb-3">
              If you are in crisis, please contact emergency services or a crisis hotline.
            </p>
            <div className="flex justify-center space-x-6 mb-3">
              <Link href="/privacy-policy" className="text-blue-700 hover:underline">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="text-blue-700 hover:underline">
                Cookie Policy
              </Link>
              <Link href="/terms-of-service" className="text-blue-700 hover:underline">
                Terms of Service
              </Link>
            </div>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} EchoTherapy. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FAQ;
