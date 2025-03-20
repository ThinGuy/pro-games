// canoncentration-scoring.js - Scoring system for Canoncentration game

// Scoring constants
const SCORE_MATCH = 10;          // Points for a successful match
const SCORE_WRONG_MATCH = -5;    // Points for an incorrect match
const SCORE_LTS_MATCH = 15;      // Points for matching an LTS release
const SCORE_TIME_BONUS = 1;      // Points per second faster than previous best

// List of LTS releases for scoring
const ltsReleases = [
    "Ubuntu 6.06",  // Dapper Drake
    "Ubuntu 8.04",  // Hardy Heron
    "Ubuntu 10.04", // Lucid Lynx
    "Ubuntu 12.04", // Precise Pangolin
    "Ubuntu 14.04", // Trusty Tahr
    "Ubuntu 16.04", // Xenial Xerus
    "Ubuntu 18.04", // Bionic Beaver
    "Ubuntu 20.04", // Focal Fossa
    "Ubuntu 22.04", // Jammy Jellyfish
    "Ubuntu 24.04"  // Noble Numbat
];

// Game scoring variables
let currentScore = 0;
let wrongMatches = 0;
let scoreDisplay;

// Initialize scoring
function initializeScoring() {
    // Create score display if it doesn't exist
    if (!document.getElementById('score-display')) {
        scoreDisplay = document.createElement('div');
        scoreDisplay.id = 'score-display';
        scoreDisplay.className = 'score-display';
        scoreDisplay.innerHTML = 'Score: 0';
        
        // Insert after timer
        const timerElement = document.getElementById('timer');
        timerElement.parentNode.insertBefore(scoreDisplay, timerElement.nextSibling);
        
        // Add some styling
        scoreDisplay.style.fontSize = '18px';
        scoreDisplay.style.fontWeight = '500';
        scoreDisplay.style.marginBottom = '15px';
    } else {
        scoreDisplay = document.getElementById('score-display');
    }
    
    // Reset score
    currentScore = 0;
    wrongMatches = 0;
    updateScoreDisplay();
}

// Update the score display
function updateScoreDisplay() {
    if (scoreDisplay) {
        scoreDisplay.innerHTML = `Score: ${currentScore}`;
    }
}

// Check if a release is an LTS version
function isLtsRelease(versionString) {
    return ltsReleases.includes(versionString);
}

// Award points for a successful match
function scoreMatch(card1, card2) {
    // Base points for a match
    currentScore += SCORE_MATCH;
    
    // Check if it's an LTS release for bonus points
    if (isLtsRelease(card1.dataset.pairId)) {
        currentScore += SCORE_LTS_MATCH;
        
        // Show notification for LTS bonus
        showScoreNotification(`LTS Match Bonus: +${SCORE_LTS_MATCH}`, 'lts-bonus');
    }
    
    updateScoreDisplay();
}

// Deduct points for a wrong match
function scoreWrongMatch() {
    currentScore += SCORE_WRONG_MATCH; // will subtract since SCORE_WRONG_MATCH is negative
    wrongMatches++;
    updateScoreDisplay();
    
    // Show notification for penalty
    showScoreNotification(`Wrong Match: ${SCORE_WRONG_MATCH}`, 'wrong-match');
}

// Calculate time bonus based on previous best time
function calculateTimeBonus(numMatches, currentTime) {
    // Get previous best time from cookie
    const previousBestTime = getBestTime(numMatches);
    
    // If no previous time, no bonus
    if (!previousBestTime) {
        return 0;
    }
    
    // Calculate seconds faster
    const secondsFaster = previousBestTime - currentTime;
    
    // Only award bonus if faster than previous best
    if (secondsFaster > 0) {
        return Math.floor(secondsFaster) * SCORE_TIME_BONUS;
    }
    
    return 0;
}

