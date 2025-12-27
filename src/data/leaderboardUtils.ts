import { CommunityPost, LeaderboardUser } from '../types';

type Accumulator = {
  name: string;
  nickname?: string;
  avatarUrl: string;
  score: number;
};

export const buildLeaderboardFromPosts = (posts: any[], currentUserName?: string) => {

  if (!posts || posts.length === 0) return [];

  const map = new Map<string, Accumulator>();

  posts.forEach(post => {
    if (!post.sharedMeal) return;

    const author = post.author;
    const key = author.name;

    if (!map.has(key)) {
      map.set(key, {
        name: author.name,
        nickname: author.nickname,
        avatarUrl: author.avatarUrl,
        score: 1,
      });
    } else {
      map.get(key)!.score += 1;
    }
  });

  return Array.from(map.values())
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      rank: index + 1,
      name: user.name,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
      score: user.score,
      rankChange: 'stable',
      isCurrentUser: user.name === currentUserName,
    }));
};
