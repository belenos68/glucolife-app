import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useLanguage } from '../App';
import { Meal, Article, CommunityPost } from '../types';
import { allArticles } from '../data/articles';
import CommunityView from './CommunityView';
import { communityPostsData } from '../data/community';
import { SearchIcon, TrashIcon, XMarkIcon, SparklesIcon, ShareIcon } from './icons/Icons';
import { GoogleGenAI } from "@google/genai";


const MealDetailModal: React.FC<{ meal: Meal | null, isOpen: boolean, onClose: () => void }> = ({ meal, isOpen, onClose }) => {
    const { t } = useLanguage();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToLog = () => {
        if (!meal) return;
        const storedMeals = localStorage.getItem('gluco-meals');
        const meals: Meal[] = storedMeals ? JSON.parse(storedMeals) : [];
        const newMeal = { ...meal, id: new Date().toISOString(), timestamp: new Date().toISOString() };
        localStorage.setItem('gluco-meals', JSON.stringify([newMeal, ...meals]));
        setIsAdded(true);
        setTimeout(() => {
            onClose();
            setIsAdded(false);
        }, 1500);
    };

    if (!isOpen || !meal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <img src={meal.imageUrl} alt={meal.name} className="w-full h-48 object-cover rounded-t-2xl" />
                <div className="p-4 space-y-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{meal.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{meal.advice}</p>
                    <button onClick={handleAddToLog} className={`w-full p-3 font-bold text-white rounded-lg transition-colors ${isAdded ? 'bg-green-500' : 'bg-mint-green hover:bg-mint-green-dark'}`}>
                        {isAdded ? t('share.history.addSuccess') : t('share.mealDetail.addToLog')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ShareMealModal: React.FC<{ meal: Meal | null, isOpen: boolean, onClose: () => void }> = ({ meal, isOpen, onClose }) => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishSuccess, setPublishSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMessage(t('share.community.shareMealModal.defaultMessage'));
            setPublishSuccess(false);
            setIsPublishing(false);
        }
    }, [isOpen, t]);

    const handlePublish = () => {
        if (!meal || !user) return;
        setIsPublishing(true);

        const newPost: CommunityPost = {
            id: new Date().toISOString(),
            author: { name: user.name, avatarUrl: user.avatarUrl, nickname: user.nickname },
            content: message,
            category: 'Partage',
            timestamp: new Date().toISOString(),
            reactions: { like: 0, love: 0, idea: 0 },
            sharedMeal: meal
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

    if (!isOpen || !meal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">{t('share.community.shareMealModal.title')}</h3>

                {publishSuccess ? (
                    <div className="text-center p-8">
                        <svg className="h-16 w-16 text-mint-green mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">{t('share.community.shareMealModal.success')}</p>
                    </div>
                ) : (
                    <>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 flex items-center space-x-3">
                            <img src={meal.imageUrl} alt={meal.name} className="w-16 h-16 rounded-md object-cover"/>
                            <div>
                                <p className="font-bold text-gray-800 dark:text-gray-100">{meal.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.glycemicScore')}: {meal.glycemicScore}/100</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="shareMessage" className="text-sm font-semibold text-gray-600 dark:text-gray-300 block mb-2">{t('share.community.shareMealModal.prompt')}</label>
                            <textarea
                                id="shareMessage"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                placeholder={t('share.community.shareMealModal.placeholder')}
                                className="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green"
                            />
                        </div>

                        <div className="flex items-center space-x-4 pt-4">
                            <button onClick={onClose} className="w-full p-3 font-bold text-gray-600 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                                {t('profile.cancel')}
                            </button>
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

// --- Tab Views ---

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

const MealComparisonModal: React.FC<{
    meals: [Meal, Meal];
    isOpen: boolean;
    onClose: () => void;
}> = ({ meals, isOpen, onClose }) => {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const [insight, setInsight] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const generateInsight = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError('');
    setInsight('');

    try {
        // ✅ AJOUTEZ CETTE LIGNE
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) {
            throw new Error("API_KEY is not configured.");
        }
        
        const ai = new GoogleGenAI({ apiKey }); // ✅ Maintenant apiKey existe

        const [mealA, mealB] = meals;
        const prompt = t('share.history.compare.aiPrompt', {
            mealAName: mealA.name,
            mealACarbs: mealA.carbohydrates,
            mealAGI: mealA.glycemicIndex,
            mealAScore: mealA.glycemicScore,
            mealBName: mealB.name,
            mealBCarbs: mealB.carbohydrates,
            mealBGI: mealB.glycemicIndex,
            mealBScore: mealB.glycemicScore,
            language: language === 'fr' ? 'français' : 'English',
        });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        setInsight(response.text.trim());
    } catch (err) {
        console.error("Failed to generate comparison insight:", err);
        setError(t('share.history.compare.aiError'));
    } finally {
        setIsLoading(false);
    }
}, [meals, user, t, language]);

    useEffect(() => {
        if (isOpen) {
            generateInsight();
        }
    }, [isOpen, generateInsight]);
    
    if (!isOpen) return null;

    const [mealA, mealB] = meals;

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('share.history.compare.modalTitle')}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <XMarkIcon className="h-5 w-5 text-gray-500" />
                    </button>
                </header>

                <div className="overflow-y-auto p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-center">
                        {meals.map((meal) => (
                            <div key={meal.id}>
                                <img src={meal.imageUrl} alt={meal.name} className="w-full h-24 object-cover rounded-lg mb-2"/>
                                <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">{meal.name}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="space-y-1 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <div className="grid grid-cols-[1fr,auto,1fr] items-center text-center text-sm gap-2">
                            <p className="font-bold text-gray-700 dark:text-gray-200">{mealA.glycemicScore}/100</p>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{t('dashboard.glycemicScore')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{mealB.glycemicScore}/100</p>
                        </div>
                        <div className="grid grid-cols-[1fr,auto,1fr] items-center text-center text-sm gap-2">
                            <p className="font-bold text-gray-700 dark:text-gray-200">{mealA.carbohydrates.toFixed(0)}g</p>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{t('scanner.carbs')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{mealB.carbohydrates.toFixed(0)}g</p>
                        </div>
                         <div className="grid grid-cols-[1fr,auto,1fr] items-center text-center text-sm gap-2">
                            <p className="font-bold text-gray-700 dark:text-gray-200">{mealA.protein?.toFixed(0) ?? 'N/A'}g</p>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{t('scanner.protein')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{mealB.protein?.toFixed(0) ?? 'N/A'}g</p>
                        </div>
                         <div className="grid grid-cols-[1fr,auto,1fr] items-center text-center text-sm gap-2">
                            <p className="font-bold text-gray-700 dark:text-gray-200">{mealA.fats?.toFixed(0) ?? 'N/A'}g</p>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">{t('scanner.fats')}</p>
                            <p className="font-bold text-gray-700 dark:text-gray-200">{mealB.fats?.toFixed(0) ?? 'N/A'}g</p>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border dark:border-gray-600">
                        <h5 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center space-x-2 mb-2">
                            <SparklesIcon className="w-5 h-5 text-soft-violet"/>
                            <span>{t('share.history.compare.aiAnalysisTitle')}</span>
                        </h5>
                        {isLoading && (
                             <p className="text-sm italic text-gray-500 dark:text-gray-400">{t('share.history.compare.aiLoading')}</p>
                        )}
                        {error && (
                             <p className="text-sm text-red-500">{error}</p>
                        )}
                        {insight && (
                             <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{insight}</p>
                        )}
                    </div>
                </div>

                <footer className="p-4 border-t dark:border-gray-700 flex-shrink-0">
                    <button onClick={() => setIsShareModalOpen(true)} disabled={isLoading || !insight} className="w-full p-3 font-bold text-white bg-calm-blue rounded-lg hover:bg-calm-blue-dark transition-colors flex items-center justify-center space-x-2 disabled:opacity-50">
                        <ShareIcon className="w-5 h-5" />
                        <span>{t('share.community.shareMeal')}</span>
                    </button>
                </footer>
            </div>
        </div>
        {insight && (
            <ShareComparisonModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                meals={meals}
                insight={insight}
            />
        )}
        </>
    );
};

const ShareComparisonModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    meals: [Meal, Meal];
    insight: string;
}> = ({ isOpen, onClose, meals, insight }) => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishSuccess, setPublishSuccess] = useState(false);
    const [mealA, mealB] = meals;

    useEffect(() => {
        if (isOpen) {
            setMessage(t('share.history.compare.shareText', {
                mealA: mealA.name,
                mealB: mealB.name,
            }));
            setPublishSuccess(false);
            setIsPublishing(false);
        }
    }, [isOpen, t, mealA, mealB]);

    const handlePublish = () => {
        if (!user) return;
        setIsPublishing(true);

        const newPost: CommunityPost = {
            id: new Date().toISOString(),
            author: { name: user.name, avatarUrl: user.avatarUrl, nickname: user.nickname },
            content: message,
            category: 'Comparaison',
            timestamp: new Date().toISOString(),
            reactions: { like: 0, love: 0, idea: 0 },
            comparedMeals: meals,
            comparisonInsight: insight
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">{t('share.history.compare.shareModalTitle')}</h3>
                {publishSuccess ? (
                    <div className="text-center p-8">
                        <svg className="h-16 w-16 text-mint-green mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">{t('share.community.shareMealModal.success')}</p>
                    </div>
                ) : (
                    <>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 grid grid-cols-2 gap-2 text-center">
                            <div>
                                <img src={mealA.imageUrl} alt={mealA.name} className="w-full h-16 rounded-md object-cover"/>
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">{mealA.name}</p>
                            </div>
                            <div>
                                <img src={mealB.imageUrl} alt={mealB.name} className="w-full h-16 rounded-md object-cover"/>
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">{mealB.name}</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="shareMessage" className="text-sm font-semibold text-gray-600 dark:text-gray-300 block mb-2">{t('share.community.shareMealModal.prompt')}</label>
                            <textarea
                                id="shareMessage"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                placeholder={t('share.community.shareMealModal.placeholder')}
                                className="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-green"
                            />
                        </div>

                        <div className="flex items-center space-x-4 pt-4">
                            <button onClick={onClose} className="w-full p-3 font-bold text-gray-600 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                                {t('profile.cancel')}
                            </button>
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

const HistoryMealCard: React.FC<{ meal: Meal; onDelete: (meal: Meal) => void; onShare: (meal: Meal) => void; isComparing: boolean; isSelected: boolean; onSelect: (meal: Meal) => void; }> = ({ meal, onDelete, onShare, isComparing, isSelected, onSelect }) => {
    const { t } = useLanguage();

    return (
        <div onClick={() => isComparing && onSelect(meal)} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden p-3 animate-fade-in transition-all duration-200 ${isComparing ? 'cursor-pointer' : ''} ${isSelected ? 'ring-2 ring-calm-blue' : ''}`}>
            <div className="flex items-start space-x-4">
                <img src={meal.imageUrl} alt={meal.name} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div className="pr-2">
                            <h3 className="font-bold text-gray-800 dark:text-gray-100">{meal.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(meal.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="font-bold text-soft-violet text-2xl">{meal.glycemicScore}</p>
                            <p className="text-xs text-soft-violet-dark -mt-1">{t('dashboard.glycemicScore').split(' ')[0]}</p>
                        </div>
                    </div>
                     <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full px-2 py-0.5"><span>{t('scanner.carbs')}: {meal.carbohydrates}g</span></div>
                        {meal.protein !== undefined && <div className="flex items-center text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full px-2 py-0.5"><span>{t('scanner.protein')}: {meal.protein}g</span></div>}
                        {meal.fats !== undefined && <div className="flex items-center text-xs font-medium bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full px-2 py-0.5"><span>{t('scanner.fats')}: {meal.fats}g</span></div>}
                        {meal.fiber !== undefined && <div className="flex items-center text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full px-2 py-0.5"><span>{t('scanner.fiber')}: {meal.fiber}g</span></div>}
                    </div>
                </div>
            </div>
            {(meal.personalizedAdvice || meal.advice) && (
                 <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                        <SparklesIcon className="w-4 h-4 text-soft-violet flex-shrink-0"/>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t('scanner.aiAdvice')}</h4>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                        {meal.personalizedAdvice || meal.advice}
                    </p>
                </div>
            )}
             <div className="flex items-center justify-end mt-2 space-x-2">
                <button onClick={() => onShare(meal)} className="p-1.5 text-gray-400 hover:text-calm-blue rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors" aria-label={t('share.community.shareMeal')}>
                    <ShareIcon className="w-4 h-4"/>
                </button>
                <button onClick={() => onDelete(meal)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors" aria-label={t('share.history.deleteMeal')}>
                    <TrashIcon className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
};

type SortOption = 'newest' | 'oldest' | 'score_desc' | 'score_asc';
type GlycemicIndexFilter = 'low' | 'medium' | 'high';

const HistoryView: React.FC<{}> = () => {
    const { t } = useLanguage();
    const [allMeals, setAllMeals] = useState<Meal[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('newest');
    const [activeFilter, setActiveFilter] = useState<GlycemicIndexFilter | null>(null);
    const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);
    const [mealToShare, setMealToShare] = useState<Meal | null>(null);
    const [isComparing, setIsComparing] = useState(false);
    const [selectedForComparison, setSelectedForComparison] = useState<Meal[]>([]);
    const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

    const refreshMeals = useCallback(() => {
        const storedMeals = localStorage.getItem('gluco-meals');
        if (storedMeals) {
            setAllMeals(JSON.parse(storedMeals));
        }
    }, []);
    
    useEffect(() => {
        refreshMeals();
    }, [refreshMeals]);
    
    useEffect(() => {
        if (selectedForComparison.length === 2) {
            setIsComparisonModalOpen(true);
        }
    }, [selectedForComparison]);

    const handleSelectForComparison = (meal: Meal) => {
        setSelectedForComparison(prev => {
            if (prev.find(m => m.id === meal.id)) {
                return prev.filter(m => m.id !== meal.id);
            }
            if (prev.length < 2) {
                return [...prev, meal];
            }
            return prev;
        });
    };
    
    const resetComparison = () => {
        setIsComparing(false);
        setSelectedForComparison([]);
        setIsComparisonModalOpen(false);
    };

    const normalizeGI = (gi: string): GlycemicIndexFilter => {
        const lowerGi = gi.toLowerCase();
        if (lowerGi === 'low' || lowerGi === 'faible') return 'low';
        if (lowerGi === 'medium' || lowerGi === 'moyen') return 'medium';
        if (lowerGi === 'high' || lowerGi === 'élevé') return 'high';
        return 'low';
    };

    const handleToggleFilter = (filter: GlycemicIndexFilter) => {
        setActiveFilter(prev => (prev === filter ? null : filter));
    };

    const displayedMeals = useMemo(() => {
        let meals = [...allMeals];
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            meals = meals.filter(m => 
                m.name.toLowerCase().includes(lowerCaseQuery) ||
                m.glycemicIndex.toLowerCase().includes(lowerCaseQuery)
            );
        }
        if (activeFilter) {
            meals = meals.filter(m => normalizeGI(m.glycemicIndex) === activeFilter);
        }
        
        switch (sortOption) {
            case 'newest':
                meals.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                break;
            case 'oldest':
                meals.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                break;
            case 'score_desc':
                meals.sort((a, b) => b.glycemicScore - a.glycemicScore);
                break;
            case 'score_asc':
                meals.sort((a, b) => a.glycemicScore - b.glycemicScore);
                break;
        }

        return meals;
    }, [allMeals, searchQuery, sortOption, activeFilter]);

    const confirmDelete = () => {
        if (!mealToDelete) return;
        const updatedMeals = allMeals.filter(m => m.id !== mealToDelete.id);
        localStorage.setItem('gluco-meals', JSON.stringify(updatedMeals));
        setAllMeals(updatedMeals);
        setMealToDelete(null);
    };

    const giFilters: { key: GlycemicIndexFilter; label: string; }[] = [
        { key: 'low', label: t('share.history.giLow') },
        { key: 'medium', label: t('share.history.giMedium') },
        { key: 'high', label: t('share.history.giHigh') },
    ];
    
    return (
        <div className="relative">
             <div className="sticky top-0 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm -mx-4 px-4 py-3 z-10 space-y-3">
                <div className="relative">
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t('share.history.searchPlaceholder')}
                        className="w-full p-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-mint-green"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-1">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{t('share.history.filterBy')}:</span>
                         {giFilters.map(({ key, label }) => (
                            <button key={key} onClick={() => handleToggleFilter(key)} className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${activeFilter === key ? 'bg-mint-green text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                {label}
                            </button>
                        ))}
                    </div>
                     <select value={sortOption} onChange={e => setSortOption(e.target.value as SortOption)} className="bg-gray-200 dark:bg-gray-700 border-none rounded-md py-1 pl-2 pr-8 text-xs font-semibold text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-green">
                        <option value="newest">{t('share.history.newest')}</option>
                        <option value="oldest">{t('share.history.oldest')}</option>
                        <option value="score_desc">{t('share.history.scoreDesc')}</option>
                        <option value="score_asc">{t('share.history.scoreAsc')}</option>
                    </select>
                </div>
                <div className="flex items-center justify-end pt-1">
                    {!isComparing ? (
                         <button onClick={() => setIsComparing(true)} className="px-3 py-1.5 text-sm font-semibold text-white bg-calm-blue rounded-full hover:bg-calm-blue-dark transition-colors">
                             {t('share.history.compare.button')}
                         </button>
                    ) : (
                         <div className="flex items-center space-x-3">
                             <span className="text-sm font-semibold text-calm-blue">
                                 {t('share.history.compare.buttonAction', { count: selectedForComparison.length })}
                             </span>
                             <button onClick={resetComparison} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-red-500">
                                 {t('profile.cancel')}
                             </button>
                         </div>
                    )}
                </div>
             </div>
             <div className="pt-40 -mt-40">
                {displayedMeals.length > 0 ? (
                    <div className="space-y-3 pt-4">
                        {displayedMeals.map(meal => <HistoryMealCard key={meal.id} meal={meal} onDelete={setMealToDelete} onShare={setMealToShare} isComparing={isComparing} isSelected={!!selectedForComparison.find(m => m.id === meal.id)} onSelect={handleSelectForComparison} />)}
                    </div>
                ) : (
                     <div className="text-center py-10 pt-14">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">{t('share.history.noMeals')}</p>
                        <Link to="/scanner" className="bg-mint-green text-white font-bold py-2 px-4 rounded-full">
                            {t('share.history.scanFirst')}
                        </Link>
                    </div>
                )}
            </div>
             <ConfirmationModal
                isOpen={!!mealToDelete}
                onClose={() => setMealToDelete(null)}
                onConfirm={confirmDelete}
                title={t('share.history.deleteConfirmTitle')}
                message={t('share.history.deleteConfirmMessage')}
                confirmText={t('share.history.deleteMeal')}
                cancelText={t('profile.cancel')}
            />
             <ShareMealModal
                isOpen={!!mealToShare}
                onClose={() => setMealToShare(null)}
                meal={mealToShare}
            />
             {selectedForComparison.length === 2 && (
                <MealComparisonModal
                    meals={[selectedForComparison[0], selectedForComparison[1]]}
                    isOpen={isComparisonModalOpen}
                    onClose={resetComparison}
                />
             )}
        </div>
    );
};


const ArticlesView: React.FC<{}> = () => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
    
    const categories = ['All', 'Nutrition', 'Lifestyle', 'Recipes'];

    const filteredArticles = useMemo(() => {
        let articles: Article[] = Object.values(allArticles).flat();
        if (activeCategory !== 'All') {
            articles = articles.filter(a => a.category === activeCategory);
        }
        if (searchQuery) {
            articles = articles.filter(a => 
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                a.summary.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return articles;
    }, [activeCategory, searchQuery]);

    return (
        <div className="space-y-6">
            <div className="sticky top-0 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm py-2 z-10">
                <div className="relative">
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t('share.searchPlaceholder')}
                        className="w-full p-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-mint-green"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex space-x-2 overflow-x-auto pt-3 -mx-4 px-4 scrollbar-hide">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-mint-green text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
                        >
                            {t(`share.${cat.toLowerCase()}`)}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="space-y-4">
                {filteredArticles.length > 0 ? filteredArticles.map(article => (
                    <div key={article.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{article.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{article.summary}</p>
                             <button onClick={() => setExpandedArticleId(expandedArticleId === article.id ? null : article.id)} className="text-sm font-semibold text-mint-green mt-2">
                                {expandedArticleId === article.id ? 'Read Less' : 'Read More'}
                            </button>
                        </div>
                        {expandedArticleId === article.id && (
                            <div className="p-4 pt-0" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        )}
                    </div>
                )) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-10">{t('share.noResults')}</p>
                )}
            </div>
        </div>
    );
};

// --- Main Component ---

const Discover = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'community' | 'history' | 'articles'>('history');
    const [selectedCommunityMeal, setSelectedCommunityMeal] = useState<Meal | null>(null);

    const tabs = [
        { id: 'community', label: t('share.tabCommunity') },
        { id: 'history', label: t('share.tabHistory') },
        { id: 'articles', label: t('share.tabArticles') },
    ];
    
    const renderContent = () => {
        switch (activeTab) {
            case 'community':
                return <CommunityView onCommunityMealSelect={setSelectedCommunityMeal} />;
            case 'history':
                return <HistoryView />;
            case 'articles':
                return <ArticlesView />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="flex flex-col h-full">
                <header className="p-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('share.title')}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('share.subtitle')}</p>
                </header>
                
                <nav className="sticky top-0 z-20 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-around">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full py-3 font-semibold transition-colors text-sm ${
                                    activeTab === tab.id
                                        ? 'text-mint-green border-b-2 border-mint-green'
                                        : 'text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="flex-grow overflow-y-auto p-4">
                    {renderContent()}
                </div>
            </div>

            <MealDetailModal
                isOpen={!!selectedCommunityMeal}
                onClose={() => setSelectedCommunityMeal(null)}
                meal={selectedCommunityMeal}
            />
        </>
    );
};

export default Discover;