// Show a score notification that fades out
function showScoreNotification(text, className) {
    const notification = document.createElement('div');
    notification.className = `score-notification ${className}`;
    notification.textContent = text;
    
    // Position near the score display
    const rect = scoreDisplay.getBoundingClientRect();
    notification.style.position = 'absolute';
    notification.style.left = `${rect.right + 10}px`;
    notification.style.top = `${rect.top}px`;
    notification.style.backgroundColor = 'rgba(233, 84, 32, 0.8)';
    notification.style.color = 'white';
    notification.style.padding = '5px 10px';
    notification.style.borderRadius = '4px';
    notification.style.animation = 'fadeOut 2s forwards';
    
    // Add animation if not already in stylesheet
    if (!document.getElementById('score-animations')) {
        const style = document.createElement('style');
        style.id = 'score-animations';
        style.innerHTML = `
            @keyframes fadeOut {
                0% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
            }
            
            .lts-bonus {
                background-color: rgba(78, 154, 6, 0.8) !important;
            }
            
            .wrong-match {
                background-color: rgba(204, 0, 0, 0.8) !important;
            }
            
            .time-bonus {
                background-color: rgba(52, 101, 164, 0.8) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after animation completes
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Cookie Management Functions

// Save a score to the cookie
function saveScore(numMatches, score, time) {
    const gameData = getGameData();
    
    // Update game data
    if (!gameData.scores) {
        gameData.scores = {};
    }
    
    // Track scores by number of matches
    if (!gameData.scores[numMatches]) {
        gameData.scores[numMatches] = [];
    }
    
    // Add new score
    gameData.scores[numMatches].push({
        score: score,
        time: time,
        date: new Date().toISOString()
    });
    
    // Keep only last 10 scores
    if (gameData.scores[numMatches].length > 10) {
        gameData.scores[numMatches].shift();
    }
    
    // Update best time
    const bestTime = getBestTime(numMatches);
    if (!bestTime || time < bestTime) {
        gameData.bestTimes = gameData.bestTimes || {};
        gameData.bestTimes[numMatches] = time;
    }
    
    // Save to cookie
    saveGameData(gameData);
}

// Get the best time for a given number of matches
function getBestTime(numMatches) {
    const gameData = getGameData();
    return gameData.bestTimes && gameData.bestTimes[numMatches];
}

// Get all score data from cookie
function getGameData() {
    const cookieData = getCookie('canoncentration-data');
    return cookieData ? JSON.parse(cookieData) : {};
}

// Save game data to cookie
function saveGameData(gameData) {
    setCookie('canoncentration-data', JSON.stringify(gameData), 365); // expires in 1 year
}

// Set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
}

// Get a cookie by name
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
}

// Function to display score history
function showScoreHistory() {
    const gameData = getGameData();
    
    // Create popup for score history
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'score-history-popup';
    popup.style.display = 'flex';
    
    // Create content
    let content = `
        <div class="popup-content">
            <h2>Score History</h2>
    `;
    
    // Check if we have any scores
    if (!gameData.scores || Object.keys(gameData.scores).length === 0) {
        content += `<p>No scores recorded yet. Play some games first!</p>`;
    } else {
        // Show scores grouped by number of matches
        Object.keys(gameData.scores).forEach(numMatches => {
            content += `<h3>${numMatches} Matches</h3>`;
            content += `<table class="score-table">
                <tr>
                    <th>Score</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
            `;
            
            // Sort scores by highest first
            const sortedScores = [...gameData.scores[numMatches]].sort((a, b) => b.score - a.score);
            
            sortedScores.forEach(score => {
                const date = new Date(score.date).toLocaleDateString();
                content += `
                    <tr>
                        <td>${score.score}</td>
                        <td>${score.time}s</td>
                        <td>${date}</td>
                    </tr>
                `;
            });
            
            content += `</table>`;
            
            // Show best time
            const bestTime = getBestTime(numMatches);
            if (bestTime) {
                content += `<p><strong>Best Time:</strong> ${bestTime}s</p>`;
            }
        });
    }
    
    // Add close button
    content += `
            <button id="close-score-history-btn">Close</button>
        </div>
    `;
    
    popup.innerHTML = content;
    
    // Add some styling for the table
    const style = document.createElement('style');
    style.innerHTML = `
        .score-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .score-table th, .score-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        .score-table th {
            background-color: #f2f2f2;
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(popup);
    
    // Add close handler
    document.getElementById('close-score-history-btn').addEventListener('click', () => {
        popup.remove();
    });
}

// Add a scores button to the UI
function addScoresButton() {
    const instructionsBtn = document.getElementById('instructions-btn');
    
    if (instructionsBtn) {
        const scoresBtn = document.createElement('button');
        scoresBtn.id = 'scores-btn';
        scoresBtn.textContent = 'Scores';
        scoresBtn.style.position = 'absolute';
        scoresBtn.style.top = '10px';
        scoresBtn.style.right = '120px';
        
        document.body.appendChild(scoresBtn);
        
        // Add event listener
        scoresBtn.addEventListener('click', showScoreHistory);
    }
}

// Initialize the scores button when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addScoresButton();
});
