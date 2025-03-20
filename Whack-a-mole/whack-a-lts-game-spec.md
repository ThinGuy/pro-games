# Ubuntu Pro Academy: Whack-a-LTS Game Specification

## Game Overview
Ubuntu Whack-a-LTS is an educational reaction game that tests the player's knowledge of Ubuntu's Long Term Support (LTS) releases. Players must identify and "whack" only the LTS release mascots while avoiding non-LTS releases as they pop up from holes in a whack-a-mole style game.

## Educational Objectives
- Teach players to identify Ubuntu LTS releases
- Familiarize players with the pattern of LTS releases (every 2 years in April, with 6.06 as an exception)
- Introduce players to Ubuntu release mascots in a fun, interactive way
- Reinforce the relationship between version numbers and codenames

## Core Gameplay Flow

### 1. Game Initialization
- Upon loading, the game presents a welcome screen explaining the rules
- Players can view their previous high score and last game score
- Players click "Start Game" to begin
- A 60-second timer starts counting down

### 2. Gameplay Mechanics
- Mascots pop up randomly from holes in the game area
- Each mascot represents a specific Ubuntu release (from 4.10 to 25.04)
- Players must click/tap on LTS release mascots to score points
- Clicking on non-LTS releases results in point deduction
- As score increases, the game speed increases (mascots pop up and disappear faster)

### 3. Scoring System
- +10 points for correctly whacking an LTS release
- -5 points for incorrectly whacking a non-LTS release
- +5 bonus points when beating previous score (once player reaches 50+ points)
- Level increases for every 30 points earned
- Score determines final ranking (Beginner to Master)

### 4. Game Completion
- Game ends when the 60-second timer expires
- Final score is displayed along with performance assessment
- High score is recorded and persists between sessions (using localStorage)
- Players can restart to try and beat their high score

## Visual and UX Design

### 1. Game Area
- Grassy field with 10 mole holes arranged in a balanced pattern
- Score, timer, and level information displayed prominently at the top
- High score and last score displayed for reference
- Responsive design that adapts to different screen sizes

### 2. Mascot Characters
- Ubuntu mascots rendered in Fisher Price Little People style
- Mascots rise smoothly from holes with a bounce effect
- Hover effect shows release information (version and codename)
- Visual feedback when whacked (green glow for correct, red for incorrect)

### 3. User Interface Elements
- Welcome popup with game instructions
- Game info bar with score, time, and level
- High score display
- Game over screen with performance assessment
- "Play Again" button for quick restarts
- Instructions button to review rules mid-game

## Technical Implementation

### 1. Asset Requirements
- 42 Ubuntu mascot images (one for each release from 4.10 to 25.04)
- Grass/dirt background texture
- UI elements (buttons, popups, etc.)
- Animation for mascots appearing/disappearing

### 2. Core Functions
- `startGame()`: Initializes game state and starts timer
- `createHoles()`: Generates the hole layout and mascot containers
- `popUp()`: Controls when and which mascots appear
- `whackMascot()`: Handles player clicks and updates score
- `endGame()`: Finalizes game and shows results
- Score tracking with localStorage (with fallbacks for restricted environments)
- Level progression system that increases difficulty

### 3. Responsive Design
- Automatic adjustment for different screen sizes
- Mobile-friendly touch controls
- Optimized hole positioning on smaller screens

## LTS Release Reference
The following Ubuntu releases are LTS and should be targeted for points:
- 6.06 Dapper Drake
- 8.04 Hardy Heron
- 10.04 Lucid Lynx
- 12.04 Precise Pangolin
- 14.04 Trusty Tahr
- 16.04 Xenial Xerus
- 18.04 Bionic Beaver
- 20.04 Focal Fossa
- 22.04 Jammy Jellyfish
- 24.04 Noble Numbat

## Performance Assessment Criteria
- Score < 0: "Needs to study Ubuntu release history"
- Score 0-49: "Some knowledge of Ubuntu LTS releases"
- Score 50-99: "Familiar with Ubuntu's LTS release cycle"
- Score 100-149: "Ubuntu release expert"
- Score 150+: "Ubuntu release master"

## Future Enhancement Possibilities
- Sound effects for correct/incorrect whacks
- Combo bonuses for consecutive correct whacks
- Power-ups that appear randomly (e.g., slow-motion, point multipliers)
- Different game modes (timed challenge, endless mode, etc.)
- Integration with other Ubuntu educational games for a comprehensive learning experience
- Customizable difficulty levels (easy, medium, hard)
