import React, { useState, useEffect, FormEvent } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import type { UserProfile } from '@/types'; // Import your UserProfile type

const ProfileForm: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<UserProfile['gender']>(undefined);
  const [location, setLocation] = useState<string>('');
  const [messageCount, setMessageCount] = useState<number>(0);
  // Add other profile fields here if needed:
  // const [age, setAge] = useState<number | ''>('');
  // const [interests, setInterests] = useState<string[]>([]);
  // const [personalityNotes, setPersonalityNotes] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('name, gender, location, message_count')
          .eq('id', user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }
        if (data) {
          setName(data.name || '');
          setGender(data.gender || undefined);
          setLocation(data.location || '');
          setMessageCount(data.message_count || 0);
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(err.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const updates: Partial<UserProfile> = {
        id: user.id,
        email: user.email,
        name: name,
        gender: gender,
        location: location,
      };

      const { error: updateError } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !name) { // Show loading only if profile data hasn't been fetched yet
    return <div className="text-center p-4">Loading profile...</div>;
  }

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h3>
          <div className="space-y-5">
            <div>
              <label htmlFor="email_display" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email_display"
                type="email"
                value={user?.email || ''}
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-base cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-base"
                placeholder="Your Name"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                value={gender || ''}
                onChange={(e) => setGender(e.target.value as UserProfile['gender'])}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-base"
                disabled={loading}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-base"
                placeholder="Your Location"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Account Usage Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Account Usage</h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-md">
              <span className="text-lg text-gray-700 font-medium">Messages left:</span>
              <span className="text-3xl font-extrabold text-blue-600">{messageCount}</span>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                onClick={() => alert('Redirect to buy more messages (Stripe or similar)')}
                disabled={loading}
              >
                Buy More Messages
              </button>
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                onClick={() => alert('Initiate subscription cancellation process')}
                disabled={loading}
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 text-center mt-4">{error}</p>}
        {message && <p className="text-sm text-green-600 text-center mt-4">{message}</p>}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;