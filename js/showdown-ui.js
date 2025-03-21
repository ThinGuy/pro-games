/**
 * UI controller for Ubuntu Pro Showdown trivia game
 * 
 * Handles all DOM manipulation and user interface interactions
 * Controls game screens, animations, and visual feedback
 */

const UI = (function() {
  // DOM element cache
  const elements = {
    // Main screens
    startScreen: document.getElementById('start-screen'),
    gameScreen: document.getElementById('game-screen'),
    endScreen: document.getElementById('end-screen'),
    achievementsScreen: document.getElementById('achievements-screen'),
    leaderboardScreen: document.getElementById('leaderboard-screen'),
    
    // Start screen elements
    gameModeButtons: document.querySelectorAll('.game-mode'),
    startDailyButton: document.getElementById('start-daily'),
    viewAchievementsButton: document.getElementById('view-achievements'),
    viewLeaderboardButton: document.getElementById('view-leaderboard'),
    gamesPlayedElement: document.getElementById('games-played'),
    bestScoreElement: document.getElementById('best-score'),
    achievementsCountElement: document.getElementById('achievements-count'),
    
    // Game screen elements
    questionCategory: document.getElementById('question-category'),
    questionCounter: document.getElementById('question-counter'),
    timerBar: document.getElementById('timer-bar'),
    timerProgress: document.querySelector('.timer-progress'),
    questionText: document.getElementById('question-text'),
    answersContainer: document.getElementById('answers-container'),
    knowledgeCard: document.getElementById('knowledge-card'),
    knowledgeText: document.getElementById('knowledge-text'),
    learnMoreButton: document.getElementById('learn-more'),
    nextQuestionButton: document.getElementById('next-question'),
    gameMascot: document.getElementById('game-mascot'),
    scoreDisplay: document.getElementById('score-display'),
    currentScore: document.getElementById('current-score'),
    correctCount: document.getElementById('correct-count'),
    currentStreak: document.getElementById('current-streak'),
    timeBonus: document.getElementById('time-bonus'),
    
    // Powerups
    fiftyFiftyButton: document.getElementById('fifty-fifty'),
    timeFreezeButton: document.getElementById('time-freeze'),
    askCommunityButton: document.getElementById('ask-community'),
    
    // End screen elements
    finalScore: document.getElementById('final-score'),
    finalCorrect: document.getElementById('final-correct'),
    answersScore: document.getElementById('answers-score'),
    finalTimeBonus: document.getElementById('final-time-bonus'),
    finalStreakBonus: document.getElementById('final-streak-bonus'),
    newAchievementCard: document.getElementById('new-achievement-card'),
    achievementIcon: document.getElementById('achievement-icon'),
    achievementName: document.getElementById('achievement-name'),
    achievementDesc: document.getElementById('achievement-desc'),
    leaderboardPosition: document.getElementById('leaderboard-position'),
    leaderboardTotal: document.getElementById('leaderboard-total'),
    playAgainButton: document.getElementById('play-again'),
    shareResultsButton: document.getElementById('share-results'),
    challengeFriendButton: document.getElementById('challenge-friend'),
    
    // Achievements screen elements
    achievementsGrid: document.getElementById('achievements-grid'),
    backToStartButton: document.getElementById('back-to-start'),
    
    // Leaderboard screen elements
    globalLeaderboard: document.getElementById('global-leaderboard'),
    weeklyLeaderboard: document.getElementById('weekly-leaderboard'),
    friendsLeaderboard: document.getElementById('friends-leaderboard'),
    backFromLeaderboardButton: document.getElementById('back-from-leaderboard'),
    
    // Settings elements
    settingsLink: document.getElementById('settings-link'),
    settingsModal: document.getElementById('settings-modal'),
    settingsCancel: document.getElementById('settings-cancel'),
    settingsSave: document.getElementById('settings-save'),
    soundToggle: document.getElementById('sound-toggle'),
    difficultySelect: document.getElementById('difficulty-select'),
    playerNameInput: document.getElementById('player-name'),
    
    // Notification
    notification: document.getElementById('notification'),
    notificationTitle: document.getElementById('notification-title'),
    notificationMessage: document.getElementById('notification-message')
  };

  // Audio elements
  const audio = {
    correct: new Audio('audio/correct.mp3'),
    incorrect: new Audio('audio/incorrect.mp3'),
    countdown: new Audio('audio/countdown.mp3'),
    achievement: new Audio('audio/achievement.mp3')
  };

  // Current state
  let currentScreen = 'start';
  let isAnimating = false;
  
  /**
   * Initialize the UI
   */
  function init() {
    // Set initial player stats on start screen
    updatePlayerStats();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load settings
    loadSettings();
  }
  
  /**
   * Set up event listeners for UI elements
   */
  function setupEventListeners() {
    // Game mode selection
    elements.gameModeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const mode = button.getAttribute('data-mode');
        document.dispatchEvent(new CustomEvent('gameStart', { detail: { mode } }));
      });
    });
    
    // Daily challenge button
    elements.startDailyButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('gameStart', { detail: { mode: 'daily' } }));
    });
    
    // View achievements button
    elements.viewAchievementsButton.addEventListener('click', () => {
      showAchievementsScreen();
    });
    
    // View leaderboard button
    elements.viewLeaderboardButton.addEventListener('click', () => {
      showLeaderboardScreen();
    });
    
    // Next question button
    elements.nextQuestionButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('nextQuestion'));
    });
    
    // Learn more button
    elements.learnMoreButton.addEventListener('click', () => {
      // This will be handled by the game controller
      document.dispatchEvent(new CustomEvent('learnMore'));
    });
    
    // Powerup buttons
    elements.fiftyFiftyButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('usePowerup', { detail: { type: 'fiftyFifty' } }));
    });
    
    elements.timeFreezeButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('usePowerup', { detail: { type: 'timeFreeze' } }));
    });
    
    elements.askCommunityButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('usePowerup', { detail: { type: 'askCommunity' } }));
    });
    
    // Play again button
    elements.playAgainButton.addEventListener('click', () => {
      showStartScreen();
    });
    
    // Share results button
    elements.shareResultsButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('shareResults'));
    });
    
    // Challenge friend button
    elements.challengeFriendButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('challengeFriend'));
    });
    
    // Back to start button (from achievements)
    elements.backToStartButton.addEventListener('click', () => {
      showStartScreen();
    });
    
    // Back from leaderboard button
    elements.backFromLeaderboardButton.addEventListener('click', () => {
      showStartScreen();
    });
    
    // Settings link
    elements.settingsLink.addEventListener('click', (e) => {
      e.preventDefault();
      showSettingsModal();
    });
    
    // Settings modal close
    elements.settingsModal.querySelector('.p-modal__close').addEventListener('click', () => {
      hideSettingsModal();
    });
    
    // Settings cancel button
    elements.settingsCancel.addEventListener('click', () => {
      hideSettingsModal();
    });
    
    // Settings save button
    elements.settingsSave.addEventListener('click', () => {
      saveSettings();
      hideSettingsModal();
    });
  }
  
  /**
   * Load settings from storage
   */
  function loadSettings() {
    elements.soundToggle.checked = Storage.getSetting('soundEnabled');
    elements.difficultySelect.value = Storage.getSetting('difficulty');
    elements.playerNameInput.value = Storage.getSetting('playerName');
  }
  
  /**
   * Save settings to storage
   */
  function saveSettings() {
    const settings = {
      soundEnabled: elements.soundToggle.checked,
      difficulty: elements.difficultySelect.value,
      playerName: elements.playerNameInput.value || 'Anonymous'
    };
    
    Storage.updateSettings(settings);
    
    // Show notification
    showNotification('Settings Saved', 'Your settings have been updated successfully.', 'positive');
    
    // Update player stats display
    updatePlayerStats();
  }
  
  /**
   * Update player stats on start screen
   */
  function updatePlayerStats() {
    const stats = Storage.getPlayerStats();
    
    elements.gamesPlayedElement.textContent = stats.gamesPlayed;
    elements.bestScoreElement.textContent = stats.bestScore;
    elements.achievementsCountElement.textContent = `${stats.achievements}/${stats.totalAchievements}`;
  }
  
  /**
   * Show start screen
   */
  function showStartScreen() {
    if (isAnimating) return;
    isAnimating = true;
    
    hideAllScreens();
    elements.startScreen.classList.add('active');
    currentScreen = 'start';
    
    // Hide score display in header
    elements.scoreDisplay.classList.add('u-hide');
    
    // Update player stats
    updatePlayerStats();
    
    // Update powerup counts
    updatePowerupCounts();
    
    // Set mascot to wave
    setMascotState('wave');
    
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  /**
   * Show game screen
   */
  function showGameScreen() {
    if (isAnimating) return;
    isAnimating = true;
    
    hideAllScreens();
    elements.gameScreen.classList.add('active');
    currentScreen = 'game';
    
    // Show score display in header
    elements.scoreDisplay.classList.remove('u-hide');
    
    // Reset knowledge card
    elements.knowledgeCard.classList.add('u-hide');
    
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  /**
   * Show end screen
   * @param {Object} gameData Game result data
   */
  function showEndScreen(gameData) {
    if (isAnimating) return;
    isAnimating = true;
    
    hideAllScreens();
    elements.endScreen.classList.add('active');
    currentScreen = 'end';
    
    // Show score display in header
    elements.scoreDisplay.classList.remove('u-hide');
    
    // Set mascot to celebrate
    setMascotState('celebrate');
    
    // Set final score values
    elements.finalScore.textContent = gameData.score;
    elements.finalCorrect.textContent = gameData.correctAnswers;
    elements.answersScore.textContent = gameData.correctAnswers * 10;
    elements.finalTimeBonus.textContent = gameData.timeBonus;
    elements.finalStreakBonus.textContent = gameData.streakBonus;
    
    // Show leaderboard position
    const position = Storage.getLeaderboardPosition(gameData.score);
    const total = Storage.getLeaderboard().length;
    elements.leaderboardPosition.textContent = position;
    elements.leaderboardTotal.textContent = total + 1; // Include the current game
    
    // Show achievement if new one unlocked
    if (gameData.newAchievement) {
      elements.newAchievementCard.classList.remove('u-hide');
      elements.achievementIcon.src = gameData.newAchievement.icon;
      elements.achievementName.textContent = gameData.newAchievement.name;
      elements.achievementDesc.textContent = gameData.newAchievement.description;
      
      // Play achievement sound
      playSound('achievement');
    } else {
      elements.newAchievementCard.classList.add('u-hide');
    }
    
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  /**
   * Show achievements screen
   */
  function showAchievementsScreen() {
    if (isAnimating) return;
    isAnimating = true;
    
    hideAllScreens();
    elements.achievementsScreen.classList.add('active');
    currentScreen = 'achievements';
    
    // Hide score display in header
    elements.scoreDisplay.classList.add('u-hide');
    
    // Populate achievements grid
    populateAchievementsGrid();
    
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  /**
   * Show leaderboard screen
   */
  function showLeaderboardScreen() {
    if (isAnimating) return;
    isAnimating = true;
    
    hideAllScreens();
    elements.leaderboardScreen.classList.add('active');
    currentScreen = 'leaderboard';
    
    // Hide score display in header
    elements.scoreDisplay.classList.add('u-hide');
    
    // Populate leaderboards
    populateLeaderboards();
    
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  /**
   * Show settings modal
   */
  function showSettingsModal() {
    elements.settingsModal.classList.add('is-active');
  }
  
  /**
   * Hide settings modal
   */
  function hideSettingsModal() {
    elements.settingsModal.classList.remove('is-active');
  }
  
  /**
   * Hide all screens
   */
  function hideAllScreens() {
    elements.startScreen.classList.remove('active');
    elements.gameScreen.classList.remove('active');
    elements.endScreen.classList.remove('active');
    elements.achievementsScreen.classList.remove('active');
    elements.leaderboardScreen.classList.remove('active');
  }
  
  /**
   * Populate achievements grid
   */
  function populateAchievementsGrid() {
    const achievements = Storage.getAchievements();
    const grid = elements.achievementsGrid;
    
    // Clear existing items
    grid.innerHTML = '';
    
    // Add achievement items
    achievements.forEach(achievement => {
      const item = document.createElement('div');
      item.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
      
      const img = document.createElement('img');
      img.src = achievement.icon;
      img.alt = achievement.name;
      
      const title = document.createElement('h4');
      title.textContent = achievement.name;
      
      const description = document.createElement('p');
      description.textContent = achievement.description;
      
      item.appendChild(img);
      item.appendChild(title);
      item.appendChild(description);
      
      if (achievement.unlocked && achievement.unlockedAt) {
        const date = new Date(achievement.unlockedAt);
        const unlockDate = document.createElement('p');
        unlockDate.className = 'achievement-date';
        unlockDate.textContent = `Unlocked: ${date.toLocaleDateString()}`;
        item.appendChild(unlockDate);
      }
      
      grid.appendChild(item);
    });
  }
  
  /**
   * Populate leaderboards
   */
  function populateLeaderboards() {
    const leaderboard = Storage.getLeaderboard();
    
    // Global leaderboard
    populateLeaderboardTable(elements.globalLeaderboard, leaderboard);
    
    // Weekly leaderboard (filtered for last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklyScores = leaderboard.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekAgo;
    });
    
    populateLeaderboardTable(elements.weeklyLeaderboard, weeklyScores);
    
    // Friends leaderboard (placeholder - would be populated with real friend data)
    // For now, just use the global leaderboard
    populateLeaderboardTable(elements.friendsLeaderboard, leaderboard);
  }
  
  /**
   * Populate a leaderboard table
   * @param {HTMLElement} table Table element to populate
   * @param {Array} data Leaderboard data
   */
  function populateLeaderboardTable(table, data) {
    // Clear existing rows
    table.innerHTML = '';
    
    // No data message
    if (!data || data.length === 0) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 4;
      cell.textContent = 'No scores yet. Be the first to play!';
      cell.className = 'u-align--center';
      row.appendChild(cell);
      table.appendChild(row);
      return;
    }
    
    // Add rows
    data.forEach((entry, index) => {
      const row = document.createElement('tr');
      
      const rankCell = document.createElement('td');
      rankCell.textContent = index + 1;
      
      const nameCell = document.createElement('td');
      nameCell.textContent = entry.name;
      
      const scoreCell = document.createElement('td');
      scoreCell.textContent = entry.score;
      
      const dateCell = document.createElement('td');
      const date = new Date(entry.date);
      dateCell.textContent = date.toLocaleDateString();
      
      row.appendChild(rankCell);
      row.appendChild(nameCell);
      row.appendChild(scoreCell);
      row.appendChild(dateCell);
      
      table.appendChild(row);
    });
  }
  
  /**
   * Display a question
   * @param {Object} question Question object
   * @param {number} current Current question number
   * @param {number} total Total questions
   */
  function displayQuestion(question, current, total) {
    // Set question category
    elements.questionCategory.textContent = question.category;
    
    // Set question counter
    elements.questionCounter.textContent = `Question ${current}/${total}`;
    
    // Set question text
    elements.questionText.textContent = question.text;
    
    // Clear answers container
    elements.answersContainer.innerHTML = '';
    
    // Add answer buttons
    question.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.className = 'answer-button';
      button.textContent = answer;
      button.dataset.index = index;
      button.dataset.prefix = String.fromCharCode(65 + index); // A, B, C, D...
      
      // Add animation order for staggered appearance
      button.style.setProperty('--animation-order', index);
      
      // Add click handler
      button.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('answerSelected', {
          detail: { index }
        }));
      });
      
      elements.answersContainer.appendChild(button);
    });
    
    // Hide knowledge card
    elements.knowledgeCard.classList.add('u-hide');
    
    // Set mascot to thinking
    setMascotState('thinking');
    
    // Start timer animation
    startTimer();
  }
  
  /**
   * Start the timer animation
   */
  function startTimer() {
    // Reset timer bar
    elements.timerProgress.style.width = '100%';
    
    // Add timer transition
    elements.timerProgress.style.transition = 'width 10s linear';
    
    // Force reflow to ensure transition works
    elements.timerProgress.getBoundingClientRect();
    
    // Start countdown
    elements.timerProgress.style.width = '0%';
    
    // Play countdown sound at 3 seconds remaining
    setTimeout(() => {
      playSound('countdown');
    }, 7000);
  }
  
  /**
   * Stop the timer animation
   */
  function stopTimer() {
    // Get current width to freeze timer
    const currentWidth = elements.timerProgress.getBoundingClientRect().width;
    const totalWidth = elements.timerBar.getBoundingClientRect().width;
    const percentRemaining = (currentWidth / totalWidth) * 100;
    
    // Remove transition
    elements.timerProgress.style.transition = 'none';
    
    // Set width to current value
    elements.timerProgress.style.width = `${percentRemaining}%`;
  }
  
  /**
   * Set the timer to a specific percentage
   * @param {number} percent Percentage (0-100)
   */
  function setTimer(percent) {
    // Remove transition
    elements.timerProgress.style.transition = 'none';
    
    // Set width to specified percentage
    elements.timerProgress.style.width = `${percent}%`;
  }
  
  /**
   * Show the answer result
   * @param {number} selectedIndex Selected answer index
   * @param {number} correctIndex Correct answer index
   * @param {string} knowledge Knowledge card text
   * @param {string} learnMoreUrl Optional URL for learn more button
   */
  function showAnswerResult(selectedIndex, correctIndex, knowledge, learnMoreUrl) {
    // Stop timer
    stopTimer();
    
    // Get all answer buttons
    const answerButtons = elements.answersContainer.querySelectorAll('.answer-button');
    
    // Mark correct answer
    answerButtons[correctIndex].classList.add('correct');
    
    // If selected answer is different from correct, mark it as incorrect
    if (selectedIndex !== correctIndex) {
      answerButtons[selectedIndex].classList.add('incorrect');
      
      // Set mascot to sad
      setMascotState('sad');
      
      // Play incorrect sound
      playSound('incorrect');
    } else {
      // Set mascot to celebrate
      setMascotState('celebrate');
      
      // Play correct sound
      playSound('correct');
    }
    
    // Disable all answer buttons
    answerButtons.forEach(button => {
      button.disabled = true;
      button.classList.add('disabled');
    });
    
    // Show knowledge card
    elements.knowledgeText.textContent = knowledge;
    elements.knowledgeCard.classList.remove('u-hide');
    
    // Set learn more URL if provided
    if (learnMoreUrl) {
      elements.learnMoreButton.onclick = () => window.open(learnMoreUrl, '_blank');
      elements.learnMoreButton.classList.remove('u-hide');
    } else {
      elements.learnMoreButton.classList.add('u-hide');
    }
  }
  
  /**
   * Update the score display
   * @param {number} score Current score
   * @param {number} correct Number of correct answers
   * @param {number} streak Current streak
   * @param {number} timeBonus Time bonus points
   */
  function updateScore(score, correct, streak, timeBonus) {
    elements.currentScore.textContent = score;
    elements.correctCount.textContent = correct;
    elements.currentStreak.textContent = streak;
    elements.timeBonus.textContent = timeBonus;
  }
  
  /**
   * Update powerup counts display
   */
  function updatePowerupCounts() {
    const powerups = Storage.getPowerups();
    
    elements.fiftyFiftyButton.querySelector('.powerup-count').textContent = `(${powerups.fiftyFifty})`;
    elements.timeFreezeButton.querySelector('.powerup-count').textContent = `(${powerups.timeFreeze})`;
    elements.askCommunityButton.querySelector('.powerup-count').textContent = `(${powerups.askCommunity})`;
    
    // Enable/disable buttons based on counts
    elements.fiftyFiftyButton.disabled = powerups.fiftyFifty <= 0;
    elements.timeFreezeButton.disabled = powerups.timeFreeze <= 0;
    elements.askCommunityButton.disabled = powerups.askCommunity <= 0;
  }
  
  /**
   * Apply 50/50 powerup by hiding two incorrect answers
   * @param {number} correctIndex Correct answer index
   * @returns {Array} Indices of removed answers
   */
  function applyFiftyFifty(correctIndex) {
    // Get all answer buttons
    const answerButtons = elements.answersContainer.querySelectorAll('.answer-button');
    
    // Get indices of all answers
    const allIndices = Array.from({ length: answerButtons.length }, (_, i) => i);
    
    // Remove correct answer index
    const incorrectIndices = allIndices.filter(i => i !== correctIndex);
    
    // Shuffle and take first two
    const shuffled = incorrectIndices.sort(() => Math.random() - 0.5);
    const indicesToHide = shuffled.slice(0, Math.min(2, incorrectIndices.length));
    
    // Hide the selected incorrect answers
    indicesToHide.forEach(index => {
      answerButtons[index].style.display = 'none';
    });
    
    return indicesToHide;
  }
  
  /**
   * Apply time freeze powerup to pause the timer
   */
  function applyTimeFreeze() {
    // Stop timer
    stopTimer();
    
    // Show notification
    showNotification('Time Freeze', 'The timer has been frozen for 10 seconds!', 'positive');
    
    // Resume timer after 10 seconds
    setTimeout(() => {
      // Only restart if still in game screen
      if (currentScreen === 'game') {
        // Get current width
        const percentRemaining = parseFloat(elements.timerProgress.style.width);
        
        // Reset transition
        elements.timerProgress.style.transition = `width ${percentRemaining / 10}s linear`;
        
        // Force reflow
        elements.timerProgress.getBoundingClientRect();
        
        // Continue countdown
        elements.timerProgress.style.width = '0%';
      }
    }, 10000);
  }
  
  /**
   * Apply ask community powerup to show community percentages
   * @param {number} correctIndex Correct answer index
   */
  function applyAskCommunity(correctIndex) {
    // Get all answer buttons
    const answerButtons = elements.answersContainer.querySelectorAll('.answer-button');
    
    // Generate simulated community responses
    // Higher percentage for correct answer, distribute rest among others
    const percentages = [];
    
    for (let i = 0; i < answerButtons.length; i++) {
      if (i === correctIndex) {
        // Correct answer gets 60-75%
        percentages[i] = Math.floor(Math.random() * 16) + 60;
      } else {
        // Incorrect answers get random low percentages
        percentages[i] = Math.floor(Math.random() * 15) + 5;
      }
    }
    
    // Normalize to ensure total is 100%
    const total = percentages.reduce((sum, val) => sum + val, 0);
    const normalizedPercentages = percentages.map(val => Math.round((val / total) * 100));
    
    // Adjust to ensure total is exactly 100%
    let adjustedTotal = normalizedPercentages.reduce((sum, val) => sum + val, 0);
    let diff = 100 - adjustedTotal;
    
    // Add or subtract the difference from the largest percentage
    if (diff !== 0) {
      const maxIndex = normalizedPercentages.indexOf(Math.max(...normalizedPercentages));
      normalizedPercentages[maxIndex] += diff;
    }
    
    // Display percentages on buttons
    answerButtons.forEach((button, index) => {
      const percent = normalizedPercentages[index];
      const span = document.createElement('span');
      span.className = 'community-percent';
      span.textContent = `${percent}%`;
      button.appendChild(span);
    });
  }
  
  /**
   * Show a notification
   * @param {string} title Notification title
   * @param {string} message Notification message
   * @param {string} type Notification type (positive, negative, etc.)
   */
  function showNotification(title, message, type = 'positive') {
    // Set notification content
    elements.notificationTitle.textContent = title;
    elements.notificationMessage.textContent = message;
    
    // Update notification type
    elements.notification.className = `p-notification--${type} u-hide`;
    
    // Show notification
    elements.notification.classList.remove('u-hide');
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      elements.notification.classList.add('u-hide');
    }, 5000);
  }
  
  /**
   * Play a sound effect
   * @param {string} soundName Name of the sound to play (correct, incorrect, countdown, achievement)
   */
  function playSound(soundName) {
    // Check if sound is enabled
    if (!Storage.getSetting('soundEnabled')) {
      return;
    }
    
    // Play the sound
    if (audio[soundName]) {
      audio[soundName].currentTime = 0; // Reset to start
      audio[soundName].play().catch(e => console.error('Error playing sound:', e));
    }
  }
  
  /**
   * Set the mascot state
   * @param {string} state Mascot state (wave, thinking, celebrate, sad)
   */
  function setMascotState(state) {
    // Remove all state classes
    elements.gameMascot.classList.remove('wave', 'thinking', 'celebrate', 'sad');
    
    // Add the new state class
    elements.gameMascot.classList.add(state);
    
    // Change mascot image based on state
    let imagePath = 'images/ob01/';
    
    switch (state) {
      case 'wave':
        imagePath += 'ob-wave.svg';
        break;
      case 'thinking':
        imagePath += 'ob-wave.svg'; // Use wave for thinking for now
        break;
      case 'celebrate':
        imagePath += 'ob-woo.svg';
        break;
      case 'sad':
        imagePath += 'ob-sad.svg';
        break;
      default:
        imagePath += 'ob-wave.svg';
    }
    
    elements.gameMascot.src = imagePath;
  }
  
  // Public API
  return {
    init,
    showStartScreen,
    showGameScreen,
    showEndScreen,
    showAchievementsScreen,
    showLeaderboardScreen,
    displayQuestion,
    showAnswerResult,
    updateScore,
    updatePowerupCounts,
    applyFiftyFifty,
    applyTimeFreeze,
    applyAskCommunity,
    showNotification,
    playSound,
    setMascotState,
    stopTimer,
    setTimer
  };
})();

// Initialize UI when document is ready
document.addEventListener('DOMContentLoaded', UI.init);

// Export the UI object for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI;
}
