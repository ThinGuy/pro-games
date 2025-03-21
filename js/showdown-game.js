/**
 * Main game controller for Ubuntu Pro Showdown trivia game
 * 
 * Manages game flow, scoring, and interaction between UI and data
 */

const UbuntuProShowdown = (function() {
    // Game state
    let gameMode = null;
    let currentQuestionIndex = 0;
    let currentQuestions = [];
    let score = 0;
    let correctAnswers = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    let startTime = 0;
    let questionStartTime = 0;
    let gameTimer = null;
    let timeLimit = 0;
    let fastAnswers = 0;
    let questionHistory = [];
    let categoryMastery = {};
    
    // DOM elements (defined in UI module, referenced here for clarity)
    const elements = {
        // Game screens
        startScreen: document.getElementById('start-screen'),
        gameScreen: document.getElementById('game-screen'),
        endScreen: document.getElementById('end-screen'),
        
        // Game elements
        questionText: document.getElementById('question-text'),
        answersContainer: document.getElementById('answers-container'),
        questionCounter: document.getElementById('question-counter'),
        questionCategory: document.getElementById('question-category'),
        timerBar: document.getElementById('timer-bar'),
        currentScore: document.getElementById('current-score'),
        correctCount: document.getElementById('correct-count'),
        currentStreak: document.getElementById('current-streak'),
        timeBonus: document.getElementById('time-bonus'),
        
        // End screen elements
        finalScore: document.getElementById('final-score'),
        finalCorrect: document.getElementById('final-correct'),
        answersScore: document.getElementById('answers-score'),
        finalTimeBonus: document.getElementById('final-time-bonus'),
        finalStreakBonus: document.getElementById('final-streak-bonus')
    };
    
    /**
     * Initialize the game
     */
    function init() {
        // Set up event listeners for game mode buttons
        document.querySelectorAll('.game-mode').forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.getAttribute('data-mode');
                startGame(mode);
            });
        });
        
        // Daily challenge button
        document.getElementById('start-daily').addEventListener('click', () => {
            startGame('daily');
        });
        
        // Play again button
        document.getElementById('play-again').addEventListener('click', () => {
            returnToStart();
        });
        
        // Load and display player stats
        updatePlayerStats();
    }
    
    /**
     * Update player stats on the start screen
     */
    function updatePlayerStats() {
        const stats = ShowdownStorage.getPlayerStats();
        document.getElementById('games-played').textContent = stats.gamesPlayed;
        document.getElementById('best-score').textContent = stats.bestScore;
        document.getElementById('achievements-count').textContent = 
            `${stats.achievements}/${stats.totalAchievements}`;
    }
    
    /**
     * Start a new game
     * @param {string} mode - Game mode (quick, full, lightning, daily)
     */
    function startGame(mode) {
        gameMode = mode;
        currentQuestionIndex = 0;
        score = 0;
        correctAnswers = 0;
        currentStreak = 0;
        maxStreak = 0;
        fastAnswers = 0;
        questionHistory = [];
        categoryMastery = {
            [QUESTION_CATEGORIES.FUNDAMENTALS]: true,
            [QUESTION_CATEGORIES.SECURITY]: true,
            [QUESTION_CATEGORIES.DEPLOYMENT]: true,
            [QUESTION_CATEGORIES.LICENSING]: true
        };
        
        // Reset UI
        elements.currentScore.textContent = '0';
        elements.correctCount.textContent = '0';
        elements.currentStreak.textContent = '0';
        elements.timeBonus.textContent = '0';
        
        // Select questions based on game mode
        selectQuestions(mode);
        
        // Set time limit based on game mode
        setTimeLimit(mode);
        
        // Show game screen
        showScreen('game');
        
        // Start first question
        startNextQuestion();
    }
    
    /**
     * Select questions based on game mode
     * @param {string} mode - Game mode
     */
    function selectQuestions(mode) {
        let numQuestions;
        let categories;
        
        switch (mode) {
            case 'quick':
                numQuestions = 5;
                categories = Object.values(QUESTION_CATEGORIES);
                break;
            case 'full':
                numQuestions = 15;
                categories = Object.values(QUESTION_CATEGORIES);
                break;
            case 'lightning':
                numQuestions = 10;
                categories = Object.values(QUESTION_CATEGORIES);
                break;
            case 'daily':
                numQuestions = 1;
                categories = Object.values(QUESTION_CATEGORIES);
                break;
            default:
                numQuestions = 5;
                categories = Object.values(QUESTION_CATEGORIES);
        }
        
        // Group questions by category
        const questionsByCategory = {};
        categories.forEach(category => {
            questionsByCategory[category] = questions.filter(q => q.category === category);
        });
        
        // Select questions from each category
        currentQuestions = [];
        const questionsPerCategory = Math.ceil(numQuestions / categories.length);
        
        categories.forEach(category => {
            const categoryQuestions = [...questionsByCategory[category]];
            shuffleArray(categoryQuestions);
            
            // Take up to questionsPerCategory questions from this category
            currentQuestions = currentQuestions.concat(
                categoryQuestions.slice(0, questionsPerCategory)
            );
        });
        
        // Shuffle and trim to the required number
        shuffleArray(currentQuestions);
        currentQuestions = currentQuestions.slice(0, numQuestions);
    }
    
    /**
     * Set time limit based on game mode
     * @param {string} mode - Game mode
     */
    function setTimeLimit(mode) {
        switch (mode) {
            case 'quick':
                timeLimit = 20; // 20 seconds per question
                break;
            case 'full':
                timeLimit = 30; // 30 seconds per question
                break;
            case 'lightning':
                timeLimit = 15; // Starting time, will decrease
                break;
            case 'daily':
                timeLimit = 60; // 60 seconds for the daily challenge
                break;
            default:
                timeLimit = 30;
        }
    }
    
    /**
     * Start the next question
     */
    function startNextQuestion() {
        if (currentQuestionIndex >= currentQuestions.length) {
            // End of game
            endGame();
            return;
        }
        
        const question = currentQuestions[currentQuestionIndex];
        
        // Update UI with question
        elements.questionText.textContent = question.text;
        elements.questionCategory.textContent = question.category;
        elements.questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${currentQuestions.length}`;
        
        // Render answers
        renderAnswers(question);
        
        // Update progress bar
        const progressPercent = (currentQuestionIndex / currentQuestions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progressPercent}%`;
        
        // Start timer
        startQuestionTimer();
        
        // Record question start time for scoring
        questionStartTime = Date.now();
        
        // Update game mascot to show "thinking" face
        document.getElementById('game-mascot').src = 'images/ob01/ob-wave.svg';
    }
    
    /**
     * Render answer buttons for the current question
     * @param {Object} question - Current question object
     */
    function renderAnswers(question) {
        const answersContainer = elements.answersContainer;
        answersContainer.innerHTML = '';
        
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'p-button--neutral';
            button.textContent = answer;
            button.dataset.index = index;
            
            button.addEventListener('click', () => {
                checkAnswer(index);
            });
            
            answersContainer.appendChild(button);
        });
    }
    
    /**
     * Start timer for current question
     */
    function startQuestionTimer() {
        // Clear any existing timer
        clearInterval(gameTimer);
        
        // Reset timer bar
        const timerBar = document.querySelector('.timer-progress');
        timerBar.style.width = '100%';
        timerBar.style.backgroundColor = '';
        
        let timeRemaining = timeLimit;
        
        // Adjust time limit for lightning mode
        if (gameMode === 'lightning') {
            timeRemaining = Math.max(5, timeLimit - currentQuestionIndex);
        }
        
        // Start timer countdown
        gameTimer = setInterval(() => {
            timeRemaining -= 0.1; // Update every 100ms for smoother animation
            
            // Update timer bar
            const percentRemaining = (timeRemaining / timeLimit) * 100;
            timerBar.style.width = `${percentRemaining}%`;
            
            // Change color as time runs out
            if (percentRemaining < 25) {
                timerBar.style.backgroundColor = '#c7162b'; // Red
            } else if (percentRemaining < 50) {
                timerBar.style.backgroundColor = '#f99b11'; // Orange
            }
            
            // Time's up
            if (timeRemaining <= 0) {
                clearInterval(gameTimer);
                // Handle timeout - count as wrong answer
                handleTimeout();
            }
        }, 100);
    }
    
    /**
     * Handle timeout when user doesn't answer in time
     */
    function handleTimeout() {
        const question = currentQuestions[currentQuestionIndex];
        
        // Update answer buttons to show correct answer
        const answerButtons = elements.answersContainer.querySelectorAll('button');
        
        answerButtons.forEach((button, index) => {
            button.disabled = true;
            
            if (index === question.correctAnswer) {
                button.classList.add('p-button--positive');
            }
        });
        
        // Show sad face
        document.getElementById('game-mascot').src = 'images/ob01/ob-sad.svg';
        
        // Reset streak
        currentStreak = 0;
        elements.currentStreak.textContent = '0';
        
        // Record question result
        questionHistory.push({
            question: question.text,
            isCorrect: false,
            timeToAnswer: timeLimit
        });
        
        // Mark category mastery as false
        categoryMastery[question.category] = false;
        
        // Show knowledge card after a short delay
        setTimeout(() => {
            showKnowledgeCard(question, false);
        }, 1500);
    }
    
    /**
     * Check if the selected answer is correct
     * @param {number} selectedIndex - Index of the selected answer
     */
    function checkAnswer(selectedIndex) {
        clearInterval(gameTimer);
        
        const question = currentQuestions[currentQuestionIndex];
        const isCorrect = selectedIndex === question.correctAnswer;
        
        // Calculate time taken to answer
        const timeToAnswer = (Date.now() - questionStartTime) / 1000;
        
        // Update answer buttons
        const answerButtons = elements.answersContainer.querySelectorAll('button');
        
        answerButtons.forEach((button, index) => {
            button.disabled = true;
            
            if (index === question.correctAnswer) {
                button.classList.add('p-button--positive');
            } else if (index === selectedIndex && !isCorrect) {
                button.classList.add('p-button--negative');
            }
        });
        
        // Update score and stats
        updateScore(isCorrect, timeToAnswer);
        
        // Record question result
        questionHistory.push({
            question: question.text,
            isCorrect,
            timeToAnswer
        });
        
        // Update category mastery
        if (!isCorrect) {
            categoryMastery[question.category] = false;
        }
        
        // Show appropriate mascot face
        document.getElementById('game-mascot').src = isCorrect ? 
            'images/ob01/ob-woo.svg' : 'images/ob01/ob-sad.svg';
        
        // Show knowledge card after a short delay
        setTimeout(() => {
            showKnowledgeCard(question, isCorrect);
        }, 1500);
    }
    
    /**
     * Update score based on answer correctness and speed
     * @param {boolean} isCorrect - Whether the answer was correct
     * @param {number} timeToAnswer - Time taken to answer in seconds
     */
    function updateScore(isCorrect, timeToAnswer) {
        if (isCorrect) {
            // Base points
            score += 10;
            correctAnswers++;
            
            // Update streak
            currentStreak++;
            if (currentStreak > maxStreak) {
                maxStreak = currentStreak;
            }
            
            // Streak bonus (max 5 points)
            const streakBonus = Math.min(currentStreak, 5);
            score += streakBonus;
            
            // Speed bonus
            let speedBonus = 0;
            if (timeToAnswer < 3) {
                speedBonus = 5;
                fastAnswers++;
            } else if (timeToAnswer < 5) {
                speedBonus = 3;
            } else if (timeToAnswer < 10) {
                speedBonus = 1;
            }
            
            score += speedBonus;
            
            // Update UI
            elements.currentScore.textContent = score;
            elements.correctCount.textContent = correctAnswers;
            elements.currentStreak.textContent = currentStreak;
            elements.timeBonus.textContent = speedBonus;
            
            // Show notification
            if (speedBonus > 0) {
                showNotification(`+${10 + streakBonus + speedBonus} points (${speedBonus} speed bonus)`, true);
            } else {
                showNotification(`+${10 + streakBonus} points`, true);
            }
        } else {
            // Reset streak
            currentStreak = 0;
            elements.currentStreak.textContent = '0';
            
            // Show notification
            showNotification('Incorrect answer', false);
        }
    }
    
    /**
     * Show the knowledge card with explanation
     * @param {Object} question - Current question
     * @param {boolean} isCorrect - Whether the answer was correct
     */
    function showKnowledgeCard(question, isCorrect) {
        const knowledgeCard = document.getElementById('knowledge-card');
        const knowledgeText = document.getElementById('knowledge-text');
        const learnMoreButton = document.getElementById('learn-more');
        
        // Set knowledge card text
        knowledgeText.textContent = question.knowledge;
        
        // Set learn more URL if available
        if (question.learnMoreUrl) {
            learnMoreButton.addEventListener('click', () => {
                window.open(question.learnMoreUrl, '_blank');
            });
            learnMoreButton.disabled = false;
        } else {
            learnMoreButton.disabled = true;
        }
        
        // Show knowledge card
        knowledgeCard.classList.remove('u-hide');
        
        // Set up next question button
        document.getElementById('next-question').addEventListener('click', () => {
            knowledgeCard.classList.add('u-hide');
            currentQuestionIndex++;
            startNextQuestion();
        });
    }
    
    /**
     * Show a notification message
     * @param {string} message - Notification message
     * @param {boolean} isPositive - Whether it's a positive notification
     */
    function showNotification(message, isPositive) {
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notification-message');
        
        notification.className = isPositive ? 
            'p-notification--positive' : 'p-notification--negative';
        
        notificationMessage.textContent = message;
        
        notification.classList.remove('u-hide');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.add('u-hide');
        }, 3000);
    }
    
    /**
     * End the game and show results
     */
    function endGame() {
        // Calculate final score
        const finalScore = score;
        
        // Prepare game data for storage
        const gameData = {
            mode: gameMode,
            score: finalScore,
            correctAnswers: correctAnswers,
            totalQuestions: currentQuestions.length,
            maxStreak: maxStreak,
            fastAnswers: fastAnswers,
            securityMastery: categoryMastery[QUESTION_CATEGORIES.SECURITY],
            licensingMastery: categoryMastery[QUESTION_CATEGORIES.LICENSING],
            deploymentMastery: categoryMastery[QUESTION_CATEGORIES.DEPLOYMENT],
            knowledgeCardsViewed: currentQuestions.length
        };
        
        // Record game in storage
        const newAchievements = ShowdownStorage.recordGame(gameData);
        
        // Update final score display
        elements.finalScore.textContent = finalScore;
        elements.finalCorrect.textContent = correctAnswers;
        elements.answersScore.textContent = correctAnswers * 10;
        
        // Get leaderboard position
        const position = ShowdownStorage.getLeaderboardPosition(finalScore);
        const totalPlayers = ShowdownStorage.getLeaderboard().length;
        
        document.getElementById('leaderboard-position').textContent = position;
        document.getElementById('leaderboard-total').textContent = totalPlayers;
        
        // Show new achievements if any
        if (newAchievements && newAchievements.length > 0) {
            const newAchievementCard = document.getElementById('new-achievement-card');
            const achievementIcon = document.getElementById('achievement-icon');
            const achievementName = document.getElementById('achievement-name');
            const achievementDesc = document.getElementById('achievement-desc');
            
            achievementIcon.src = newAchievements[0].icon;
            achievementName.textContent = newAchievements[0].name;
            achievementDesc.textContent = newAchievements[0].description;
            
            newAchievementCard.classList.remove('u-hide');
        }
        
        // Show end screen
        showScreen('end');
    }
    
    /**
     * Show a specific screen and hide others
     * @param {string} screenName - Screen to show (start, game, end)
     */
    function showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.game-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show selected screen
        document.getElementById(`${screenName}-screen`).classList.add('active');
        
        // Update body data attribute for CSS targeting
        document.body.setAttribute('data-game-state', screenName);
    }
    
    /**
     * Return to start screen
     */
    function returnToStart() {
        // Update player stats
        updatePlayerStats();
        
        // Show start screen
        showScreen('start');
    }
    
    /**
     * Shuffle array using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array} - The shuffled array
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Initialize the game when DOM is loaded
    document.addEventListener('DOMContentLoaded', init);
    
    // Public API
    return {
        startGame,
        returnToStart
    };
})();

// Initialize welcome popup
document.addEventListener('DOMContentLoaded', () => {
    const welcomePopup = document.getElementById('welcome-popup');
    const welcomeCloseBtn = document.getElementById('welcome-close-btn');
    const settingsLink = document.getElementById('settings-link');
    const settingsModal = document.getElementById('settings-modal');
    const settingsCloseBtn = document.querySelector('#settings-modal .p-modal__close');
    const settingsCancelBtn = document.getElementById('settings-cancel');
    const settingsSaveBtn = document.getElementById('settings-save');
    
    // Show welcome popup
    welcomePopup.style.display = 'flex';
    
    // Close welcome popup
    welcomeCloseBtn.addEventListener('click', () => {
        welcomePopup.style.display = 'none';
    });
    
    // Settings modal
    settingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        settingsModal.setAttribute('aria-modal', 'true');
        settingsModal.style.display = 'flex';
    });
    
    settingsCloseBtn.addEventListener('click', () => {
        settingsModal.setAttribute('aria-modal', 'false');
        settingsModal.style.display = 'none';
    });
    
    settingsCancelBtn.addEventListener('click', () => {
        settingsModal.setAttribute('aria-modal', 'false');
        settingsModal.style.display = 'none';
    });
    
    settingsSaveBtn.addEventListener('click', () => {
        const soundEnabled = document.getElementById('sound-toggle').checked;
        const difficulty = document.getElementById('difficulty-select').value;
        const playerName = document.getElementById('player-name').value;
        
        // Save settings
        ShowdownStorage.updateSettings({
            soundEnabled,
            difficulty,
            playerName: playerName || 'Anonymous'
        });
        
        settingsModal.setAttribute('aria-modal', 'false');
        settingsModal.style.display = 'none';
    });
    
    // Load settings
    document.getElementById('sound-toggle').checked = 
        ShowdownStorage.getSetting('soundEnabled');
    document.getElementById('difficulty-select').value = 
        ShowdownStorage.getSetting('difficulty');
    document.getElementById('player-name').value = 
        ShowdownStorage.getSetting('playerName');
});
