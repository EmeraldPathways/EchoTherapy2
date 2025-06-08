import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { fetchUserConversations } from '@/services/api'; // Ensure this path is correct
import type { Conversation } from '@/types'; // Your Conversation type
import Link from 'next/link'; // For navigation
import { useRouter } from 'next/router';

interface ConversationsListProps {
  // Callback to select a conversation and load it in the ChatWindow
  // This implies ChatWindow needs to be able to accept conversationId and messages as props
  onSelectConversation: (conversationId: number, openaiThreadId: string | null | undefined, title: string | null | undefined) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ onSelectConversation }) => {
  const { user, session } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadConversations = async () => {
      if (!user || !session?.access_token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const fetchedConversations = await fetchUserConversations(session.access_token);
        setConversations(fetchedConversations || []);
      } catch (err: any) {
        console.error("Error fetching conversations:", err);
        setError(err.message || 'Failed to load conversations.');
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [user, session]);

  const handleConversationClick = (conversation: Conversation) => {
    // Instead of navigating to a new page for each chat,
    // we can call back to the parent (e.g., a main layout or index page)
    // to update the ChatWindow with this conversation's details.
    // This requires the parent component to manage which conversation is active.
    // For now, let's assume onSelectConversation will handle loading it into the main chat view.
    
    // If you want to navigate to the main chat page and pass query params:
    // router.push(`/?conversationId=${conversation.id}&threadId=${conversation.openai_thread_id}`);
    // However, a callback is cleaner for SPA-like behavior within the same page structure.
    onSelectConversation(conversation.id, conversation.openai_thread_id, conversation.title);
  };


  if (loading) {
    return <div className="text-center p-4 text-gray-600">Loading conversations...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  }

  if (conversations.length === 0) {
    return <div className="text-center p-4 text-gray-500">You have no saved conversations yet.</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Past Conversations</h2>
      <ul className="divide-y divide-gray-200">
        {conversations.map((convo) => (
          <li key={convo.id} className="py-4">
            <button
              onClick={() => handleConversationClick(convo)}
              className="w-full text-left p-3 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
              aria-label={`Open conversation titled ${convo.title || 'Untitled Conversation'}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold text-blue-600 truncate">
                  {convo.title || 'Untitled Conversation'}
                </h3>
                <span className="text-xs text-gray-500">
                  {convo.updated_at ? new Date(convo.updated_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              {/* Optionally, display a snippet of the last message if you fetch it */}
              {/* <p className="text-sm text-gray-600 mt-1 truncate">
                {convo.messages && convo.messages.length > 0 ? convo.messages[0].content : 'No messages yet...'}
              </p> */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationsList;