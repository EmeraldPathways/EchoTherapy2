import React from 'react';
import Head from 'next/head';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us | AI Companion</title>
        <meta name="description" content="Contact the AI Companion team" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
          
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600 mb-4">
              Have questions or feedback? We'd love to hear from you.
            </p>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Email</h2>
                <p className="text-gray-600">support@aicompanion.com</p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900">Hours</h2>
                <p className="text-gray-600">Monday - Friday: 9am - 5pm EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage; 