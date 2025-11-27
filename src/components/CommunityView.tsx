import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useAuth, useLanguage } from '../App';
import { CommunityPost, LeaderboardUser, ReactionType, Meal, User, Goal } from '../types';
import { communityPostsData, leaderboardData } from '../data/community';
import { communityMeals } from '../data/communityMeals';
import { ThumbUpIcon, HeartIcon, LightbulbIcon, ShareIcon, TrophyIcon, SparklesIcon, StarIcon, ArrowUpIcon, ArrowDownIcon, MinusIcon, TrashIcon } from './icons/Icons';
import { GoogleGenAI, Type } from "@google/genai";

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}> = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-center text-gray-600 dark:text-gray-300">{message}</p>
        <div className="flex items-center space-x-4 pt-4">
          <button
            onClick={onClose}
            className="w-full p-3 font-bold text-gray-600 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-full p-3 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const SharePlanModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    plan: CommunityPost['sharedPlan'];
}> = ({ isOpen, onClose, plan }) => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishSuccess, setPublishSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMessage(t('share.community.mealPlan.shareModal.defaultMessage'));
            setPublishSuccess(false);
            setIsPublishing(false);
        }
    }, [isOpen, t]);

    const handlePublish = () => {
        if (!plan || !user) return;
        setIsPublishing(true);

        const newPost: CommunityPost = {
            id: new Date().toISOString(),
            author: { name: user.name, avatarUrl: user.avatarUrl, nickname: user.nickname },
            content: message,
            category: 'Plan Repas',
            timestamp: new Date().toISOString(),
            reactions: { like: 0, love: 0, idea: 0 },
            sharedPlan: plan
        };

        setTimeout(() => {
            const storedPosts = localStorage.getItem('gluco-community-posts');
            const posts: CommunityPost[] = storedPosts ? JSON.parse(storedPosts) : communityPostsData;
            const updatedPosts = [newPost, ...posts];
            localStorage.setItem('gluco-community-posts', JSON.stringify(updatedPosts));
            window.dispatchEvent(new CustomEvent('gluco-community-posts-updated'));

            setIsPublishing(false);
            setPublishSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        }, 500);
    };

    if (!isOpen || !plan) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                 <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">{t('share.community.mealPlan.shareModal.title')}</h3>
                 {publishSuccess ? (
                    <div className="text-center p-8">
                        <svg className="h-16 w-16 text-mint-green mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">{t('share.community.shareMealModal.success')}</p>
                    </div>
                ) : (
                    <>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm space-y-2">
                           <p><span className="font-bold">{t('share.community.mealPlan.breakfast')}:</span> {plan.breakfast.name}</p>
                           <p><span className="font-bold">{t('share.community.mealPlan.lunch')}:</span> {plan.lunch.name}</p>
                           <p><span className="font-bold">{t('share.community.mealPlan.dinner')}:</span> {plan.dinner.name}</p>
                        </div>
                        <div>
                             <label htmlFor="shareMessage" className="text-sm font-semibold text-gray-600 dark:text-gray-300 block mb-2">{t('share.community.mealPlan.shareModal.prompt')}</label>
                             <textarea 
                                id="shareMessage"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                className="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green"
                             />
                        </div>
                        <div className="flex items-center space-x-4 pt-4">
                            <button onClick={onClose} className="w-full p-3 font-bold text-gray-600 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">{t('profile.cancel')}</button>
                            <button onClick={handlePublish} disabled={isPublishing} className="w-full p-3 font-bold text-white bg-calm-blue rounded-lg hover:bg-calm-blue-dark transition-colors disabled:opacity-50">
                                {isPublishing ? t('share.community.createPost.publishing') : t('share.community.publish')}
                            </button>
                        </div>
                    </>
                 )}
            </div>
        </div>
    );
};

