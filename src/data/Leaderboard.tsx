import React, { useMemo } from 'react';
import { LeaderboardUser, CommunityPost } from '../types';

interface LeaderboardProps {
  posts: CommunityPost[];
}

// On passe les données en props au lieu de les importer
export const Leaderboard: React.FC<LeaderboardProps> = ({ posts }) => {
  const leaderboard: LeaderboardUser[] = useMemo(() => {
    if (!posts || posts.length === 0) return [];

    const map = new Map<string, LeaderboardUser>();

    posts.forEach((post) => {
      // Sécurité : Vérifier l'existence de l'auteur
      if (!post?.author?.name) return;

      const authorName = post.author.name;

      if (!map.has(authorName)) {
        map.set(authorName, {
          rank: 0,
          name: authorName,
          nickname: post.author.nickname,
          avatarUrl: post.author.avatarUrl,
          score: 1,
        });
      } else {
        const user = map.get(authorName);
        if (user) user.score += 1;
      }
    });

    return Array.from(map.values())
      .sort((a, b) => b.score - a.score)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
  }, [posts]);

  return (
    <div className="p-4">
      {/* ... reste de votre JSX inchangé ... */}
    </div>
  );
};