# Canoncentration

## Overview

Canoncentration is a memory matching game that challenges players to match Ubuntu release versions with their corresponding codenames. Part of the Ubuntu Educational Games Project, this game helps players learn about Ubuntu's release history while having fun.

![Canoncentration Game Screenshot](../images/canoncentration-screenshot.png)

## Features

- Match Ubuntu release versions (e.g., Ubuntu 20.04) with their codenames (e.g., Focal Fossa)
- View the Ubuntu mascot for each release when making a correct match
- Score points with bonuses for LTS releases
- Option to use era-specific Ubuntu logos on card backs
- Track your best times and compete against yourself
- Responsive design works on desktop and mobile devices
- View past scores and personal bests

## Game Mechanics

### Scoring System
- **Successful match**: +10 points
- **Wrong match**: -5 points
- **LTS Match bonus**: +15 points (for 6.06, 8.04, 10.04, 12.04, etc.)
- **Time Bonus**: +1 point for each second faster than your previous best time

### Gameplay
1. Select the number of matches you want to play with (3 or more)
2. Optionally enable era-specific Ubuntu Circle of Friends logos
3. Click "Start Game" to begin the timer
4. Flip cards by clicking on them to find matching pairs
5. Match all pairs as quickly as possible to maximize your score

## Files Structure

- `canoncentration.html` - Main game HTML file
- `../js/canoncentration-data.js` - Contains Ubuntu release data
- `../js/canoncentration-ui.js` - UI functionality
- `../js/canoncentration-scoring.js` - Scoring system
- `../js/canoncentration-game.js` - Core game logic
- `../images/` - Contains all graphics for the game:
  - `canoncentration-logo.svg` - Game logo
  - `cof/` - Ubuntu Circle of Friends logos from different eras
  - `mini-mascots/` - SVG icons of all Ubuntu mascots
  - `ob01/` - OB01 mascot emotional faces

## Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and animations
- **Vanilla JavaScript** - Game logic and interactivity
- **SVG Graphics** - All mascots and logos
- **Cookie Storage** - Saving scores and best times

## Browser Support

The game works on all modern browsers including:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Development

### Adding New Ubuntu Releases

When a new Ubuntu release comes out, add it to the `releases` array in `canoncentration-data.js`:

```javascript
{ 
  version: "Ubuntu XX.XX", 
  codename: "Name Animal", 
  svgPath: "../images/mini-mascots/Ubuntu_XX.XX-Name_Animal.svg", 
  era: "modern" 
}
```

### Modifying the Scoring System

Scoring constants can be adjusted in `canoncentration-scoring.js`:

```javascript
const SCORE_MATCH = 10;          // Points for a successful match
const SCORE_WRONG_MATCH = -5;    // Points for an incorrect match
const SCORE_LTS_MATCH = 15;      // Points for matching an LTS release
const SCORE_TIME_BONUS = 1;      // Points per second faster than previous best
```

### Adding LTS Releases

Update the `ltsReleases` array in `canoncentration-scoring.js` when new LTS releases are available.

## License

This game is part of the Ubuntu Educational Games Project and is released under an open-source license. See the main project repository for licensing details.

## Credits

- Ubuntu and the Circle of Friends logo are trademarks of Canonical Ltd.
- All Ubuntu mascot artwork is based on official Ubuntu release mascots
- Game concept and implementation by Canonical
