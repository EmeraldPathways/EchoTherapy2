import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import ConversationsList from '@/components/ConversationsList';
import ChatWindow from '@/components/ChatWindow'; // To display the selected chat
import type { Message as UIMessage, Conversation as DBConversation } from '@/types'; // Your types
import { supabase } from '@/lib/supabaseClient'; // For fetching messages of a selected conversation
import NavBar from '@/components/NavBar'; // Import the new NavBar component

const PastConversationsPage: React.FC = () => {
  const { user, loading, signOut, session } = useAuth();
  const router = useRouter();

  const [selectedConversation, setSelectedConversation] = useState<{
    dbId: number | null;
    openaiThreadId: string | null | undefined;
    title: string | null | undefined;
    messages: UIMessage[];
  } | null>(null);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  const handleSelectConversation = useCallback(async (
    dbId: number, 
    openaiThreadId: string | null | undefined,
    title: string | null | undefined
  ) => {
    setIsLoadingChat(true);
    setSelectedConversation(null); // Clear previous selection while loading

    if (!session?.access_token) {
        console.error("No access token for fetching messages.");
        setIsLoadingChat(false);
        // Optionally show an error to the user
        return;
    }

    try {
      // Fetch messages for this conversation from your Supabase DB
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('role, content, timestamp, id')
        .eq('conversation_id', dbId)
        .order('timestamp', { ascending: true });

      if (messagesError) {
        throw messagesError;
      }

      const uiMessages: UIMessage[] = (messagesData || []).map(msg => ({
        id: msg.id.toString(), // Use DB message ID
        text: msg.content,
        sender: msg.role as 'user' | 'bot',
        timestamp: msg.timestamp,
        model: msg.role === 'assistant' ? 'AI Companion' : undefined,
      }));
      
      setSelectedConversation({
        dbId,
        openaiThreadId,
        title: title || "Conversation",
        messages: uiMessages,
      });
    } catch (error) {
      console.error("Error loading selected conversation messages:", error);
      // Handle error (e.g., show a notification to the user)
    } finally {
      setIsLoadingChat(false);
    }
  }, [session?.access_token]);

  const handleBackToList = () => {
    setSelectedConversation(null);
  };


  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-700">Loading history...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Conversation History | AI Companion</title>
        <meta name="description" content="Review your past conversations with AI Companion." />
      </Head>
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        {/* Navigation Bar (same as index.tsx and profile.tsx) */}
        <NavBar /> {/* Use the new NavBar component here */}

        <main className="flex-grow w-full container mx-auto px-4 py-8 sm:py-12">
          {isLoadingChat && (
            <div className="text-center p-10 text-gray-600">Loading chat messages...</div>
          )}
          {!isLoadingChat && selectedConversation ? (
            <div className="flex flex-col h-[calc(100vh-15rem)]"> {/* Adjust height as needed */}
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700 truncate">
                  Viewing: {selectedConversation.title}
                </h2>
                <button
                  onClick={handleBackToList}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ← Back to Conversation List
                </button>
              </div>
              <ChatWindow
                key={selectedConversation.dbId} // Force re-mount with new key
                initialConversationDbId={selectedConversation.dbId}
                initialOpenaiThreadId={selectedConversation.openaiThreadId}
                initialMessages={selectedConversation.messages}
              />
            </div>
          ) : (
            !isLoadingChat && <ConversationsList onSelectConversation={handleSelectConversation} />
          )}
        </main>

        <footer className="w-full py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-200">
          <p>AI Companion © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
};

export default PastConversationsPage;