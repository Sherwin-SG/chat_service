'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import FriendsList from '../components/FriendsList';
import ChatWindow from '../components/ChatWindow'; // Renamed from ChatPage
import Header from '../components/Header';


interface Friend {
  _id: string;
  name?: string;
  email?: string;
}

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('/api/friends/list');
        setFriends(response.data.friends);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch friends');
        setLoading(false);
      }
    };

    fetchFriends();
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  const userEmail = session?.user?.email;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/*<Sidebar />*/}
      <div className="flex flex-col flex-1 p-8">
        <Header />
        <main className="flex-1 flex bg-white rounded-lg shadow-md">
          <div className="w-1/3 p-4 border-r border-gray-300">
            <h2 className="text-2xl font-bold">Friends</h2>
            {loading ? (
              <p>Loading friends...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <FriendsList 
                friends={friends} 
                onSelectFriend={setSelectedFriend} 
                selectedFriend={selectedFriend} // Pass the selectedFriend prop
              />
            )}
          </div>
          <div className="flex-1 p-4">
            {selectedFriend ? (
              <ChatWindow friendEmail={selectedFriend.email as string} userEmail={userEmail as string} />
            ) : (
              <p>Select a friend to start chatting</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
