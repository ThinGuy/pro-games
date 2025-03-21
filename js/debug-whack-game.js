/**
 * Main game logic for the Ubuntu Whack-a-LTS game
 */

// Continue using the global namespace
window.WhackGame = window.WhackGame || {};

// Game controller
WhackGame.Game = {
    // Game state
    state: {
        score: 0,
        timeLeft: 60,
        level: 1,
        gameRunning: false,
        timer: null,
        holes: [],
        mascots: [],
        highScore: 0,
        lastScore: 0,
        holePositions: [],
        debugMode: true // Enable debug mode
    },

    // Initialize game
    init: function() {
        console.log("Game.init() called");
        
        // Copy default hole positions
        this.state.holePositions = [...WhackGame.defaultHolePositions];
        
        // Create initial holes
        this.createHoles();
        
        // Load scores
        const scores = WhackGame.Storage.loadScores();
        this.state.highScore = scores.highScore;
        this.state.lastScore = scores.lastScore;
        
        // Debug information
        if (this.state.debugMode) {
            console.log("Game initialized with:");
            console.log("- Hole positions:", this.state.holePositions);
            console.log("- High score:", this.state.highScore);
            console.log("- Last score:", this.state.lastScore);
            
            // List all Ubuntu releases with LTS status
            console.log("Ubuntu releases:");
            WhackGame.ubuntuReleases.forEach(release => {
                console.log(`${release.version} ${release.name}: ${release.isLTS ? 'LTS' : 'Regular'}`);
            });
        }
    },

    // Adjust hole positions for mobile
    adjustForMobile: function() {
        if (window.innerWidth <= 650) {
            const gameContainer = document.getElementById('game-container');
            const gameWidth = Math.min(600, window.innerWidth * 0.95);
            const gameHeight = gameWidth * 0.75;
            gameContainer.style.width = gameWidth + 'px';
            gameContainer.style.height = gameHeight + 'px';
            
            // Recalculate hole positions
            this.state.holePositions = [
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
            this.state.holes.forEach((hole, index) => {
                if (index < this.state.holePositions.length) {
                    hole.style.left = (this.state.holePositions[index].x - 40) + 'px';
                    hole.style.top = (this.state.holePositions[index].y - 40) + 'px';
                }
            });
        }
    },

    // Create holes
    createHoles: function() {
        console.log("Creating holes");
        const gameContainer = document.getElementById('game-container');
        
        if (!gameContainer) {
            console.error("Game container not found!");
            return;
        }
        
        gameContainer.innerHTML = '';
        this.state.holes = [];
        this.state.mascots = [];
        
        // Create holes and mascots
        this.state.holePositions.forEach((position, index) => {
            // Create hole
            const hole = document.createElement('div');
            hole.className = 'hole';
            hole.style.left = (position.x - 50) + 'px';
            hole.style.top = (position.y - 50) + 'px';
            gameContainer.appendChild(hole);
            this.state.holes.push(hole);
            
            // Create mascot
            const mascot = document.createElement('div');
            mascot.className = 'mascot';
            mascot.dataset.index = index;
            
            // No background color as we'll use the actual mascot images
            mascot.style.backgroundColor = 'transparent';
            
            mascot.style.left = '0';
            
            // Use bind to preserve 'this' context
            mascot.addEventListener('click', this.whackMascot.bind(this));
            
            // Add release info
            const releaseInfo = document.createElement('div');
            releaseInfo.className = 'release-info';
            mascot.appendChild(releaseInfo);
            
            hole.appendChild(mascot);
            this.state.mascots.push(mascot);
        });
        
        if (this.state.debugMode) {
            console.log(`Created ${this.state.holes.length} holes and mascots`);
        }
    },

    // Start game
    startGame: function() {
        console.log("Starting game...");
        this.createHoles();
        this.state.score = 0;
        this.state.timeLeft = 60;
        this.state.level = 1;
        this.state.gameRunning = true;
        
        const scoreElement = document.getElementById('score');
        const timeElement = document.getElementById('time');
        const levelElement = document.getElementById('level');
        const startBtn = document.getElementById('start-btn');
        const startPopup = document.getElementById('start-popup');
        
        if (!scoreElement || !timeElement || !levelElement) {
            console.error("Required game elements not found!");
            return;
        }
        
        scoreElement.textContent = this.state.score;
        timeElement.textContent = this.state.timeLeft;
        levelElement.textContent = this.state.level;
        
        // Update high score display
        const scores = WhackGame.Storage.loadScores();
        this.state.highScore = scores.highScore;
        this.state.lastScore = scores.lastScore;
        
        if (startBtn) startBtn.disabled = true;
        if (startPopup) startPopup.style.display = 'none';
        
        // Start timer
        this.state.timer = setInterval(() => {
            this.state.timeLeft--;
            timeElement.textContent = this.state.timeLeft;
            
            if (this.state.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
        
        // Start popping up mascots
        this.popUp();
        
        console.log("Game started successfully");
    },

    // End game
    endGame: function() {
        clearInterval(this.state.timer);
        this.state.gameRunning = false;
        
        const startBtn = document.getElementById('start-btn');
        const finalScoreElement = document.getElementById('final-score');
        const finalLevelElement = document.getElementById('final-level');
        const performanceMessage = document.getElementById('performance-message');
        const gameOverPopup = document.getElementById('game-over-popup');
        
        if (startBtn) startBtn.disabled = false;
        
        // Stop any active mascots
        this.state.mascots.forEach(mascot => {
            mascot.style.bottom = '-100px';
            mascot.style.animationPlayState = 'paused';
        });
        
        // Update previous scores
        const result = WhackGame.Storage.saveScores(
            this.state.score, 
            this.state.highScore, 
            this.state.lastScore
        );
        
        this.state.highScore = result.highScore;
        this.state.lastScore = result.lastScore;
        
        document.getElementById('high-score').textContent = this.state.highScore;
        document.getElementById('last-score').textContent = this.state.lastScore;
        
        // Show game over popup
        if (finalScoreElement) finalScoreElement.textContent = this.state.score;
        if (finalLevelElement) finalLevelElement.textContent = this.state.level;
        
        const endHighScore = document.getElementById('end-high-score');
        const endLastScore = document.getElementById('end-last-score');
        
        if (endHighScore) endHighScore.textContent = this.state.highScore;
        if (endLastScore) endLastScore.textContent = this.state.lastScore;
        
        // Add bonus message if they beat previous scores
        let bonusMessage = '';
        if (result.beatHighScore) {
            bonusMessage = '🏆 NEW HIGH SCORE! Congratulations!';
        } else if (result.beatLastScore) {
            bonusMessage = '🎯 You beat your last score! Keep improving!';
        }
        
        // Set performance message
        let message = '';
        if (this.state.score < 0) {
            message = "Oops! Looks like you need to study your Ubuntu release history.";
        } else if (this.state.score < 50) {
            message = "Not bad! You have some knowledge of Ubuntu LTS releases.";
        } else if (this.state.score < 100) {
            message = "Good job! You're familiar with Ubuntu's LTS release cycle.";
        } else if (this.state.score < 150) {
            message = "Great work! You're an Ubuntu release expert!";
        } else {
            message = "Amazing! You're a true Ubuntu release master!";
        }
        
        if (bonusMessage) {
            message = bonusMessage + '<br><br>' + message;
        }
        
        if (performanceMessage) performanceMessage.innerHTML = message;
        if (gameOverPopup) gameOverPopup.style.display = 'flex';
    },

    // Randomly pop up mascots
    popUp: function() {
        if (!this.state.gameRunning) return;
        
        // Calculate number of mascots to show based on level
        const maxMascots = Math.min(this.state.level + 1, 5);
        const activeMascots = [];
        
        // Find which mascots are already up
        this.state.mascots.forEach(mascot => {
            if (mascot.style.bottom !== '-100px') {
                activeMascots.push(mascot);
            }
        });
        
        // If we already have enough active mascots, return
        if (activeMascots.length >= maxMascots) {
            setTimeout(() => this.popUp(), 500);
            return;
        }
        
        // Choose a random hole that doesn't have an active mascot
        let availableHoles = this.state.mascots.filter(mascot => 
            mascot.style.bottom === '-100px' || mascot.style.bottom === '');
            
        if (availableHoles.length === 0) {
            setTimeout(() => this.popUp(), 500);
            return;
        }
        
        const randomMascot = availableHoles[Math.floor(Math.random() * availableHoles.length)];
        
        // Choose a random Ubuntu release
        const release = WhackGame.ubuntuReleases[Math.floor(Math.random() * WhackGame.ubuntuReleases.length)];
        
        // Set the mascot's appearance and data
        randomMascot.dataset.version = release.version;
        randomMascot.dataset.name = release.name;
        randomMascot.dataset.isLTS = release.isLTS;
        
        // Update release info
        const releaseInfo = randomMascot.querySelector('.release-info');
        releaseInfo.textContent = `${release.version} ${release.name}`;
        
        // Set mascot image
        let filename;
        
        // Handle the special case for Maverick Meerkat (misspelled in filename)
        if (release.version === '10.10') {
            filename = 'Ubuntu_10.10-Maverik_Meerkat.png';
        } else {
            // For LTS releases, include LTS in the filename
            if (release.isLTS) {
                filename = `Ubuntu_${release.version}-LTS_${release.name.replace(/ /g, '_')}.png`;
            } else {
                filename = `Ubuntu_${release.version}-${release.name.replace(/ /g, '_')}.png`;
            }
        }
        
        // Debug filename
        if (this.state.debugMode) {
            console.log(`Generated filename: ${filename} for ${release.version} ${release.name}`);
        }
        
        // Try multiple image paths to find the correct one
        const imagePaths = [
            `../images/fp-mascots/${filename}`,
            `../../images/fp-mascots/${filename}`,
            `/images/fp-mascots/${filename}`,
            `images/fp-mascots/${filename}`
        ];
        
        if (this.state.debugMode) {
            console.log("Attempting to load image from paths:");
            imagePaths.forEach(path => console.log(path));
        }
        
        // Start with a fallback color
        const colors = ['#E95420', '#772953', '#77216F', '#5E2750', '#2C001E', '#AEA79F'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        randomMascot.style.backgroundColor = randomColor;
        
        // Try to load the image from the first path
        const testImage = new Image();
        testImage.onload = () => {
            // Image loaded successfully, use it
            randomMascot.style.backgroundImage = `url('${imagePaths[0]}')`;
            randomMascot.style.backgroundColor = 'transparent';
            if (this.state.debugMode) console.log(`Successfully loaded image from ${imagePaths[0]}`);
        };
        testImage.onerror = () => {
            // Try the second path
            const testImage2 = new Image();
            testImage2.onload = () => {
                randomMascot.style.backgroundImage = `url('${imagePaths[1]}')`;
                randomMascot.style.backgroundColor = 'transparent';
                if (this.state.debugMode) console.log(`Successfully loaded image from ${imagePaths[1]}`);
            };
            testImage2.onerror = () => {
                // Try the third path
                const testImage3 = new Image();
                testImage3.onload = () => {
                    randomMascot.style.backgroundImage = `url('${imagePaths[2]}')`;
                    randomMascot.style.backgroundColor = 'transparent';
                    if (this.state.debugMode) console.log(`Successfully loaded image from ${imagePaths[2]}`);
                };
                testImage3.onerror = () => {
                    // Try the fourth path
                    const testImage4 = new Image();
                    testImage4.onload = () => {
                        randomMascot.style.backgroundImage = `url('${imagePaths[3]}')`;
                        randomMascot.style.backgroundColor = 'transparent';
                        if (this.state.debugMode) console.log(`Successfully loaded image from ${imagePaths[3]}`);
                    };
                    testImage4.onerror = () => {
                        // Use colored background as fallback
                        randomMascot.style.backgroundImage = 'none';
                        if (this.state.debugMode) console.log("All image paths failed, using color fallback");
                    };
                    testImage4.src = imagePaths[3];
                };
                testImage3.src = imagePaths[2];
            };
            testImage2.src = imagePaths[1];
        };
        testImage.src = imagePaths[0];
        
        // Add a small delay before showing to make pop-up animation nicer
        setTimeout(() => {
            // Make the mascot pop up with bouncy animation
            randomMascot.style.bottom = '0';
            randomMascot.style.animationPlayState = 'running';
        }, 50);
        
        // Make it go back down after a random time
        const stayUpTime = Math.max(2000 - (this.state.level * 100), 800);
        setTimeout(() => {
            if (this.state.gameRunning && randomMascot.style.bottom === '0px') {
                randomMascot.style.animationPlayState = 'paused';
                randomMascot.style.bottom = '-100px';
            }
        }, stayUpTime);
        
        // Schedule the next pop-up
        const nextPopUpTime = Math.max(1000 - (this.state.level * 50), 300);
        setTimeout(() => this.popUp(), nextPopUpTime);
    },

    // Whack a mascot
    whackMascot: function(event) {
        if (!this.state.gameRunning) return;
        
        const scoreElement = document.getElementById('score');
        const levelElement = document.getElementById('level');
        
        const mascot = event.currentTarget;
        const isLTS = mascot.dataset.isLTS === 'true';
        
        if (this.state.debugMode) {
            console.log(`Whacked: ${mascot.dataset.version} ${mascot.dataset.name} (LTS: ${isLTS})`);
        }
        
        // Only count if the mascot is up
        if (mascot.style.bottom === '0px') {
            // Update score
            if (isLTS) {
                this.state.score += 10;
                
                // Add bonuses for streak or beating previous scores
                try {
                    const lastGameScore = parseInt(WhackGame.Storage.safeGetItem('ubuntuWhackLastScore', 0));
                    if (this.state.score > lastGameScore && this.state.score > 50) {
                        // Bonus for beating previous score after reaching 50+ points
                        this.state.score += 5;
                        
                        // Show bonus notification
                        const bonusNotice = document.createElement('div');
                        bonusNotice.className = 'bonus-notice';
                        bonusNotice.textContent = '+5 BONUS!';
                        bonusNotice.style.position = 'absolute';
                        bonusNotice.style.top = '0';
                        bonusNotice.style.left = '50%';
                        bonusNotice.style.transform = 'translateX(-50%)';
                        bonusNotice.style.color = '#4CAF50';
                        bonusNotice.style.fontWeight = 'bold';
                        bonusNotice.style.fontSize = '16px';
                        bonusNotice.style.textShadow = '0 0 5px white';
                        mascot.appendChild(bonusNotice);
                        
                        setTimeout(() => {
                            if (bonusNotice.parentNode === mascot) {
                                mascot.removeChild(bonusNotice);
                            }
                        }, 1000);
                    }
                } catch (e) {
                    console.log('Error processing bonuses, continuing with basic scoring');
                }
                
                // Visual feedback for correct whack
                mascot.classList.add('correct-whack');
            } else {
                this.state.score -= 5;
                // Visual feedback for wrong whack
                mascot.classList.add('wrong-whack');
            }
            
            if (scoreElement) scoreElement.textContent = this.state.score;
            
            // Update level based on score
            const newLevel = Math.floor(this.state.score / 30) + 1;
            if (newLevel > this.state.level) {
                this.state.level = newLevel;
                if (levelElement) levelElement.textContent = this.state.level;
            }
            
            // Add whack animation
            mascot.style.transform = 'scale(0.8)';
            
            // Make the mascot go back down after a short delay
            setTimeout(() => {
                mascot.style.animationPlayState = 'paused';
                mascot.style.bottom = '-100px';
                
                // Reset the animation classes
                setTimeout(() => {
                    mascot.classList.remove('correct-whack', 'wrong-whack');
                    mascot.style.transform = 'scale(1)';
                }, 300);
            }, 200);
        }
    }
};
