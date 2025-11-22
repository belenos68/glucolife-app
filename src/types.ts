import React from 'react';

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  trackingProgram: TrackingProgram;
  nickname?: string;
  isAdmin?: boolean;
};

export type Meal = {
  id: string;
  name: string;
  imageUrl: string;
  carbohydrates: number;
  protein?: number;
  fats?: number;
  fiber?: number;
  glycemicIndex: 'faible' | 'moyen' | 'élevé' | 'low' | 'medium' | 'high' | string;
  advice: string;
  timestamp: string;
  glycemicScore: number;
  personalizedAdvice?: string;
  ingredients?: string[];
  preMealGlucose?: number;
  postMealGlucose?: number;
  communityRating?: number;
  scanCount?: number;
  userRating?: number;
};

export interface AchievementData {
    meals: Meal[];
    streak: number;
    goal: Goal | null;
}

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  criteria: (data: AchievementData) => boolean;
};

export type Goal = {
  id: string;
  targetReduction: number;
  durationDays: number;
  startDate: string;
  initialAvgScore: number;
};

export type GlucoseReading = {
  id: string;
  timestamp: string;
  value: number;
};

export type TrackingProgram = 'Prevention' | 'Diabetes Management' | 'Health Optimization';

export type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};

export type FeedbackType = 'General' | 'Bug' | 'Feature Request';

export type Feedback = {
  id: string;
  type: FeedbackType;
  text: string;
  timestamp: string;
};

export type Article = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: 'Nutrition' | 'Lifestyle' | 'Recipes';
  content: string;
};

export type ReactionType = 'like' | 'love' | 'idea';

export type MealSuggestion = {
  name: string;
  description: string;
};

export type CommunityPost = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    nickname?: string;
  };
  content: string;
  category: 'Astuce' | 'Recette' | 'Question' | 'Motivation' | 'Partage' | 'Comparaison' | 'Tip' | 'Recipe' | 'Share' | 'Plan Repas' | 'Meal Plan';
  timestamp: string;
  reactions: {
    like: number;
    love: number;
    idea: number;
  };
  userReaction?: ReactionType;
  sharedMeal?: Meal;
  comparedMeals?: [Meal, Meal];
  comparisonInsight?: string;
  sharedPlan?: {
    breakfast: MealSuggestion;
    lunch: MealSuggestion;
    dinner: MealSuggestion;
  };
};

export type LeaderboardUser = {
  rank: number;
  name: string;
  nickname?: string;
  avatarUrl: string;
  score: number;
  isCurrentUser?: boolean;
  rankChange?: 'up' | 'down' | 'stable';
};