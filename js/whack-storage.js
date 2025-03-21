/**
 * Storage utilities for the Whack-a-LTS game
 * Handles score persistence with fallbacks for restricted environments
 */

// Continue using the global namespace
window.WhackGame = window.WhackGame || {};

// Storage functions
WhackGame.Storage = {
    // Safely try to access localStorage (with fallback for sandboxed environments)
    safeGetItem: function(key, defaultValue) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? value : defaultValue;
        } catch (e) {
            console.log('localStorage access denied, using session storage instead');
            return defaultValue;
        }
    },

    safeSetItem: function(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.log('localStorage access denied, changes will not persist');
            return false;
        }
    },

    // Load scores from storage
    loadScores: function() {
        try {
            const highScore = this.safeGetItem('ubuntuWhackHighScore', 0);
            const lastScore = this.safeGetItem('ubuntuWhackLastScore', 0);
            
            // Update all score displays
            const scoreElements = document.querySelectorAll('#high-score, #start-high-score, #end-high-score');
            scoreElements.forEach(el => { 
                if (el) el.textContent = highScore; 
            });
            
            const lastScoreElements = document.querySelectorAll('#last-score, #start-last-score, #end-last-score');
            lastScoreElements.forEach(el => { 
                if (el) el.textContent = lastScore; 
            });
            
            return { highScore, lastScore };
        } catch (e) {
            console.log('Error loading scores, using defaults');
            return { highScore: 0, lastScore: 0 };
        }
    },

    // Save scores to storage
    saveScores: function(score, highScore, lastScore) {
        try {
            let beatHighScore = false;
            let beatLastScore = false;
            
            if (score > highScore) {
                beatHighScore = true;
                this.safeSetItem('ubuntuWhackHighScore', score);
                highScore = score;
            }
            
            if (score > lastScore) {
                beatLastScore = true;
            }
            
            this.safeSetItem('ubuntuWhackLastScore', score);
            
            return { highScore, lastScore, beatHighScore, beatLastScore };
        } catch (e) {
            console.log('Error saving scores, continuing without persistence');
            
            // Still update in-memory scores
            let beatHighScore = false;
            let beatLastScore = false;
            
            if (score > highScore) {
                beatHighScore = true;
                highScore = score;
            }
            
            if (score > lastScore) {
                beatLastScore = true;
            }
            
            return { highScore, lastScore, beatHighScore, beatLastScore };
        }
    }
};
