/**
/home/craigbender/Dropbox/pro-games/js * Main game logic for the Ubuntu Whack-a-LTS game
 */
 
// Pop up mascots randomly
function popUp() {
    if (!gameRunning) return;
    
    // Find all inactive mascots
    const inactiveMascots = mascots.filter(mascot => 
        mascot.style.bottom === '-100px' || mascot.style.bottom === '');
    
    if (inactiveMascots.length === 0) {
        // Try again in a very short time
        const retryTimeout = setTimeout(popUp, 100);
        activeMascots.push(retryTimeout);
        return;
    }
    
    // Pick a random mascot
    const randomIndex = Math.floor(Math.random() * inactiveMascots.length);
    const mascot = inactiveMascots[randomIndex];
    
    // Pick a random Ubuntu release
    const releaseIndex = Math.floor(Math.random() * ubuntuReleases.length);
    const release = ubuntuReleases[releaseIndex];
    
    // Set the mascot image
    const imagePath = `../images/fp-mascots/Ubuntu_${release.version}-${release.name.replace(' ', '_')}.png`;
    mascot.style.backgroundImage = `url('${imagePath}')`;
    
    // Add release info
    const releaseInfo = mascot.querySelector('.release-info');
    if (releaseInfo) {
        releaseInfo.textContent = `${release.version} ${release.name}`;
    }
    
    // Store whether this is LTS for click handling
    mascot.dataset.isLts = release.isLTS;
    
    // Show the mascot
    mascot.style.bottom = '0';
    mascot.style.animationPlayState = 'running';
    
    // Adjust timing based on level
    const stayUpTime = Math.max(500, 2000 - (level * 100));
    
    // Hide after a random time
    const hideTimeout = setTimeout(() => {
        if (gameRunning && mascot.style.bottom === '0px') {
            mascot.style.bottom = '-100px';
        }
    }, stayUpTime);
    
    activeMascots.push(hideTimeout);
    
    // Schedule next popup with increasing frequency based on level
    const nextPopUpTime = Math.max(300, 1000 - (level * 50));
    const nextPopupTimeout = setTimeout(popUp, nextPopUpTime);
    activeMascots.push(nextPopupTimeout);
}

// Game state
let score = 0;
let timeLeft = 60;
let level = 1;
let gameRunning = false;
let timer;
let holes = [];
let mascots = [];
let highScore = 0;
let lastScore = 0;
let holePositions = [...defaultHolePositions]; // Copy from whack-data.js

// Adjust hole positions for mobile
function adjustForMobile() {
    if (window.innerWidth <= 650) {
        const gameWidth = Math.min(600, window.innerWidth * 0.95);
        const gameHeight = gameWidth * 0.75;
        gameContainer.style.width = gameWidth + 'px';
        gameContainer.style.height = gameHeight + 'px';
        
        // Recalculate hole positions
        holePositions = [
            {x: gameWidth * 0.1, y: gameHeight * 0.1},
            {x: gameWidth * 0.5, y: gameHeight * 0.1},
            {x: gameWidth * 0.9, y: gameHeight * 0.1},
            {x: gameWidth * 0.3, y: gameHeight * 0.4},
            {x: gameWidth * 0.7, y: gameHeight * 0.4},
            {x: gameWidth * 0.1, y: gameHeight * 0.7},
            {x: gameWidth * 0.5, y: gameHeight * 0.7},
            {x: gameWidth * 0.9, y: gameHeight * 0.7},
            {x: gameWidth * 0.3, y: gameHeight * 0.9},
            {x: gameWidth * 0.7, y: gameHeight * 0.9}
        ];
        
        // Update existing holes if they exist
        holes.forEach((hole, index) => {
            if (index < holePositions.length) {
                hole.style.left = (holePositions[index].x - 40) + 'px';
                hole.style.top = (holePositions[index].y - 40) + 'px';
            }
        });
    }
}

// Create holes
function createHoles() {
    gameContainer.innerHTML = '';
    holes = [];
    mascots = [];
    
    // Create holes and mascots
    holePositions.forEach((position, index) => {
        // Create hole
        const hole = document.createElement('div');
        hole.className = 'hole';
        hole.style.left = (position.x - 50) + 'px';
        hole.style.top = (position.y - 50) + 'px';
        gameContainer.appendChild(hole);
        holes.push(hole);
        
        // Create mascot
        const mascot = document.createElement('div');
        mascot.className = 'mascot';
        mascot.dataset.index = index;
        
        // No background color as we'll use the actual mascot images
        mascot.style.backgroundColor = 'transparent';
        
        mascot.style.left = '0';
        mascot.addEventListener('click', whackMascot);
        
        // Add release info
        const releaseInfo = document.createElement('div');
        releaseInfo.className = 'release-info';
        mascot.appendChild(releaseInfo);
        
        hole.appendChild(mascot);
        mascots.push(mascot);
    });
}

// Start game
function startGame() {
    console.log("Starting game...");
    createHoles();
    score = 0;
    timeLeft = 60;
    level = 1;
    gameRunning = true;
    
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    levelElement.textContent = level;
    
    // Update high score display
    const scores = loadScores();
    highScore = scores.highScore;
    lastScore = scores.lastScore;
    
    startBtn.disabled = true;
    startPopup.style.display = 'none';
    
    // Start timer
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    // Start popping up mascots
    popUp();
    
    console.log("Game started successfully");
}

// End game
function endGame() {
    clearInterval(timer);
    gameRunning = false;
    startBtn.disabled = false;
    
    // Stop any active mascots
    mascots.forEach(mascot => {
        mascot.style.bottom = '-100px';
        mascot.style.animationPlayState = 'paused';
    });
    
    // Update previous scores
    const result = saveScores(score, highScore, lastScore);
    highScore = result.highScore;
    lastScore = result.lastScore;
    
    document.getElementById('high-score').textContent = highScore;
    document.getElementById('last-score').textContent = lastScore;
    
    // Show game over popup
    finalScoreElement.textContent = score;
    finalLevelElement.textContent = level;
    document.getElementById('end-high-score').textContent = highScore;
    document.getElementById('end-last-score').textContent = lastScore;
    
    // Add bonus message if they beat previous scores
    let bonusMessage = '';
    if (result.beatHighScore) {
        bonusMessage = '🏆 NEW HIGH SCORE! Congratulations!';
    } else if (result.beatLastScore) {
        bonusMessage = '🎯 You beat your last score! Keep improving!';
    }
    
    // Set performance message
    let message = '';
    if (score < 0) {
        message = "Oops! Looks like you need to study your Ubuntu release history.";
    } else if (score < 50) {
        message = "Not bad! You have some knowledge of Ubuntu LTS releases.";
    } else if (score < 100) {
        message = "Good job! You're familiar with Ubuntu's LTS release cycle.";
    } else if (score < 150) {
        message = "Great work! You're an Ubuntu release expert!";
    } else {
        message = "Amazing! You're a true Ubuntu release master!";
    }
    
    if (bonusMessage) {
        message = bonusMessage + '<br><br>' + message;
    }
    
    performanceMessage.innerHTML = message;
    gameOverPopup.style
