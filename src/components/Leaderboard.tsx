import React, { useMemo } from 'react';
import { CommunityPost } from '../types';
import { buildLeaderboardFromPosts } from './leaderboardUtils';
import { useAuth } from '../App'; // Pour récupérer l'utilisateur actuel

interface LeaderboardProps {
  posts: CommunityPost[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ posts }) => {
  const { user } = useAuth();

  const leaderboardData = useMemo(() => {
    return buildLeaderboardFromPosts(posts, user?.name);
  }, [posts, user?.name]);

  if (leaderboardData.length === 0) {
    return <p className="text-center p-4">Aucune activité pour le moment.</p>;
  }

  return (
    <div className="space-y-3 p-4">
      <h2 className="text-xl font-bold">Classement</h2>
      {leaderboardData.map((u) => (
        <div 
          key={u.name} 
          className={`flex items-center p-3 rounded-lg ${u.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'bg-white shadow-sm'}`}
        >
          <span className="w-8 font-bold text-gray-500">#{u.rank}</span>
          <img src={u.avatarUrl} alt={u.name} className="w-10 h-10 rounded-full mx-3" />
          <div className="flex-1">
            <p className="font-semibold">{u.nickname || u.name}</p>
            <p className="text-xs text-gray-400">{u.score} partages</p>
          </div>
        </div>
      ))}
    </div>
  );
};