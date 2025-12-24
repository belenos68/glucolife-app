const translations = {
  fr: {
    landing: {
      subtitle: "Votre partenaire IA pour une meilleure gestion de la glycémie.",
      cta: "Commencer l'aventure",
      discoverTitle: "Découvrez les fonctionnalités",
      feature1Title: "Scan de repas intelligent",
      feature1Desc: "Prenez une photo de votre plat et recevez une analyse nutritionnelle instantanée et un score glycémique.",
      feature2Title: "Assistant Nutritionnel IA",
      feature2Desc: "Posez des questions, recevez des conseils personnalisés et restez motivé grâce à votre coach IA.",
      feature3Title: "Suivi & Progression",
      feature3Desc: "Visualisez vos progrès avec des graphiques clairs, fixez des objectifs et débloquez des succès.",
      footer: "© {{year}} GlucoViva. Tous droits réservés."
    },
    auth: {
      welcomeBack: "Bon retour !",
      createAccount: "Créez votre compte pour commencer",
      name: "Nom complet",
      nickname: "Surnom (optionnel)",
      nicknamePlaceholder: "Ex: Lex",
      email: "Adresse e-mail",
      password: "Mot de passe",
      forgotPassword: "Mot de passe oublié ?",
      login: "Connexion",
      signup: "S'inscrire",
      noAccount: "Pas encore de compte ? S'inscrire",
      hasAccount: "Déjà un compte ? Se connecter",
      forgotTitle: "Mot de passe oublié",
      forgotSubtitle: "Entrez votre e-mail pour recevoir un lien de réinitialisation.",
      resetLinkSent: "Un lien de réinitialisation a été envoyé à votre adresse e-mail.",
      sendResetLink: "Envoyer le lien de réinitialisation",
      backToLogin: "Retour à la connexion"
    },
    nav: {
      dashboard: 'Tableau de bord',
      scanner: 'Scanner',
      share: 'Découvrir',
      assistant: 'Assistant',
      profile: 'Profil',
    },
    dashboard: {
      disclaimer: "GlucoViva est un outil de suivi et non un dispositif médical. Consultez toujours un professionnel de santé pour tout conseil médical.",
      greeting: "Bonjour, {{name}} !",
      tagline: "Prêt pour votre objectif glycémique de la journée ?",
      program: "Votre programme",
      summaryTitle: "Résumé du jour",
      mealsScanned: "Repas scannés",
      avgScore: "Score moyen",
      streak: "Série",
      dailyTipTitle: "Le conseil du jour",
      aiTipTitle: "Analyse Personnalisée de votre Assistant IA",
      aiTipSubtitle: "Basé sur vos dernières activités.",
      aiLoading: "Analyse de vos données en cours...",
      aiError: "Désolé, une erreur est survenue lors de la génération de l'analyse. Veuillez réessayer plus tard.",
      aiRateLimitError: "Trop de requêtes. Veuillez patienter un moment avant de réessayer.",
      aiInitialMessage: "Cliquez sur l'icône de rafraîchissement pour obtenir une analyse.",
      aiNoData: "Scannez un repas pour débloquer votre analyse personnalisée.",
      historyChartTitle: "Historique Glycémique",
      glucoseChartEmpty: "Pas assez de données pour afficher le graphique. Ajoutez plus de plats et de mesures.",
      yAxisGlucose: "Glycémie (mg/dL)",
      yAxisScore: "Score Glycémique",
      glucose: "Glycémie",
      glycemicScore: "Score Glycémique",
      addReadingTitle: "Ajouter une mesure de glycémie",
      glucosePlaceholder: "ex: 120 mg/dL",
      add: "Ajouter",
      recentMeals: "Derniers plats",
      noMeals: "Vous n'avez pas encore scanné de plat.",
      scanFirstMeal: "Scanner mon premier plat",
      trendUp: "à la hausse",
      trendDown: "à la baisse",
      trendStable: "stable",
      goalSet: "Votre objectif est de réduire votre score moyen de {{targetReduction}} points en {{durationDays}} jours.",
      goalMissing: "Vous n'avez pas encore défini d'objectif.",
      aiPrompt: "Agis en tant que coach en nutrition. Mon programme de suivi est le suivant : \"{{programDescription}}\". Voici un résumé nutritionnel de mes derniers repas :\\n{{mealData}}\\n\\nEn te basant UNIQUEMENT sur la description de mon programme et les composants nutritionnels de ces repas, fournis une analyse courte (2-3 phrases), encourageante et personnalisée en {{language}}. Ne suggère pas de consulter un médecin. Ne pose pas de question.",
      summary: {
        totalMeals: "Plats Scannés",
        mealsToday: "Plats du Jour",
        lastScore: "Dernier Score"
      }
    },
    scanner: {
        title: "Scannez votre Plat",
        subtitle: "Prenez une photo de votre plat pour une analyse instantanée.",
        takePhoto: "Prendre une photo",
        uploadPhoto: "Importer une photo",
        mealPreview: "Aperçu du plat",
        analyzing: "Analyse en cours...",
        interrupt: "Interrompre",
        analyze: "Analyser",
        save: "Enregistrer le plat",
        cancel: "Annuler",
        selectImageError: "Veuillez sélectionner une image d'abord.",
        analysisError: "L'analyse a échoué. Veuillez réessayer avec une image plus claire.",
        share: "Partager",
        ingredients: "Ingrédients principaux",
        carbs: "Glucides",
        protein: "Protéines",
        fats: "Lipides",
        fiber: "Fibres",
        glycemicIndex: "Indice Glycémique",
        aiAdvice: "Conseil de votre Assistant IA",
        customizeScore: "Personnaliser le score (optionnel)",
        preMealGlucose: "Glycémie pré-repas (mg/dL)",
        postMealGlucose: "Glycémie post-repas (mg/dL)",
        analysisPrompt: "Analyse cette image d'un plat. Identifie le nom du plat, les ingrédients principaux (max 5), et estime les macronutriments (glucides, protéines, lipides, fibres en grammes). Estime aussi l'indice glycémique global ('faible', 'moyen', ou 'élevé'). Fournis un conseil nutritionnel court. Réponds uniquement en JSON avec les clés : mealName, ingredients, carbohydrates, protein, fats, fiber, glycemicIndex, advice.",
        personalizedAdvicePrompt: "Agis en tant que coach en nutrition. Mon programme est '{{program}}'. J'ai mangé '{{mealName}}' ({{carbs}}g glucides, IG {{gi}}). Ma glycémie avant était de {{preValue}}mg/dL et après de {{postValue}}mg/dL (pic de {{spike}}mg/dL). Fournis un conseil court (2-3 phrases) et personnalisé en {{language}} basé sur ces données. Sois encourageant.",
        personalizedAdviceError: "Impossible de générer le conseil personnalisé pour le moment.",
        shareTitle: "Découvrez mon plat !",
        shareText: "Je viens d'analyser mon plat '{{mealName}}' avec GlucoViva ! {{carbs}}g de glucides, IG {{gi}}. Le conseil de l'IA : '{{advice}}'",
        shareSuccess: "Copié dans le presse-papiers !",
        shareError: "Le partage a échoué."
    },
    assistant: {
        title: "Votre Assistant IA",
        subtitle: "Votre coach personnel pour une meilleure santé",
        welcomeMessage: "Bonjour {{name}} ! Comment puis-je vous aider aujourd'hui ?",
        placeholder: "Posez une question sur la nutrition...",
        quickActionsTitle: "Suggestions rapides :",
        quickAction1: "Donne-moi une idée de collation saine.",
        quickAction2: "Qu'est-ce qu'un bon repas avant le sport ?",
        quickAction3: "Explique l'indice glycémique.",
        errorMessage: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
        initError: "Impossible d'initialiser l'assistant. Veuillez vérifier votre connexion ou réessayer plus tard.",
        dataContextPrompt: "Voici un résumé des données récentes de l'utilisateur. Repas : {{meals}}. Mesures de glycémie : {{readings}}. Utilise ce contexte pour répondre à la question suivante.",
        tabChat: "Assistant",
        tabSearch: "Recherche Santé",
        search: {
            searchTitle: "Recherche de Ressources Santé",
            searchSubtitle: "Trouvez des informations fiables sur la nutrition et la santé, alimentées par Google Search.",
            searchPlaceholder: "ex: bienfaits des amandes",
            searchPrompt: "Agis comme un assistant de santé. L'utilisateur recherche '{{query}}'. Fournis un résumé concis basé sur les résultats de recherche et liste les sources. Réponds en {{language}}.",
            searchError: "La recherche a échoué. Veuillez réessayer.",
            sources: "Sources :"
        }
    },
    share: {
        title: "Explorer",
        subtitle: "Découvrez des articles, des recettes et l'historique de vos plats.",
        all: "Tout",
        nutrition: "Nutrition",
        lifestyle: "Style de vie",
        recipes: "Recettes",
        searchPlaceholder: "Rechercher des articles...",
        noResults: "Aucun article ne correspond à votre recherche.",
        tabHistory: "Mon Historique",
        tabCommunity: "Communauté",
        tabArticles: "Articles",
        history: {
            today: "Aujourd'hui",
            yesterday: "Hier",
            searchPlaceholder: "Rechercher par nom ou indice glycémique...",
            noMeals: "Votre historique est vide ou ne correspond pas à vos filtres.",
            scanFirst: "Scanner votre premier plat",
            deleteMeal: "Supprimer",
            deleteConfirmTitle: "Supprimer le plat",
            deleteConfirmMessage: "Êtes-vous sûr de vouloir supprimer ce plat ? Cette action est irréversible.",
            addSuccess: "Plat ajouté à votre historique avec succès !",
            compare: {
                button: "Comparer des plats",
                buttonAction: "Comparer ({{count}}/2)",
                modalTitle: "Comparaison de Plats",
                shareModalTitle: "Partager la comparaison",
                aiAnalysisTitle: "Analyse de l'Assistant IA",
                aiLoading: "Génération de l'analyse comparative...",
                aiError: "Impossible de générer l'analyse comparative pour le moment.",
                aiPrompt: "Compare ces deux plats d'un point de vue nutritionnel et glycémique. Plat A: {{mealAName}} ({{mealACarbs}}g glucides, IG {{mealAGI}}, score {{mealAScore}}). Plat B: {{mealBName}} ({{mealBCarbs}}g glucides, IG {{mealBGI}}, score {{mealBScore}}). Explique lequel est le meilleur choix et pourquoi en 2-3 phrases. Réponds en {{language}}.",
                shareText: "Regardez cette comparaison intéressante entre '{{mealA}}' et '{{mealB}}' que j'ai faite sur GlucoViva ! Qu'en pensez-vous ?"
            },
            sortBy: "Trier par",
            newest: "Plus récent",
            oldest: "Plus ancien",
            scoreDesc: "Score (élevé > bas)",
            scoreAsc: "Score (bas > élevé)",
            filterBy: "Filtrer",
            giLow: "Faible",
            giMedium: "Moyen",
            giHigh: "Élevé"
        },
        mealDetail: {
            title: "Détails du Plat",
            communityRating: "Note de la communauté",
            scanCount: "{{count}} scans",
            glycemicSpike: "Pic glycémique post-repas",
            rateThisMeal: "Notez ce plat",
            addToLog: "Ajouter à mon historique"
        },
        community: {
            topMealsTitle: "Plats populaires de la communauté",
            topMealsSubtitle: "Inspirez-vous des repas les mieux notés par les utilisateurs.",
            postsTitle: "Fil d'actualité",
            noPostsFound: "Aucune publication pour le moment. Soyez le premier à partager !",
            publish: "Publier",
            sort: "Trier par",
            sortOptions: {
                date: "Plus récent",
                reactions: "Plus populaire"
            },
            createPost: {
                title: "Partager une publication",
                placeholder: "Partagez une astuce, une recette ou posez une question...",
                publishing: "Publication..."
            },
            leaderboard: {
                weeklyTitle: "Classement Hebdomadaire",
                cta: "Scannez des plats pour grimper dans le classement !"
            },
            shareMeal: "Partager dans la communauté",
            shareMealModal: {
                title: "Partager votre plat",
                prompt: "Ajoutez un message à votre publication :",
                placeholder: "Ex: Mon dîner de ce soir, super score !",
                defaultMessage: "Voici mon dernier plat analysé avec GlucoViva, qu'en pensez-vous ?",
                success: "Publication partagée avec succès !"
            },
            mealPlan: {
                title: "Votre Plan Repas du Jour",
                subtitle: "Recevez un plan personnalisé par l'IA basé sur vos objectifs et votre programme.",
                generateButton: "Générer mon plan",
                generateAgainButton: "Générer à nouveau",
                shareButton: "Partager",
                loading: "L'IA prépare votre plan personnalisé...",
                error: "Désolé, une erreur est survenue lors de la génération du plan.",
                prompt: "Agis en tant que coach en nutrition. Mon programme de suivi est '{{program}}'. Mon objectif actuel est de {{goalDescription}}. Crée un plan de repas simple pour une journée (petit-déjeuner, déjeuner, dîner) qui correspond à mon programme et m'aide à atteindre mon objectif. Pour chaque repas, fournis un nom et une courte description (1 phrase). Réponds uniquement en JSON avec la structure : { \"breakfast\": { \"name\": \"...\", \"description\": \"...\" }, \"lunch\": { \"name\": \"...\", \"description\": \"...\" }, \"dinner\": { \"name\": \"...\", \"description\": \"...\" } }. Réponds en {{language}}.",
                noGoalDescription: "maintenir un mode de vie sain",
                goalDescription: "réduire mon score glycémique moyen de {{targetReduction}} points",
                breakfast: "Petit-déjeuner",
                lunch: "Déjeuner",
                dinner: "Dîner",
                shareModal: {
                    title: "Partager votre plan repas",
                    prompt: "Ajoutez un message à votre plan :",
                    defaultMessage: "Voici le plan repas que GlucoViva m'a généré aujourd'hui ! Qu'en pensez-vous ?",
                }
            }
        }
    },
    profile: {
        trackingProgram: "Programme de suivi",
        language: "Langue",
        settings: "Paramètres",
        help: "Aide",
        about: "À propos",
        logout: "Déconnexion",
        cancel: "Annuler",
        goalCard: {
            noGoal: "Définissez un objectif",
            noGoalPrompt: "Fixer un objectif peut vous aider à rester motivé.",
            setGoal: "Fixer un objectif",
            title: "Votre Objectif Actuel",
            description: "Réduire le score moyen de {{target}} points",
            daysRemaining: "{{days}} jours restants",
            progress: "Progression",
            initialScore: "Score initial",
            currentScore: "Score actuel",
            abandon: "Abandonner l'objectif",
            confirmAbandon: "Êtes-vous sûr de vouloir abandonner votre objectif ?",
            completed: "Objectif atteint !",
            expiredGoal: "Objectif terminé",
            expiredGoalPrompt: "Il est temps de définir un nouvel objectif pour continuer votre progression.",
            trendChartTitle: "Tendance du score moyen",
            chartTooltipLabel: "Repas n°{{mealIndex}}",
            chartYAxisLabel: "Score moyen"
        },
        goalModal: {
            title: "Définir un nouvel objectif",
            targetLabel: "Je veux réduire mon score glycémique moyen de :",
            points: "points",
            durationLabel: "Sur une période de :",
            d7: "7 jours",
            d14: "14 jours",
            d30: "30 jours",
            save: "Enregistrer l'objectif",
        },
        editModal: {
            title: "Modifier le profil",
            nameLabel: "Nom complet",
            emailLabel: "Adresse e-mail",
            save: "Enregistrer",
        },
        settingsView: {
            appearance: "Apparence",
            theme: "Thème",
            light: "Clair",
            dark: "Sombre",
            system: "Système",
            data: "Données",
            export: "Exporter mes données",
            delete: "Supprimer mon compte",
            deleteConfirm: "Êtes-vous sûr de vouloir supprimer votre compte ? Toutes vos données seront perdues.",
            aboutSectionTitle: "Programme",
            terms: "Conditions d'utilisation",
            privacy: "Politique de confidentialité",
            exportModal: {
                title: "Exporter vos données",
                description: "Téléchargez une copie de vos données dans le format de votre choix.",
                csvTitle: "Exporter en CSV",
                csvDesc: "Idéal pour les tableurs (Excel, Google Sheets).",
                jsonTitle: "Exporter en JSON",
                jsonDesc: "Pour une portabilité complète des données.",
                shareTitle: "Partager un résumé",
                shareDesc: "Générez un résumé de vos progrès à partager.",
                close: "Fermer"
            },
            shareModal: {
                title: "Partager mon résumé",
                summaryTitle: "Mon résumé GlucoViva",
                summaryFor: "Résumé pour {{name}}",
                mealsScanned: "Plats scannés",
                avgScore: "Score moyen",
                dayStreak: "Série",
                share: "Partager",
                shareText: "Voici mon résumé sur GlucoViva ! {{mealCount}} plats scannés, un score moyen de {{avgScore}}, et une série de {{streak}} jours ! #GlucoViva",
                copied: "Résumé copié dans le presse-papiers !",
                shareError: "Erreur lors du partage.",
            },
            termsModal: {
                title: "Conditions d'Utilisation",
                lastUpdated: "Dernière mise à jour : 24 Juillet 2024",
                content: [
                    { title: "1. Introduction", text: "Bienvenue sur GlucoViva. En utilisant notre application, vous acceptez ces conditions d'utilisation." },
                    { title: "2. Utilisation de l'App", text: "GlucoViva est un outil informatif et ne remplace pas un avis médical. Vous êtes responsable de l'interprétation des données et des décisions concernant votre santé." },
                    { title: "3. Compte Utilisateur", text: "Vous êtes responsable de la sécurité de votre compte et de votre mot de passe." },
                    { title: "4. Données Utilisateur", text: "En utilisant le scan, vous nous autorisez à analyser les images de vos repas pour vous fournir des informations nutritionnelles. Vos données sont stockées localement sur votre appareil." },
                    { title: "5. Limitations de responsabilité", text: "Nous ne sommes pas responsables des décisions de santé que vous prenez en vous basant sur les informations de l'application. Consultez toujours un professionnel de santé." }
                ],
                close: "Fermer"
            },
            privacyModal: {
                title: "Politique de Confidentialité",
                lastUpdated: "Dernière mise à jour : 24 Juillet 2024",
                content: [
                    { title: "1. Collecte des données", text: "Nous collectons les données que vous nous fournissez : nom, e-mail, et les données de repas que vous scannez. Toutes ces données sont stockées localement sur votre appareil et ne sont pas envoyées sur nos serveurs." },
                    { title: "2. Utilisation des données", text: "Vos données sont utilisées pour personnaliser votre expérience dans l'application, suivre vos progrès et vous fournir des analyses pertinentes. Les images de repas sont envoyées à une API d'IA externe (Google Gemini) pour analyse, mais ne sont pas stockées par nous." },
                    { title: "3. Stockage des données", text: "Toutes vos données personnelles et de suivi sont stockées exclusivement sur votre appareil via le Local Storage de votre navigateur. La suppression du cache de votre navigateur ou des données du site entraînera la perte de vos informations." },
                    { title: "4. Partage des données", text: "Nous ne partageons aucune de vos données personnelles avec des tiers." }
                ],
                close: "Fermer"
            }
        },
        helpView: {
            welcomeTitle: "Bienvenue sur GlucoViva",
            welcomeDesc: "Votre guide pour une meilleure gestion de la glycémie. Cette section vous aidera à comprendre comment tirer le meilleur parti de l'application.",
            dashboardTitle: "Tableau de Bord",
            dashboardDesc1: "<strong>Aperçu :</strong> C'est votre page d'accueil. Vous y trouverez un résumé de votre journée, votre série, des conseils de l'IA et vos derniers repas.",
            dashboardDesc2: "<strong>Graphique :</strong> Visualisez l'évolution de votre glycémie et de vos scores de repas au fil du temps.",
            dashboardDesc3: "<strong>Ajout de glycémie :</strong> Enregistrez manuellement vos mesures de glycémie pour un suivi plus précis.",
            dashboardDesc4: "<strong>Conseil IA :</strong> Recevez des analyses personnalisées basées sur vos habitudes. Cliquez sur l'icône de rafraîchissement pour en générer une nouvelle.",
            scannerTitle: "Scanner de Repas",
            scannerDesc1: "<strong>Prendre une photo :</strong> Utilisez l'appareil photo de votre téléphone pour capturer une image de votre plat.",
            scannerDesc2: "<strong>Importer :</strong> Choisissez une photo depuis votre galerie.",
            scannerDesc3: "<strong>Analyse :</strong> L'IA identifie votre plat, estime les nutriments et l'indice glycémique, et vous donne un conseil.",
            scannerDesc4: "<strong>Score Glycémique :</strong> Un score de 0 à 100 qui évalue l'impact potentiel du plat sur votre glycémie. Plus le score est élevé, mieux c'est.",
            scannerDesc5: "<strong>Personnalisation :</strong> Ajoutez vos mesures de glycémie avant et après le repas pour obtenir un score et des conseils encore plus précis !",
            assistantTitle: "Assistant IA",
            assistantDesc: "C'est votre coach nutritionnel personnel. Posez-lui des questions sur les aliments, demandez des idées de recettes, ou des conseils pour gérer des situations spécifiques (ex: 'que manger avant de faire du sport ?').",
            profileTitle: "Profil & Objectifs",
            profileDesc1: "<strong>Programme :</strong> Choisissez le programme qui correspond le mieux à vos besoins (Prévention, Gestion, Optimisation).",
            profileDesc2: "<strong>Objectifs :</strong> Fixez-vous des objectifs de réduction de score pour rester motivé.",
            profileDesc3: "<strong>Paramètres :</strong> Gérez les options de l'application, comme le thème, la langue, et l'export de vos données.",
            reminder: "N'oubliez pas, GlucoViva est un outil de support. Pour toute question médicale, veuillez consulter un professionnel de la santé.",
            assistantLinkTitle: "Besoin d'aide ?",
            assistantLinkDescription: "Votre assistant IA est là pour répondre à toutes vos questions sur l'application et la nutrition.",
            assistantLinkButton: "Demander à l'Assistant",
        },
        feedback: {
            button: "Envoyer un commentaire",
            title: "Votre avis nous intéresse",
            typeLabel: "Type de commentaire",
            typeGeneral: "Général",
            typeBug: "Bug",
            typeFeature: "Suggestion",
            placeholder: "Décrivez votre bug, votre idée, ou laissez simplement un commentaire...",
            send: "Envoyer",
            success: "Merci ! Votre commentaire a bien été envoyé."
        },
        avatarModalTitle: "Changer d'avatar",
        takePhoto: "Prendre une photo",
        choosePhoto: "Choisir depuis la galerie",
        rating: {
            title: "Vous aimez GlucoViva ?",
            subtitle: "Votre avis nous aide à nous améliorer !",
            averageRating: "Note moyenne : {{average}} / 5",
            totalRatings: "({{count}} avis)",
            yourRating: "Donnez votre note"
        },
        invite: {
            title: "Invitez un ami !",
            description: "Partagez GlucoViva avec vos proches et aidez-les à prendre en main leur santé.",
            button: "Inviter",
            shareTitle: "Découvrez GlucoViva !",
            shareText: "J'utilise GlucoViva pour mieux gérer ma glycémie, c'est super utile ! Je te la recommande. #GlucoViva"
        },
        programs: {
            prevention: "Équilibre & Vitalité",
            preventionDesc: "Prévenez les déséquilibres et boostez votre énergie au quotidien.",
            diabetes: "Contrôle Glycémique",
            diabetesDesc: "Reprenez le pouvoir sur votre glycémie avec un suivi intelligent.",
            optimization: "Performance & Énergie",
            optimizationDesc: "Optimisez votre nutrition pour des performances physiques et mentales au top.",
            programDetails: {
                prevention: "Idéal si vous cherchez à comprendre l'impact de l'alimentation sur votre énergie et à prévenir les futurs problèmes de santé. Ce programme vous aide à :\n• Décoder les étiquettes et déjouer les sucres cachés.\n• Éliminer les coups de fatigue pour une énergie stable toute la journée.\n• Adopter des réflexes simples pour un bien-être durable et une vitalité retrouvée.",
                diabetes: "Conçu pour les personnes diabétiques (type 1 ou 2) qui veulent un contrôle précis et moins de charge mentale. L'IA vous accompagne pour :\n• Anticiper et lisser les pics de glycémie grâce à une analyse fine de vos repas.\n• Recevoir des suggestions de plats adaptés à vos besoins et vos goûts.\n• Faciliter le dialogue avec votre médecin grâce à des données claires, pour des décisions éclairées et une plus grande tranquillité d'esprit.",
                optimization: "Pour les athlètes, les biohackers, ou toute personne cherchant à maximiser son potentiel. Ce programme vous permet de :\n• Stratégiser votre alimentation pour une énergie explosive à l'entraînement et une récupération accélérée.\n• Aiguiser votre concentration et votre clarté mentale en maintenant une glycémie parfaitement stable.\n• Aller plus loin dans la bio-optimisation en ajustant finement votre nutrition pour des performances cognitives et physiques inégalées."
            },
            selectProgram: "Sélectionner ce programme",
            currentProgram: "Programme Actuel"
        },
        trophy: {
            unlockTitle: "Succès Déverrouillé !",
            shareMessage: "J'ai déverrouillé le succès '{{trophyName}}' sur GlucoViva ! #GlucoViva",
            scanner_novice: {
                name: "Novice du Scan",
                description: "Vous avez scanné vos 10 premiers repas. Continuez comme ça !"
            },
            streak_3_days: {
                name: "En Feu !",
                description: "3 jours de suite ! Votre régularité est la clé du succès."
            },
            streak_7_days: {
                name: "Imparable",
                description: "Une semaine complète de suivi ! Vous êtes sur une excellente lancée."
            },
            high_scorer: {
                name: "Excellent Score",
                description: "Vous avez obtenu un score de 95 ou plus. Votre choix de repas était parfait !"
            },
            top_student: {
                name: "Premier de la classe",
                description: "Un score parfait de 100 ! C'est la maîtrise totale."
            },
            goal_setter: {
                name: "Ambitieux",
                description: "Vous avez défini votre premier objectif. Un objectif clair est le premier pas vers la réussite."
            },
            perfect_week: {
                name: "Semaine Parfaite",
                description: "Un repas scanné chaque jour pendant 7 jours. Quelle discipline !"
            }
        },
        shareTip: {
            title: "Partager le conseil",
            generating: "Génération de l'image...",
            error: "Impossible de générer l'image. Veuillez réessayer.",
            share: "Partager l'image",
            shareText: "Voici un conseil nutritionnel du jour de l'app GlucoViva !"
        }
    }
  },
  en: {
    landing: {
        subtitle: "Your AI partner for better blood sugar management.",
        cta: "Start the Adventure",
        discoverTitle: "Discover the Features",
        feature1Title: "Smart Meal Scan",
        feature1Desc: "Take a photo of your dish and receive an instant nutritional analysis and a glycemic score.",
        feature2Title: "AI Nutritional Assistant",
        feature2Desc: "Ask questions, get personalized advice, and stay motivated with your AI coach.",
        feature3Title: "Tracking & Progress",
        feature3Desc: "Visualize your progress with clear charts, set goals, and unlock achievements.",
        footer: "© {{year}} GlucoViva. All rights reserved."
    },
    auth: {
        welcomeBack: "Welcome back!",
        createAccount: "Create your account to get started",
        name: "Full Name",
        nickname: "Nickname (optional)",
        nicknamePlaceholder: "e.g., Alex",
        email: "Email Address",
        password: "Password",
        forgotPassword: "Forgot password?",
        login: "Log In",
        signup: "Sign Up",
        noAccount: "Don't have an account yet? Sign Up",
        hasAccount: "Already have an account? Log In",
        forgotTitle: "Forgot Password",
        forgotSubtitle: "Enter your email to receive a reset link.",
        resetLinkSent: "A reset link has been sent to your email address.",
        sendResetLink: "Send Reset Link",
        backToLogin: "Back to Log In"
    },
    nav: {
        dashboard: "Dashboard",
        scanner: "Scanner",
        share: "Discover",
        assistant: "Assistant",
        profile: "Profile"
    },
    dashboard: {
        disclaimer: "GlucoViva is a tracking tool and not a medical device. Always consult a healthcare professional for any medical advice.",
        greeting: "Hello, {{name}}!",
        tagline: "Ready for today's glycemic goal?",
        program: "Your Program",
        summaryTitle: "Today's Summary",
        mealsScanned: "Meals Scanned",
        avgScore: "Average Score",
        streak: "Streak",
        dailyTipTitle: "Tip of the Day",
        aiTipTitle: "Personalized Analysis from Your AI Assistant",
        aiTipSubtitle: "Based on your recent activities.",
        aiLoading: "Analyzing your data...",
        aiError: "Sorry, an error occurred while generating the analysis. Please try again later.",
        aiRateLimitError: "Too many requests. Please wait a moment before trying again.",
        aiInitialMessage: "Click the refresh icon to get an analysis.",
        aiNoData: "Scan a meal to unlock your personalized analysis.",
        historyChartTitle: "Glycemic History",
        glucoseChartEmpty: "Not enough data to display the chart. Add more meals and readings.",
        yAxisGlucose: "Glucose (mg/dL)",
        yAxisScore: "Glycemic Score",
        glucose: "Glucose",
        glycemicScore: "Glycemic Score",
        addReadingTitle: "Add a Glucose Reading",
        glucosePlaceholder: "e.g., 120 mg/dL",
        add: "Add",
        recentMeals: "Recent Meals",
        noMeals: "You haven't scanned any meals yet.",
        scanFirstMeal: "Scan My First Meal",
        trendUp: "trending up",
        trendDown: "trending down",
        trendStable: "stable",
        goalSet: "Your goal is to reduce your average score by {{targetReduction}} points in {{durationDays}} days.",
        goalMissing: "You haven't set a goal yet.",
        aiPrompt: "Act as a nutrition coach. My tracking program is as follows: \"{{programDescription}}\". Here is a nutritional summary of my recent meals:\\n{{mealData}}\\n\\nBased ONLY on my program description and the nutritional components of these meals, provide a short (2-3 sentences), encouraging, and personalized analysis in {{language}}. Do not suggest consulting a doctor. Do not ask a question.",
        summary: {
            totalMeals: "Meals Scanned",
            mealsToday: "Meals Today",
            lastScore: "Last Score"
        }
    },
    scanner: {
        title: "Scan Your Meal",
        subtitle: "Take a picture of your meal for an instant analysis.",
        takePhoto: "Take a Photo",
        uploadPhoto: "Upload a Photo",
        mealPreview: "Meal Preview",
        analyzing: "Analyzing...",
        interrupt: "Interrupt",
        analyze: "Analyze",
        save: "Save Meal",
        cancel: "Cancel",
        selectImageError: "Please select an image first.",
        analysisError: "Analysis failed. Please try again with a clearer image.",
        share: "Share",
        ingredients: "Main Ingredients",
        carbs: "Carbs",
        protein: "Protein",
        fats: "Fats",
        fiber: "Fiber",
        glycemicIndex: "Glycemic Index",
        aiAdvice: "AI Assistant's Advice",
        customizeScore: "Customize Score (optional)",
        preMealGlucose: "Pre-meal Glucose (mg/dL)",
        postMealGlucose: "Post-meal Glucose (mg/dL)",
        analysisPrompt: "Analyze this image of a meal. Identify the dish name, main ingredients (max 5), and estimate macronutrients (carbohydrates, protein, fats, fiber in grams). Also estimate the overall glycemic index ('low', 'medium', or 'high'). Provide a short nutritional tip. Respond only in JSON with the keys: mealName, ingredients, carbohydrates, protein, fats, fiber, glycemicIndex, advice.",
        personalizedAdvicePrompt: "Act as a nutrition coach. My program is '{{program}}'. I ate '{{mealName}}' ({{carbs}}g carbs, GI {{gi}}). My pre-meal glucose was {{preValue}}mg/dL and post-meal was {{postValue}}mg/dL (a spike of {{spike}}mg/dL). Provide a short (2-3 sentences) and personalized tip in {{language}} based on this data. Be encouraging.",
        personalizedAdviceError: "Could not generate personalized advice at this time.",
        shareTitle: "Check out my meal!",
        shareText: "I just analyzed my '{{mealName}}' meal with GlucoViva! {{carbs}}g of carbs, {{gi}} GI. The AI's advice: '{{advice}}'",
        shareSuccess: "Copied to clipboard!",
        shareError: "Sharing failed."
    },
    assistant: {
        title: "Your AI Assistant",
        subtitle: "Your personal coach for better health",
        welcomeMessage: "Hello {{name}}! How can I help you today?",
        placeholder: "Ask a nutrition question...",
        quickActionsTitle: "Quick suggestions:",
        quickAction1: "Give me a healthy snack idea.",
        quickAction2: "What's a good pre-workout meal?",
        quickAction3: "Explain the glycemic index.",
        errorMessage: "Sorry, I couldn't process your request. Please try again.",
        initError: "Could not initialize the assistant. Please check your connection or try again later.",
        dataContextPrompt: "Here is a summary of the user's recent data. Meals: {{meals}}. Glucose readings: {{readings}}. Use this context to answer the following question.",
        tabChat: "Assistant",
        tabSearch: "Health Search",
        search: {
            searchTitle: "Health Resource Search",
            searchSubtitle: "Find reliable information on nutrition and health, powered by Google Search.",
            searchPlaceholder: "e.g., benefits of almonds",
            searchPrompt: "Act as a health assistant. The user is searching for '{{query}}'. Provide a concise summary based on the search results and list the sources. Respond in {{language}}.",
            searchError: "Search failed. Please try again.",
            sources: "Sources:"
        }
    },
    share: {
        title: "Explore",
        subtitle: "Discover articles, recipes, and your meal history.",
        all: "All",
        nutrition: "Nutrition",
        lifestyle: "Lifestyle",
        recipes: "Recipes",
        searchPlaceholder: "Search for articles...",
        noResults: "No articles match your search.",
        tabHistory: "My History",
        tabCommunity: "Community",
        tabArticles: "Articles",
        history: {
            today: "Today",
            yesterday: "Yesterday",
            searchPlaceholder: "Search by name or glycemic index...",
            noMeals: "Your history is empty or does not match your filters.",
            scanFirst: "Scan your first meal",
            deleteMeal: "Delete",
            deleteConfirmTitle: "Delete Meal",
            deleteConfirmMessage: "Are you sure you want to delete this meal? This action is irreversible.",
            addSuccess: "Meal successfully added to your history!",
            compare: {
                button: "Compare Meals",
                buttonAction: "Compare ({{count}}/2)",
                modalTitle: "Meal Comparison",
                shareModalTitle: "Share Comparison",
                aiAnalysisTitle: "AI Assistant Analysis",
                aiLoading: "Generating comparison analysis...",
                aiError: "Could not generate comparison analysis at this time.",
                aiPrompt: "Compare these two meals from a nutritional and glycemic perspective. Meal A: {{mealAName}} ({{mealACarbs}}g carbs, GI {{mealAGI}}, score {{mealAScore}}). Meal B: {{mealBName}} ({{mealBCarbs}}g carbs, GI {{mealBGI}}, score {{mealBScore}}). Explain which is the better choice and why in 2-3 sentences. Respond in {{language}}.",
                shareText: "Check out this interesting comparison between '{{mealA}}' and '{{mealB}}' I made on GlucoViva! What do you think?"
            },
            sortBy: "Sort by",
            newest: "Newest",
            oldest: "Oldest",
            scoreDesc: "Score (high > low)",
            scoreAsc: "Score (low > high)",
            filterBy: "Filter",
            giLow: "Low",
            giMedium: "Medium",
            giHigh: "High"
        },
        mealDetail: {
            title: "Meal Details",
            communityRating: "Community Rating",
            scanCount: "{{count}} scans",
            glycemicSpike: "Post-meal glycemic spike",
            rateThisMeal: "Rate this meal",
            addToLog: "Add to My History"
        },
        community: {
            topMealsTitle: "Popular Community Meals",
            topMealsSubtitle: "Get inspired by the highest-rated meals from users.",
            postsTitle: "News Feed",
            noPostsFound: "No posts yet. Be the first to share!",
            publish: "Publish",
            sort: "Sort by",
            sortOptions: {
                date: "Newest",
                reactions: "Most Popular"
            },
            createPost: {
                title: "Share a Post",
                placeholder: "Share a tip, a recipe, or ask a question...",
                publishing: "Publishing..."
            },
            leaderboard: {
                weeklyTitle: "Weekly Leaderboard",
                cta: "Scan meals to climb the leaderboard!"
            },
            shareMeal: "Share to Community",
            shareMealModal: {
                title: "Share Your Meal",
                prompt: "Add a message to your post:",
                placeholder: "e.g., My dinner tonight, great score!",
                defaultMessage: "Here's my latest meal analyzed with GlucoViva, what do you think?",
                success: "Post shared successfully!"
            },
            mealPlan: {
                title: "Your Daily Meal Plan",
                subtitle: "Get a personalized plan from our AI based on your goals and program.",
                generateButton: "Generate my plan",
                generateAgainButton: "Generate again",
                shareButton: "Share",
                loading: "The AI is preparing your personalized plan...",
                error: "Sorry, an error occurred while generating the plan.",
                prompt: "Act as a nutrition coach. My tracking program is '{{program}}'. My current goal is to {{goalDescription}}. Create a simple one-day meal plan (breakfast, lunch, dinner) that aligns with my program and helps me achieve my goal. For each meal, provide a name and a short description (1 sentence). Respond only in JSON with the structure: { \"breakfast\": { \"name\": \"...\", \"description\": \"...\" }, \"lunch\": { \"name\": \"...\", \"description\": \"...\" }, \"dinner\": { \"name\": \"...\", \"description\": \"...\" } }. Respond in {{language}}.",
                noGoalDescription: "maintain a healthy lifestyle",
                goalDescription: "reduce my average glycemic score by {{targetReduction}} points",
                breakfast: "Breakfast",
                lunch: "Lunch",
                dinner: "Dinner",
                shareModal: {
                    title: "Share your meal plan",
                    prompt: "Add a message to your plan:",
                    defaultMessage: "Here is the meal plan GlucoViva generated for me today! What do you think?",
                }
            }
        }
    },
    profile: {
        trackingProgram: "Tracking Program",
        language: "Language",
        settings: "Settings",
        help: "Help",
        about: "About",
        logout: "Log Out",
        cancel: "Cancel",
        goalCard: {
            noGoal: "Set a Goal",
            noGoalPrompt: "Setting a goal can help you stay motivated.",
            setGoal: "Set Goal",
            title: "Your Current Goal",
            description: "Reduce average score by {{target}} points",
            daysRemaining: "{{days}} days remaining",
            progress: "Progress",
            initialScore: "Initial score",
            currentScore: "Current score",
            abandon: "Abandon Goal",
            confirmAbandon: "Are you sure you want to abandon your goal?",
            completed: "Goal Achieved!",
            expiredGoal: "Goal Ended",
            expiredGoalPrompt: "It's time to set a new goal to continue your progress.",
            trendChartTitle: "Average Score Trend",
            chartTooltipLabel: "Meal #{{mealIndex}}",
            chartYAxisLabel: "Average score"
        },
        goalModal: {
            title: "Set a New Goal",
            targetLabel: "I want to reduce my average glycemic score by:",
            points: "points",
            durationLabel: "Over a period of:",
            d7: "7 days",
            d14: "14 days",
            d30: "30 days",
            save: "Save Goal"
        },
        editModal: {
            title: "Edit Profile",
            nameLabel: "Full Name",
            emailLabel: "Email Address",
            save: "Save"
        },
        settingsView: {
            appearance: "Appearance",
            theme: "Theme",
            light: "Light",
            dark: "Dark",
            system: "System",
            data: "Data",
            export: "Export My Data",
            delete: "Delete My Account",
            deleteConfirm: "Are you sure you want to delete your account? All your data will be lost.",
            aboutSectionTitle: "Program",
            terms: "Terms of Use",
            privacy: "Privacy Policy",
            exportModal: {
                title: "Export Your Data",
                description: "Download a copy of your data in the format of your choice.",
                csvTitle: "Export as CSV",
                csvDesc: "Ideal for spreadsheets (Excel, Google Sheets).",
                jsonTitle: "Export as JSON",
                jsonDesc: "For complete data portability.",
                shareTitle: "Share a Summary",
                shareDesc: "Generate a summary of your progress to share.",
                close: "Close"
            },
            shareModal: {
                title: "Share My Summary",
                summaryTitle: "My GlucoViva Summary",
                summaryFor: "Summary for {{name}}",
                mealsScanned: "Meals Scanned",
                avgScore: "Avg. Score",
                dayStreak: "Day Streak",
                share: "Share",
                shareText: "Here's my GlucoViva summary! {{mealCount}} meals scanned, an average score of {{avgScore}}, and a {{streak}}-day streak! #GlucoViva",
                copied: "Summary copied to clipboard!",
                shareError: "Error while sharing."
            },
            termsModal: {
                title: "Terms of Use",
                lastUpdated: "Last updated: July 24, 2024",
                content: [
                    { title: "1. Introduction", text: "Welcome to GlucoViva. By using our application, you agree to these terms of use." },
                    { title: "2. App Usage", text: "GlucoViva is an informational tool and does not replace medical advice. You are responsible for interpreting the data and making decisions about your health." },
                    { title: "3. User Account", text: "You are responsible for the security of your account and password." },
                    { title: "4. User Data", text: "By using the scan feature, you authorize us to analyze your meal images to provide you with nutritional information. Your data is stored locally on your device." },
                    { title: "5. Limitation of Liability", text: "We are not responsible for health decisions you make based on the application's information. Always consult a healthcare professional." }
                ],
                close: "Close"
            },
            privacyModal: {
                title: "Privacy Policy",
                lastUpdated: "Last updated: July 24, 2024",
                content: [
                    { title: "1. Data Collection", text: "We collect the data you provide us: name, email, and the meal data you scan. All this data is stored locally on your device and is not sent to our servers." },
                    { title: "2. Data Usage", text: "Your data is used to personalize your experience in the application, track your progress, and provide you with relevant analyses. Meal images are sent to an external AI API (Google Gemini) for analysis but are not stored by us." },
                    { title: "3. Data Storage", text: "All your personal and tracking data is stored exclusively on your device via your browser's Local Storage. Clearing your browser's cache or site data will result in the loss of your information." },
                    { title: "4. Data Sharing", text: "We do not share any of your personal data with third parties." }
                ],
                close: "Close"
            }
        },
        helpView: {
            welcomeTitle: "Welcome to GlucoViva",
            welcomeDesc: "Your guide to better blood sugar management. This section will help you understand how to get the most out of the application.",
            dashboardTitle: "Dashboard",
            dashboardDesc1: "<strong>Overview:</strong> This is your home page. Here you'll find a summary of your day, your streak, AI tips, and your latest meals.",
            dashboardDesc2: "<strong>Chart:</strong> Visualize the evolution of your blood glucose and meal scores over time.",
            dashboardDesc3: "<strong>Add Glucose:</strong> Manually log your blood glucose readings for more accurate tracking.",
            dashboardDesc4: "<strong>AI Tip:</strong> Get personalized analyses based on your habits. Click the refresh icon to generate a new one.",
            scannerTitle: "Meal Scanner",
            scannerDesc1: "<strong>Take a Photo:</strong> Use your phone's camera to capture an image of your dish.",
            scannerDesc2: "<strong>Upload:</strong> Choose a photo from your gallery.",
            scannerDesc3: "<strong>Analysis:</strong> The AI identifies your dish, estimates nutrients and glycemic index, and gives you a tip.",
            scannerDesc4: "<strong>Glycemic Score:</strong> A score from 0 to 100 that assesses the potential impact of the meal on your blood sugar. The higher the score, the better.",
            scannerDesc5: "<strong>Customization:</strong> Add your pre- and post-meal glucose readings for an even more accurate score and advice!",
            assistantTitle: "AI Assistant",
            assistantDesc: "This is your personal nutrition coach. Ask it questions about food, request recipe ideas, or get advice for specific situations (e.g., 'what to eat before a workout?').",
            profileTitle: "Profile & Goals",
            profileDesc1: "<strong>Program:</strong> Choose the program that best suits your needs (Prevention, Management, Optimization).",
            profileDesc2: "<strong>Goals:</strong> Set score reduction goals to stay motivated.",
            profileDesc3: "<strong>Settings:</strong> Manage application options, such as theme, language, and exporting your data.",
            reminder: "Remember, GlucoViva is a support tool. For any medical questions, please consult a healthcare professional.",
            assistantLinkTitle: "Need help?",
            assistantLinkDescription: "Your AI assistant is here to answer all your questions about the app and nutrition.",
            assistantLinkButton: "Ask the Assistant"
        },
        feedback: {
            button: "Send Feedback",
            title: "We Value Your Feedback",
            typeLabel: "Feedback Type",
            typeGeneral: "General",
            typeBug: "Bug Report",
            typeFeature: "Feature Request",
            placeholder: "Describe your bug, your idea, or just leave a comment...",
            send: "Send",
            success: "Thank you! Your feedback has been sent."
        },
        avatarModalTitle: "Change Avatar",
        takePhoto: "Take Photo",
        choosePhoto: "Choose from Gallery",
        rating: {
            title: "Enjoying GlucoViva?",
            subtitle: "Your rating helps us improve!",
            averageRating: "Average rating: {{average}} / 5",
            totalRatings: "({{count}} ratings)",
            yourRating: "Give your rating"
        },
        invite: {
            title: "Invite a Friend!",
            description: "Share GlucoViva with your loved ones and help them take control of their health.",
            button: "Invite",
            shareTitle: "Discover GlucoViva!",
            shareText: "I'm using GlucoViva to better manage my blood sugar, it's super helpful! I recommend it. #GlucoViva"
        },
        programs: {
            prevention: "Balance & Vitality",
            preventionDesc: "Prevent imbalances and boost your daily energy.",
            diabetes: "Glycemic Control",
            diabetesDesc: "Take back control of your blood sugar with smart tracking.",
            optimization: "Performance & Energy",
            optimizationDesc: "Optimize your nutrition for peak physical and mental performance.",
            programDetails: {
                prevention: "Ideal for understanding food's impact on your energy and preventing future health issues. This program helps you:\n• Decode labels and outsmart hidden sugars.\n• Eliminate energy slumps for stable, all-day vitality.\n• Adopt simple habits for lasting well-being and renewed energy.",
                diabetes: "Designed for individuals with diabetes (type 1 or 2) seeking precise control and less mental load. The AI supports you to:\n• Anticipate and smooth out glucose spikes with detailed meal analysis.\n• Receive meal suggestions tailored to your needs and tastes.\n• Facilitate conversations with your doctor using clear data, for informed decisions and greater peace of mind.",
                optimization: "For athletes, biohackers, or anyone looking to maximize their potential. This program allows you to:\n• Strategize your nutrition for explosive workout energy and accelerated recovery.\n• Sharpen your focus and mental clarity by maintaining perfectly stable glucose levels.\n• Go deeper into bio-optimization by fine-tuning your nutrition for unmatched cognitive and physical performance."
            },
            selectProgram: "Select This Program",
            currentProgram: "Current Program"
        },
        trophy: {
            unlockTitle: "Achievement Unlocked!",
            shareMessage: "I unlocked the '{{trophyName}}' achievement on GlucoViva! #GlucoViva",
            scanner_novice: {
                name: "Scan Novice",
                description: "You've scanned your first 10 meals. Keep it up!"
            },
            streak_3_days: {
                name: "On Fire!",
                description: "3 days in a row! Consistency is the key to success."
            },
            streak_7_days: {
                name: "Unstoppable",
                description: "A full week of tracking! You're on a great roll."
            },
            high_scorer: {
                name: "High Scorer",
                description: "You scored 95 or higher. Your meal choice was perfect!"
            },
            top_student: {
                name: "Top Student",
                description: "A perfect score of 100! That's total mastery."
            },
            goal_setter: {
                name: "Ambitious",
                description: "You've set your first goal. A clear goal is the first step towards success."
            },
            perfect_week: {
                name: "Perfect Week",
                description: "Scanned at least one meal every day for 7 days. What discipline!"
            }
        },
        shareTip: {
            title: "Share Tip",
            generating: "Generating image...",
            error: "Could not generate the image. Please try again.",
            share: "Share Image",
            shareText: "Here's a daily nutrition tip from the GlucoViva app!"
        }
    }
  }
};

// Fix: Export the translations object to be used as a module.
export default translations;