const MealPlanCard: React.FC = () => {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const [goal, setGoal] = useState<Goal | null>(null);
    const [plan, setPlan] = useState<CommunityPost['sharedPlan'] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    useEffect(() => {
        const storedGoal = localStorage.getItem('gluco-goal');
        if (storedGoal) {
            try {
                setGoal(JSON.parse(storedGoal));
            } catch (e) {
                console.error("Failed to parse goal from localStorage", e);
            }
        }
    }, []);

    const generatePlan = async () => {
        if (!user) return;
        setIsLoading(true);
        setError('');
        setPlan(null);

        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            if (!apiKey) throw new Error("API_KEY not configured.");
            const ai = new GoogleGenAI({ apiKey });

            const goalDescription = goal 
                ? t('share.community.mealPlan.goalDescription', { targetReduction: goal.targetReduction }) 
                : t('share.community.mealPlan.noGoalDescription');
            
            const prompt = t('share.community.mealPlan.prompt', {
                program: user.trackingProgram,
                goalDescription: goalDescription,
                language: language === 'fr' ? 'français' : 'English',
            });

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            breakfast: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }, required: ['name', 'description'] },
                            lunch: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }, required: ['name', 'description'] },
                            dinner: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }, required: ['name', 'description'] },
                        },
                        required: ["breakfast", "lunch", "dinner"],
                    }
                }
            });

            const parsedPlan = JSON.parse(response.text.trim());
            setPlan(parsedPlan);
        } catch (err) {
            console.error("Meal Plan Generation Error:", err);
            setError(t('share.community.mealPlan.error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <div className="bg-gradient-to-r from-mint-green to-calm-blue p-5 rounded-2xl shadow-lg text-white text-center">
            <SparklesIcon className="w-8 h-8 mx-auto mb-2" />
            <h2 className="text-xl font-bold">{t('share.community.mealPlan.title')}</h2>
            <p className="text-sm opacity-90 mb-4">{t('share.community.mealPlan.subtitle')}</p>

            {isLoading ? (
                <div className="py-4">
                    <svg className="animate-spin h-8 w-8 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2 text-sm">{t('share.community.mealPlan.loading')}</p>
                </div>
            ) : error ? (
                 <div className="py-4 bg-red-800/50 rounded-lg">
                    <p>{error}</p>
                </div>
            ) : plan ? (
                <div className="text-left bg-white/20 p-4 rounded-lg space-y-3 animate-fade-in">
                    <div>
                        <p className="font-bold">{t('share.community.mealPlan.breakfast')}</p>
                        <p className="text-sm"><span className="font-semibold">{plan.breakfast.name}:</span> {plan.breakfast.description}</p>
                    </div>
                     <div>
                        <p className="font-bold">{t('share.community.mealPlan.lunch')}</p>
                        <p className="text-sm"><span className="font-semibold">{plan.lunch.name}:</span> {plan.lunch.description}</p>
                    </div>
                     <div>
                        <p className="font-bold">{t('share.community.mealPlan.dinner')}</p>
                        <p className="text-sm"><span className="font-semibold">{plan.dinner.name}:</span> {plan.dinner.description}</p>
                    </div>
                </div>
            ) : null}

            <div className="mt-4 flex items-center space-x-3">
                <button onClick={generatePlan} disabled={isLoading} className="w-full bg-white text-mint-green font-bold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50">
                    {plan ? t('share.community.mealPlan.generateAgainButton') : t('share.community.mealPlan.generateButton')}
                </button>
                {plan && (
                     <button onClick={() => setIsShareModalOpen(true)} className="w-full bg-white/30 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-white/40 transition-colors flex items-center justify-center space-x-2">
                        <ShareIcon className="w-5 h-5" />
                        <span>{t('share.community.mealPlan.shareButton')}</span>
                    </button>
                )}
            </div>
        </div>
        {plan && <SharePlanModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} plan={plan} />}
        </>
    );
};

