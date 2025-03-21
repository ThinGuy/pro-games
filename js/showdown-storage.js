/**
 * Storage utility for Ubuntu Pro Showdown game
 * 
 * Handles saving and loading game data using localStorage
 * Manages player stats, achievements, and leaderboard data
 */

const ShowdownStorage = (function() {
  // Constants for localStorage keys
  const KEYS = {
    PLAYER_NAME: 'ubuntuProShowdown_playerName',
    GAMES_PLAYED: 'ubuntuProShowdown_gamesPlayed',
    BEST_SCORE: 'ubuntuProShowdown_bestScore',
    ACHIEVEMENTS: 'ubuntuProShowdown_achievements',
    SETTINGS: 'ubuntuProShowdown_settings',
    GAME_HISTORY: 'ubuntuProShowdown_gameHistory',
    LEADERBOARD: 'ubuntuProShowdown_leaderboard',
    POWERUPS: 'ubuntuProShowdown_powerups'
  };

  // Default settings
  const DEFAULT_SETTINGS = {
    soundEnabled: true,
    difficulty: 'medium',
    playerName: 'Anonymous'
  };

  // Default powerups
  const DEFAULT_POWERUPS = {
    fiftyFifty: 0,
    timeFreeze: 0,
    askCommunity: 0
  };

  // Achievement definitions
  const ACHIEVEMENTS = [
    {
      id: 'ubuntu-explorer',
      name: 'Ubuntu Explorer',
      description: 'Complete your first game',
      icon: 'images/achievements/ubuntu-explorer.svg',
      condition: (stats) => stats.gamesPlayed >= 1
    },
    {
      id: 'quick-draw',
      name: 'Quick Draw',
      description: 'Answer 5 questions in under 25 seconds',
      icon: 'images/achievements/quick-draw.svg',
      condition: (stats) => stats.fastAnswers >= 5
    },
    {
      id: 'perfect-round',
      name: 'Perfect Round',
      description: 'Score 100% on a 15-question challenge',
      icon: 'images/achievements/perfect-round.svg',
      condition: (stats) => stats.perfectGames >= 1
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      description: 'Achieve a 10-question streak',
      icon: 'images/achievements/streak-master.svg',
      condition: (stats) => stats.maxStreak >= 10
    },
    {
      id: 'security-specialist',
      name: 'Security Specialist',
      description: 'Answer all security questions correctly in one game',
      icon: 'images/achievements/security-specialist.svg',
      condition: (stats) => stats.securityMastery
    },
    {
      id: 'licensing-guru',
      name: 'Licensing Guru',
      description: 'Answer all licensing questions correctly in one game',
      icon: 'images/achievements/licensing-guru.svg',
      condition: (stats) => stats.licensingMastery
    },
    {
      id: 'pro-deployer',
      name: 'Pro Deployer',
      description: 'Answer all deployment questions correctly in one game',
      icon: 'images/achievements/pro-deployer.svg',
      condition: (stats) => stats.deploymentMastery
    },
    {
      id: 'daily-devotee',
      name: 'Daily Devotee',
      description: 'Complete 7 consecutive daily challenges',
      icon: 'images/achievements/daily-devotee.svg',
      condition: (stats) => stats.dailyChallengeStreak >= 7
    },
    {
      id: 'knowledge-seeker',
      name: 'Knowledge Seeker',
      description: 'View 50 knowledge cards',
      icon: 'images/achievements/knowledge-seeker.svg',
      condition: (stats) => stats.knowledgeCardsViewed >= 50
    },
    {
      id: 'ubuntu-pro-engineer',
      name: 'Ubuntu Pro Engineer',
      description: 'Unlock all other achievements',
      icon: 'images/achievements/ubuntu-pro-engineer.svg',
      condition: (stats, achievements) => {
        // All achievements except this one must be unlocked
        return achievements.filter(a => a.id !== 'ubuntu-pro-engineer').every(a => a.unlocked);
      }
    }
  ];

  /**
   * Initialize storage with default values if not already set
   */
  function init() {
    // Initialize settings if not already set
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }

    // Initialize games played counter if not already set
    if (!localStorage.getItem(KEYS.GAMES_PLAYED)) {
      localStorage.setItem(KEYS.GAMES_PLAYED, '0');
    }

    // Initialize best score if not already set
    if (!localStorage.getItem(KEYS.BEST_SCORE)) {
      localStorage.setItem(KEYS.BEST_SCORE, '0');
    }

    // Initialize achievements if not already set
    if (!localStorage.getItem(KEYS.ACHIEVEMENTS)) {
      const initialAchievements = ACHIEVEMENTS.map(achievement => ({
        ...achievement,
        unlocked: false,
        unlockedAt: null
      }));
      localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(initialAchievements));
    }

    // Initialize powerups if not already set
    if (!localStorage.getItem(KEYS.POWERUPS)) {
      localStorage.setItem(KEYS.POWERUPS, JSON.stringify(DEFAULT_POWERUPS));
    }

    // Initialize game history if not already set
    if (!localStorage.getItem(KEYS.GAME_HISTORY)) {
      localStorage.setItem(KEYS.GAME_HISTORY, JSON.stringify([]));
    }

    // Initialize leaderboard if not already set
    if (!localStorage.getItem(KEYS.LEADERBOARD)) {
      localStorage.setItem(KEYS.LEADERBOARD, JSON.stringify([]));
    }
  }

  /**
   * Get player stats
   * @returns {Object} Player stats
   */
  function getPlayerStats() {
    return {
      playerName: getSetting('playerName'),
      gamesPlayed: parseInt(localStorage.getItem(KEYS.GAMES_PLAYED) || '0'),
      bestScore: parseInt(localStorage.getItem(KEYS.BEST_SCORE) || '0'),
      achievements: getAchievements().filter(a => a.unlocked).length,
      totalAchievements: ACHIEVEMENTS.length
    };
  }

  /**
   * Get all achievements and their unlock status
   * @returns {Array} Achievements with unlock status
   */
  function getAchievements() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.ACHIEVEMENTS)) || [];
    } catch (e) {
      console.error('Error parsing achievements:', e);
      return [];
    }
  }

  /**
   * Get a specific achievement by ID
   * @param {string} id Achievement ID
   * @returns {Object|null} Achievement object or null if not found
   */
  function getAchievement(id) {
    const achievements = getAchievements();
    return achievements.find(a => a.id === id) || null;
  }

  /**
   * Check if an achievement is unlocked
   * @param {string} id Achievement ID
   * @returns {boolean} True if unlocked, false otherwise
   */
  function isAchievementUnlocked(id) {
    const achievement = getAchievement(id);
    return achievement ? achievement.unlocked : false;
  }

  /**
   * Unlock an achievement if not already unlocked
   * @param {string} id Achievement ID
   * @returns {boolean} True if newly unlocked, false if already unlocked
   */
  function unlockAchievement(id) {
    const achievements = getAchievements();
    const achievement = achievements.find(a => a.id === id);
    
    if (!achievement || achievement.unlocked) {
      return false; // Achievement not found or already unlocked
    }

    // Mark achievement as unlocked
    achievement.unlocked = true;
    achievement.unlockedAt = new Date().toISOString();
    
    // Save updated achievements
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    
    return true;
  }

  /**
   * Get game setting
   * @param {string} key Setting key
   * @returns {*} Setting value
   */
  function getSetting(key) {
    try {
      const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS)) || DEFAULT_SETTINGS;
      return settings[key];
    } catch (e) {
      console.error('Error parsing settings:', e);
      return DEFAULT_SETTINGS[key];
    }
  }

  /**
   * Update game setting
   * @param {string} key Setting key
   * @param {*} value Setting value
   */
  function updateSetting(key, value) {
    try {
      const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS)) || DEFAULT_SETTINGS;
      settings[key] = value;
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error updating settings:', e);
    }
  }

  /**
   * Update all settings at once
   * @param {Object} newSettings New settings object
   */
  function updateSettings(newSettings) {
    try {
      const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS)) || DEFAULT_SETTINGS;
      const updatedSettings = { ...settings, ...newSettings };
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updatedSettings));
    } catch (e) {
      console.error('Error updating settings:', e);
    }
  }

  /**
   * Get available powerups
   * @returns {Object} Powerups object
   */
  function getPowerups() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.POWERUPS)) || DEFAULT_POWERUPS;
    } catch (e) {
      console.error('Error parsing powerups:', e);
      return DEFAULT_POWERUPS;
    }
  }

  /**
   * Update powerups
   * @param {Object} newPowerups Updated powerups object
   */
  function updatePowerups(newPowerups) {
    try {
      const powerups = { ...getPowerups(), ...newPowerups };
      localStorage.setItem(KEYS.POWERUPS, JSON.stringify(powerups));
    } catch (e) {
      console.error('Error updating powerups:', e);
    }
  }

  /**
   * Use a powerup if available
   * @param {string} powerupType Type of powerup (fiftyFifty, timeFreeze, askCommunity)
   * @returns {boolean} True if powerup was used, false if not available
   */
  function usePowerup(powerupType) {
    const powerups = getPowerups();
    
    if (!powerups[powerupType] || powerups[powerupType] <= 0) {
      return false; // Powerup not available
    }
    
    // Decrease powerup count
    powerups[powerupType]--;
    
    // Save updated powerups
    localStorage.setItem(KEYS.POWERUPS, JSON.stringify(powerups));
    
    return true;
  }

  /**
   * Award a powerup to the player
   * @param {string} powerupType Type of powerup (fiftyFifty, timeFreeze, askCommunity)
   * @param {number} amount Amount to award (default: 1)
   */
  function awardPowerup(powerupType, amount = 1) {
    const powerups = getPowerups();
    
    // Increase powerup count
    powerups[powerupType] = (powerups[powerupType] || 0) + amount;
    
    // Save updated powerups
    localStorage.setItem(KEYS.POWERUPS, JSON.stringify(powerups));
  }

  /**
   * Record a completed game and update stats
   * @param {Object} gameData Game data to save
   */
  function recordGame(gameData) {
    try {
      // Increment games played counter
      const gamesPlayed = parseInt(localStorage.getItem(KEYS.GAMES_PLAYED) || '0');
      localStorage.setItem(KEYS.GAMES_PLAYED, (gamesPlayed + 1).toString());
      
      // Update best score if current score is higher
      const bestScore = parseInt(localStorage.getItem(KEYS.BEST_SCORE) || '0');
      if (gameData.score > bestScore) {
        localStorage.setItem(KEYS.BEST_SCORE, gameData.score.toString());
      }
      
      // Add game to history
      const gameHistory = JSON.parse(localStorage.getItem(KEYS.GAME_HISTORY)) || [];
      gameHistory.push({
        ...gameData,
        timestamp: new Date().toISOString()
      });
      
      // Limit history to most recent 20 games
      if (gameHistory.length > 20) {
        gameHistory.shift(); // Remove oldest game
      }
      
      localStorage.setItem(KEYS.GAME_HISTORY, JSON.stringify(gameHistory));
      
      // Add to leaderboard if score is high enough
      const leaderboard = JSON.parse(localStorage.getItem(KEYS.LEADERBOARD)) || [];
      const playerName = getSetting('playerName');
      
      leaderboard.push({
        name: playerName,
        score: gameData.score,
        date: new Date().toISOString()
      });
      
      // Sort leaderboard by score (highest first)
      leaderboard.sort((a, b) => b.score - a.score);
      
      // Limit leaderboard to top 50 scores
      if (leaderboard.length > 50) {
        leaderboard.length = 50;
      }
      
      localStorage.setItem(KEYS.LEADERBOARD, JSON.stringify(leaderboard));
      
      // Check for achievements
      checkAchievements(gameData);
    } catch (e) {
      console.error('Error recording game:', e);
    }
  }

  /**
   * Check for achievements based on game data
   * @param {Object} gameData Game data
   */
  function checkAchievements(gameData) {
    const gameStats = {
      gamesPlayed: parseInt(localStorage.getItem(KEYS.GAMES_PLAYED) || '0'),
      fastAnswers: gameData.fastAnswers || 0,
      perfectGames: gameData.correctAnswers === gameData.totalQuestions ? 1 : 0,
      maxStreak: gameData.maxStreak || 0,
      securityMastery: gameData.securityMastery || false,
      licensingMastery: gameData.licensingMastery || false,
      deploymentMastery: gameData.deploymentMastery || false,
      dailyChallengeStreak: gameData.dailyChallengeStreak || 0,
      knowledgeCardsViewed: gameData.knowledgeCardsViewed || 0
    };
    
    // Get current achievements
    const achievements = getAchievements();
    
    // Check each achievement
    const newlyUnlocked = [];
    
    achievements.forEach(achievement => {
      if (!achievement.unlocked && achievement.condition(gameStats, achievements)) {
        // Unlock achievement
        achievement.unlocked = true;
        achievement.unlockedAt = new Date().toISOString();
        newlyUnlocked.push(achievement);
      }
    });
    
    // Save updated achievements
    if (newlyUnlocked.length > 0) {
      localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    }
    
    return newlyUnlocked;
  }

  /**
   * Get game history
   * @returns {Array} Game history
   */
  function getGameHistory() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.GAME_HISTORY)) || [];
    } catch (e) {
      console.error('Error parsing game history:', e);
      return [];
    }
  }

  /**
   * Get leaderboard data
   * @returns {Array} Leaderboard data
   */
  function getLeaderboard() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.LEADERBOARD)) || [];
    } catch (e) {
      console.error('Error parsing leaderboard:', e);
      return [];
    }
  }

  /**
   * Get the player's position on the leaderboard
   * @param {number} score Player's score
   * @returns {number} Position on the leaderboard (1-based)
   */
  function getLeaderboardPosition(score) {
    const leaderboard = getLeaderboard();
    
    // Find the position of the first score less than the player's score
    const position = leaderboard.findIndex(entry => entry.score < score);
    
    if (position === -1) {
      // If no scores are less than the player's score, they're last
      return leaderboard.length + 1;
    }
    
    return position + 1; // 1-based position
  }

  /**
   * Clear all game data
   */
  function clearAllData() {
    Object.values(KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Reinitialize storage
    init();
  }

  // Initialize storage when this module loads
  init();

  // Public API
  return {
    getPlayerStats,
    getAchievements,
    getAchievement,
    isAchievementUnlocked,
    unlockAchievement,
    getSetting,
    updateSetting,
    updateSettings,
    getPowerups,
    updatePowerups,
    usePowerup,
    awardPowerup,
    recordGame,
    getGameHistory,
    getLeaderboard,
    getLeaderboardPosition,
    clearAllData,
    ACHIEVEMENTS
  };
})();

// Export the Storage object for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShowdownStorage;
}
