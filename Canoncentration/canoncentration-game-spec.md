# Canoncentration Game - Complete Specification

## Game Overview
Canoncentration is a memory-based matching game that challenges players to match Ubuntu release versions with their corresponding codenames. When a correct match is made, the mascot SVG for that release is displayed as a reward. The game is designed to be educational, entertaining, and visually engaging, utilizing Ubuntu branding elements like the Ubuntu font, mascot SVGs, and celebratory animations.

## Core Gameplay Flow

### 1. Game Initialization
- Upon page load, a welcome popup appears with game instructions and scoring information.
- The game populates a dropdown menu where the player selects the number of matches (3 to the total number of releases, with 3 being the default).
- Players can toggle whether to use era-specific Circle of Friends (CoF) logos on card backs, which provides a hint about the Ubuntu version era.
- Clicking the "Start Game" button begins the game with:
  - A randomized selection of Ubuntu release versions and codenames.
  - A randomized grid layout designed to optimally fit the selected number of cards.
  - The game timer starting.

### 2. Tile Design
- Each tile shows either a **release version** (e.g., Ubuntu 20.04) or a **codename** (e.g., Focal Fossa).
- All tiles are initially covered with the **CoF (Circle of Friends)** logo as their back.
- When era-specific logos are enabled, cards show one of three CoF logos based on Ubuntu era:
  - Early era (4.10-10.04): Original CoF logo
  - Middle era (10.10-21.10): Updated CoF logo
  - Modern era (22.04+): Current CoF logo
- Text in the tiles:
  - Uses the **Ubuntu font**
  - Is **centered** and does **not wrap**

### 3. Matching Logic
- Players click two tiles to reveal them.
- If the two tiles match (i.e., one displays a version and the other displays the corresponding codename):
  - Both tiles remain revealed.
  - The corresponding mascot SVG is displayed on both tiles as a reward.
  - The OB01 "woo" face appears to the right of the game board.
  - The player earns 10 points for a standard match.
  - If the match is an LTS release (e.g., 6.06, 8.04, 10.04, etc.), the player earns a 15-point bonus.
  - A **celebratory animation** (confetti) plays to mark the match.
- If the two tiles do not match:
  - Both tiles are flipped back after a brief delay (1 second).
  - A random **OB01 face** ("scream" or "sad") appears to the right of the game board.
  - The player loses 5 points.

### 4. Scoring System
- Player scores are tracked and displayed during gameplay.
- Points are awarded as follows:
  - **Successful match**: +10 points
  - **Wrong match**: -5 points
  - **LTS Match bonus**: +15 points (for 6.06, 8.04, 10.04, 12.04, etc.)
  - **Time Bonus**: +1 point for each second faster than the player's previous best time for that number of matches
- Score notifications appear when points are earned or deducted.
- Scores are saved in browser cookies for persistence between sessions.
- A score history can be viewed by clicking the "Scores" button.

### 5. Timer
- A timer begins as soon as the "Start Game" button is pressed and continues counting until all matches are made.
- The timer resets with each new game.
- Times are tracked per number of matches to calculate time bonuses.

### 6. Help Panel
- The "Help" button reveals all card values by sliding in a side panel from the **right**.
- The help panel dynamically shows all matches in an organized manner for reference.
- The OB01 "sad" face appears to indicate that the player is using help.
- Clicking "Help" again hides the overlay.

### 7. Game Completion
- When all pairs are matched, a congratulatory message appears with:
  - The time taken to complete the game
  - The final score (including any time bonus)
  - A breakdown of the score if a time bonus was earned
- Confetti animation plays across the screen.
- The OB01 "woo" face appears to celebrate the victory.
- Players can click "Play Again" to start a new game.

## Visual and UX Design
- **Card Fronts**: Each card displays either a **version** or a **codename** in the **Ubuntu font**, centered and non-wrapping.
- **Card Backs**: Every card back shows the **CoF (Circle of Friends)** SVG on a white background.
- **Matched Cards**: When matched, both cards display the corresponding mascot SVG on a white background.
- **OB01 Faces**: Various OB01 faces appear to the right of the game board to provide feedback on gameplay:
  - "wave" when the game starts
  - "woo" for successful matches
  - "sad" or "scream" for incorrect matches
  - "sad" when using the help panel
  - "woo" when winning the game
- **Help Panel**: Slides in from the **right**, displaying all correct matches and their mascots.
- **Visual Celebration**: Correct matches include a celebratory effect (confetti bursts).
- **Score Notifications**: Colorful pop-up notifications appear when points are earned or deducted.

## Data Structures and Assets

### 1. Releases Array
- Each object contains:
  - `version` – The Ubuntu release version (e.g., "Ubuntu 20.04")
  - `codename` – The corresponding release codename (e.g., "Focal Fossa")
  - `svgPath` – Path to the mascot SVG associated with that release
  - `era` – The Ubuntu logo era ("early", "middle", or "modern")

### 2. CoF Logos Array
- Each object contains:
  - `era` – The era of Ubuntu releases ("early", "middle", or "modern")
  - `version` – A description of the version range
  - `path` – Path to the CoF SVG for that era

### 3. OB01 Faces Array
- Each object contains:
  - `name` – A named emotional expression (e.g., "sad," "woo," "scream," "wave")
  - `path` – Path to the SVG face graphic

### 4. LTS Releases Array
- Contains a list of all Ubuntu LTS release version strings for bonus scoring.

## File Structure
```
ProGames/
├── Canoncentration/
│   ├── canoncentration.html
│   ├── README.md
├── images/
│   ├── canoncentration-logo.svg
│   ├── cof/
│   │   ├── cof_2004-2010.svg
│   │   ├── cof_2010-2022.svg
│   │   └── cof-2022.svg
│   ├── mini-mascots/
│   │   ├── Ubuntu_4.10-Warty_Warthog.svg
│   │   ├── Ubuntu_5.04-Hoary_Hedgehog.svg
│   │   └── ...
│   └── ob01/
│       ├── ob-sad.svg
│       ├── ob-scream.svg
│       ├── ob-wave.svg
│       └── ob-woo.svg
└── js/
    ├── canoncentration-data.js
    ├── canoncentration-ui.js
    ├── canoncentration-scoring.js
    └── canoncentration-game.js
```

## Cookie Data Structure
The game saves player data in cookies with the following structure:
```javascript
{
  "scores": {
    "3": [  // Number of matches
      {
        "score": 50,
        "time": 25.5,
        "date": "2025-03-19T12:34:56.789Z"
      },
      // More scores...
    ],
    // More match counts...
  },
  "bestTimes": {
    "3": 25.5,  // Number of matches: best time
    // More match counts...
  }
}
```

## Additional Features
- **Responsive Design**: The game adapts to different screen sizes.
- **Era-Specific Logos**: Optional feature to use different CoF logos based on Ubuntu release era.
- **Animated Feedback**: OB01 mascot faces provide animated feedback on game events.
- **Confetti Celebration**: Visual celebration when completing the game.
- **Score History**: View past performance and track improvement over time.
- **Persistent Tracking**: Progress saved in browser cookies between sessions.

## Potential Future Enhancements
- Difficulty levels (adjusting the time cards stay visible)
- Global leaderboard for competition between players
- Sound effects for matches, mismatches, and game completion
- Additional game modes (timed mode, challenge mode)
- Achievements for specific accomplishments (matching all LTS releases, etc.)
- Mobile app version for offline play