const CommunityMealCard: React.FC<{ meal: Meal; onClick: () => void; }> = ({ meal, onClick }) => {
    return (
        <div onClick={onClick} className="flex-shrink-0 w-40 cursor-pointer group">
            <div className="relative overflow-hidden rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <img src={meal.imageUrl} alt={meal.name} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-yellow-700 font-bold text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-500"/>
                    <span>{meal.communityRating?.toFixed(1)}</span>
                </div>
                <div className="absolute bottom-0 left-0 p-2 text-white">
                    <h4 className="font-semibold text-sm leading-tight">{meal.name}</h4>
                     {meal.glycemicScore && (
                        <div className="flex items-center space-x-1 mt-1">
                            <TrophyIcon className="w-3 h-3 text-soft-violet" />
                            <span className="text-xs opacity-80">{meal.glycemicScore}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PostCard: React.FC<{
    post: CommunityPost;
    user: User | null;
    onReaction: (postId: string, reaction: ReactionType) => void;
    onDeleteRequest: (post: CommunityPost) => void;
}> = ({ post, user, onReaction, onDeleteRequest }) => {
    const { t } = useLanguage();

    const reactionIcons: { [key in ReactionType]: React.FC<any> } = {
        'like': ThumbUpIcon,
        'love': HeartIcon,
        'idea': LightbulbIcon,
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 space-y-3">
            <div className="flex items-center space-x-3">
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{post.author.nickname || post.author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(post.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{post.content}</p>

            {post.sharedMeal && (
                <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <img src={post.sharedMeal.imageUrl} alt={post.sharedMeal.name} className="w-full h-48 object-cover"/>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 space-y-3">
                        <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{post.sharedMeal.name}</h4>
                        <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg">
                                <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">{t('scanner.carbs')}</p>
                                <p className="font-bold text-sm text-blue-600 dark:text-blue-400">{post.sharedMeal.carbohydrates?.toFixed(0) ?? 'N/A'}g</p>
                            </div>
                            <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded-lg">
                                <p className="text-xs text-red-800 dark:text-red-300 font-medium">{t('scanner.protein')}</p>
                                <p className="font-bold text-sm text-red-600 dark:text-red-400">{post.sharedMeal.protein?.toFixed(0) ?? 'N/A'}g</p>
                            </div>
                            <div className="bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded-lg">
                                <p className="text-xs text-yellow-800 dark:text-yellow-300 font-medium">{t('scanner.fats')}</p>
                                <p className="font-bold text-sm text-yellow-600 dark:text-yellow-400">{post.sharedMeal.fats?.toFixed(0) ?? 'N/A'}g</p>
                            </div>
                             {post.sharedMeal.fiber !== undefined && (
                                <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-lg">
                                    <p className="text-xs text-green-800 dark:text-green-300 font-medium">{t('scanner.fiber')}</p>
                                    <p className="font-bold text-sm text-green-600 dark:text-green-400">{post.sharedMeal.fiber?.toFixed(0) ?? 'N/A'}g</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 p-3 rounded-lg flex justify-around">
                            <div><span className="font-semibold">{t('scanner.glycemicIndex')}:</span> <span className="capitalize font-medium text-gray-800 dark:text-gray-100">{post.sharedMeal.glycemicIndex}</span></div>
                            <div><span className="font-semibold">{t('dashboard.glycemicScore')}:</span> <span className="font-medium text-gray-800 dark:text-gray-100">{post.sharedMeal.glycemicScore}/100</span></div>
                        </div>

                        {post.sharedMeal.advice && (
                             <div className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 p-3 rounded-lg">
                                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{t('scanner.aiAdvice')}</p>
                                <p>{post.sharedMeal.advice}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {post.sharedPlan && (
                <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-bold text-center text-gray-800 dark:text-gray-100 mb-2">{t('share.community.mealPlan.title')}</h4>
                    <div className="space-y-3 text-sm">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded-md">
                            <p className="font-semibold text-mint-green">{t('share.community.mealPlan.breakfast')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.sharedPlan.breakfast.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{post.sharedPlan.breakfast.description}</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded-md">
                            <p className="font-semibold text-calm-blue">{t('share.community.mealPlan.lunch')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.sharedPlan.lunch.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{post.sharedPlan.lunch.description}</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded-md">
                            <p className="font-semibold text-soft-violet">{t('share.community.mealPlan.dinner')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.sharedPlan.dinner.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{post.sharedPlan.dinner.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {post.comparedMeals && post.comparisonInsight && (
                <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-bold text-center text-gray-800 dark:text-gray-100 mb-2">{t('share.history.compare.modalTitle')}</h4>
                    <div className="grid grid-cols-2 gap-2 text-center">
                        {post.comparedMeals.map((meal, index) => (
                            <div key={index}>
                                <img src={meal.imageUrl} alt={meal.name} className="w-full h-20 object-cover rounded-lg mb-1"/>
                                <p className="font-semibold text-xs text-gray-700 dark:text-gray-200">{meal.name}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-3 space-y-1 bg-white dark:bg-gray-700 p-2 rounded-lg">
                        <div className="grid grid-cols-[1fr,auto,1fr] items-center text-center text-xs gap-2">
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.comparedMeals[0].glycemicScore}/100</p>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{t('dashboard.glycemicScore')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.comparedMeals[1].glycemicScore}/100</p>
                        </div>
                        <div className="grid grid-cols-[1fr,auto,1fr] items-center text-center text-xs gap-2">
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.comparedMeals[0].carbohydrates.toFixed(0)}g</p>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{t('scanner.carbs')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.comparedMeals[1].carbohydrates.toFixed(0)}g</p>
                        </div>
                        <div className="grid grid-cols-[1fr,auto,1fr] items-center text-center text-xs gap-2">
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.comparedMeals[0].protein?.toFixed(0) ?? 'N/A'}g</p>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{t('scanner.protein')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.comparedMeals[1].protein?.toFixed(0) ?? 'N/A'}g</p>
                        </div>
                        <div className="grid grid-cols-[1fr,auto,1fr] items-center text-center text-xs gap-2">
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.comparedMeals[0].fats?.toFixed(0) ?? 'N/A'}g</p>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{t('scanner.fats')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{post.comparedMeals[1].fats?.toFixed(0) ?? 'N/A'}g</p>
                        </div>
                    </div>
                    
                    <div className="mt-3 bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <h5 className="font-semibold text-sm text-gray-700 dark:text-gray-200 flex items-center space-x-1 mb-1">
                            <SparklesIcon className="w-4 h-4 text-soft-violet"/>
                            <span>{t('share.history.compare.aiAnalysisTitle')}</span>
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{post.comparisonInsight}</p>
                    </div>
                </div>
            )}
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                    {Object.entries(post.reactions).map(([reaction, count]) => {
                        const Icon = reactionIcons[reaction as ReactionType];
                        const isSelected = post.userReaction === reaction;
                        return (
                            <button
                                key={reaction}
                                onClick={() => onReaction(post.id, reaction as ReactionType)}
                                className={`flex items-center space-x-1.5 text-sm transition-colors ${
                                    isSelected ? 'text-mint-green font-bold' : 'text-gray-500 dark:text-gray-400 hover:text-mint-green'
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${isSelected ? 'fill-current' : ''}`} />
                                <span>{count}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="flex items-center space-x-2">
                    {user?.isAdmin && (
                        <button
                            onClick={() => onDeleteRequest(post)}
                            className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            aria-label="Delete post"
                        >
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    )}
                    <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-calm-blue rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                        <ShareIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

const RankChangeIcon: React.FC<{ change?: 'up' | 'down' | 'stable' }> = ({ change }) => {
    switch (change) {
        case 'up':
            return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
        case 'down':
            return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
        case 'stable':
            return <MinusIcon className="w-4 h-4 text-gray-400" />;
        default:
            return <div className="w-4 h-4" />;
    }
};

const Leaderboard: React.FC<{ users: LeaderboardUser[] }> = ({ users }) => {
    const { t } = useLanguage();

    const rankClasses: { [key: number]: string } = {
        1: 'bg-yellow-400',
        2: 'bg-gray-400',
        3: 'bg-orange-500',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 space-y-3">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center space-x-2">
                <TrophyIcon className="w-6 h-6 text-yellow-500" />
                <span>{t('share.community.leaderboard.weeklyTitle')}</span>
            </h2>
            <div className="space-y-2">
                {users.map(user => {
                    const trophyClass = rankClasses[user.rank] || '';
                    return (
                        <div key={user.rank} className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all duration-300 ${user.isCurrentUser ? 'bg-mint-green/10 ring-2 ring-mint-green' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
                            <div className="flex items-center w-12 shrink-0">
                                <span className={`font-bold text-lg w-7 text-center ${user.rank <= 3 ? 'text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>{user.rank}</span>
                                <RankChangeIcon change={user.rankChange} />
                            </div>
                            
                            <div className="relative shrink-0">
                                <img src={user.avatarUrl} alt={user.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"/>
                                {user.rank <= 3 && (
                                    <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-white ${trophyClass}`}>
                                        <TrophyIcon className="w-3 h-3" />
                                    </div>
                                )}
                            </div>
                            
                            <p className="font-semibold text-gray-800 dark:text-gray-200 flex-grow truncate">{user.nickname || user.name}</p>
                            <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-mint-green to-calm-blue text-lg shrink-0">{user.score}</p>
                        </div>
                    );
                })}
            </div>
            <div className="pt-2 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('share.community.leaderboard.cta')}</p>
            </div>
        </div>
    );
};


const CommunityView: React.FC<{ onCommunityMealSelect: (meal: Meal) => void; }> = ({ onCommunityMealSelect }) => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [posts, setPosts] = useState<CommunityPost[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [postContent, setPostContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [sortBy, setSortBy] = useState<'date' | 'reactions'>('date');
    const [postToDelete, setPostToDelete] = useState<CommunityPost | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollState, setScrollState] = useState({
        isScrollable: false,
        thumbWidth: 0,
        thumbPosition: 0,
    });
    
    const topCommunityMeals = useMemo(() => {
        return [...communityMeals]
            .sort((a, b) => (b.communityRating ?? 0) - (a.communityRating ?? 0))
            .slice(0, 10);
    }, []);

    const updateScrollState = useCallback(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            const isScrollable = scrollWidth > clientWidth;
            const thumbWidth = isScrollable ? (clientWidth / scrollWidth) * 100 : 0;
            const thumbPosition = isScrollable ? (scrollLeft / (scrollWidth - clientWidth)) * (100 - thumbWidth) : 0;

            setScrollState({
                isScrollable,
                thumbWidth,
                thumbPosition,
            });
        }
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            updateScrollState();
            container.addEventListener('scroll', updateScrollState);
            window.addEventListener('resize', updateScrollState);
            
            const observer = new MutationObserver(updateScrollState);
            observer.observe(container, { childList: true, subtree: true });

            return () => {
                container.removeEventListener('scroll', updateScrollState);
                window.removeEventListener('resize', updateScrollState);
                observer.disconnect();
            };
        }
    }, [updateScrollState]);

    useEffect(() => {
        const storedPosts = localStorage.getItem('gluco-community-posts');
        let allPosts = storedPosts ? JSON.parse(storedPosts) : communityPostsData;

        const storedReactions = JSON.parse(localStorage.getItem('gluco-post-reactions') || '{}');
        allPosts = allPosts.map((post: CommunityPost) => ({
            ...post,
            userReaction: storedReactions[post.id]
        }));
        
        setPosts(allPosts);
        setLeaderboard(leaderboardData);
        
        const handlePostsUpdate = () => {
             const updatedPosts = localStorage.getItem('gluco-community-posts');
             if(updatedPosts) {
                 const parsedPosts = JSON.parse(updatedPosts).map((post: CommunityPost) => ({
                    ...post,
                    userReaction: storedReactions[post.id]
                 }));
                 setPosts(parsedPosts);
             }
        };

        window.addEventListener('gluco-community-posts-updated', handlePostsUpdate);
        return () => window.removeEventListener('gluco-community-posts-updated', handlePostsUpdate);

    }, []);

    const handleReaction = (postId: string, reaction: ReactionType) => {
        setPosts(currentPosts => {
            const storedReactions = JSON.parse(localStorage.getItem('gluco-post-reactions') || '{}');
            const newPosts = currentPosts.map(p => {
                if (p.id === postId) {
                    const oldReaction = p.userReaction;
                    const newReactions = { ...p.reactions };

                    if (oldReaction) {
                        newReactions[oldReaction] = Math.max(0, newReactions[oldReaction] - 1);
                    }
                    
                    if (oldReaction !== reaction) {
                        newReactions[reaction]++;
                        storedReactions[postId] = reaction;
                    } else {
                        delete storedReactions[postId];
                    }
                    
                    localStorage.setItem('gluco-post-reactions', JSON.stringify(storedReactions));
                    return { ...p, reactions: newReactions, userReaction: oldReaction === reaction ? undefined : reaction };
                }
                return p;
            });
            return newPosts;
        });
    };

    const handleCreatePost = () => {
        if (!postContent.trim() || !user) return;
        
        setIsPosting(true);
        
        const newPost: CommunityPost = {
            id: new Date().toISOString(),
            author: { name: user.name, avatarUrl: user.avatarUrl, nickname: user.nickname },
            content: postContent.trim(),
            category: 'Partage',
            timestamp: new Date().toISOString(),
            reactions: { like: 0, love: 0, idea: 0 },
        };

        setTimeout(() => {
            const updatedPosts = [newPost, ...posts];
            setPosts(updatedPosts);
            localStorage.setItem('gluco-community-posts', JSON.stringify(updatedPosts));
            setPostContent('');
            setIsPosting(false);
        }, 500);
    };
    
    const handleDeletePost = () => {
        if (!postToDelete) return;
        const updatedPosts = posts.filter(p => p.id !== postToDelete.id);
        setPosts(updatedPosts);
        localStorage.setItem('gluco-community-posts', JSON.stringify(updatedPosts));
        setPostToDelete(null); // Close modal
    };
    
    const displayedPosts = useMemo(() => {
        let processedPosts = [...posts];

        if (sortBy === 'date') {
            processedPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        } else if (sortBy === 'reactions') {
            processedPosts.sort((a, b) => {
                const reactionsA = a.reactions.like + a.reactions.love + a.reactions.idea;
                const reactionsB = b.reactions.like + b.reactions.love + b.reactions.idea;
                return reactionsB - reactionsA;
            });
        }

        return processedPosts;
    }, [posts, sortBy]);

    return (
        <div className="space-y-6 animate-fade-in">
             <section>
                 <MealPlanCard />
             </section>

             <section>
                 <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t('share.community.topMealsTitle')}</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('share.community.topMealsSubtitle')}</p>
                 <div
                     ref={scrollContainerRef}
                     className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
                 >
                     {topCommunityMeals.map(meal => (
                        <CommunityMealCard key={meal.id} meal={meal} onClick={() => onCommunityMealSelect(meal)} />
                     ))}
                 </div>
                 {scrollState.isScrollable && (
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 relative overflow-hidden">
                        <div
                            className="h-1.5 bg-mint-green rounded-full absolute top-0"
                            style={{
                                width: `${scrollState.thumbWidth}%`,
                                left: `${scrollState.thumbPosition}%`,
                            }}
                        ></div>
                    </div>
                )}
            </section>

            <Leaderboard users={leaderboard} />
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 space-y-3">
                <h3 className="font-bold text-gray-800 dark:text-gray-100">{t('share.community.createPost.title')}</h3>
                <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={3}
                    placeholder={t('share.community.createPost.placeholder')}
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green"
                />
                <button 
                    onClick={handleCreatePost}
                    disabled={isPosting || !postContent.trim()}
                    className="w-full py-2 font-bold text-white bg-calm-blue rounded-lg hover:bg-calm-blue-dark transition-colors disabled:opacity-50"
                >
                    {isPosting ? t('share.community.createPost.publishing') : t('share.community.publish')}
                </button>
            </div>

            <section>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('share.community.postsTitle')}</h2>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-md mb-4">
                    <div className="flex items-center space-x-2">
                         <label htmlFor="sortBy" className="text-sm font-semibold text-gray-500 dark:text-gray-400">{t('share.community.sort')}:</label>
                         <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'date' | 'reactions')}
                            className="bg-gray-100 dark:bg-gray-700 border-none rounded-md py-1 pl-2 pr-8 text-sm font-semibold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-mint-green"
                         >
                            <option value="date">{t('share.community.sortOptions.date')}</option>
                            <option value="reactions">{t('share.community.sortOptions.reactions')}</option>
                         </select>
                    </div>
                </div>

                {displayedPosts.length > 0 ? (
                    <div className="space-y-4">
                        {displayedPosts.map(post => (
                            <PostCard key={post.id} post={post} user={user} onReaction={handleReaction} onDeleteRequest={setPostToDelete} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                        <p className="text-gray-500 dark:text-gray-400">{t('share.community.noPostsFound')}</p>
                    </div>
                )}
            </section>
             <ConfirmationModal
                isOpen={!!postToDelete}
                onClose={() => setPostToDelete(null)}
                onConfirm={handleDeletePost}
                title="Supprimer la publication"
                message="Êtes-vous sûr de vouloir supprimer cette publication ? Cette action est irréversible."
                confirmText="Supprimer"
                cancelText="Annuler"
            />
        </div>
    );
};

export default CommunityView;