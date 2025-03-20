# Ubuntu Pro Academy Games Project

## Project Overview

The Ubuntu Pro Academy Games project aims to create a suite of engaging, web-based games that educate players about Ubuntu Linux, open-source software, and related technical concepts in a fun and interactive way. These games serve multiple purposes:

1. **Educational Value**: Teaching users about Ubuntu history, features, and terminology
2. **Brand Engagement**: Increasing familiarity with Ubuntu branding, mascots, and release history
3. **Community Building**: Creating shareable content that the Ubuntu community can enjoy and discuss
4. **Technical Showcase**: Demonstrating web technologies while promoting open-source values

The games are designed to be accessible to users of all technical skill levels, from complete beginners to experienced Ubuntu users, while providing educational content that's valuable to anyone interested in learning more about Ubuntu Linux.

## Design Philosophy

All games in this project adhere to the following design principles:

### 1. Ubuntu Brand Consistency
- Use the Ubuntu color palette, with Ubuntu orange (#E95420) as the primary accent color
- Implement the Ubuntu font for all text elements
- Incorporate official Ubuntu logos, mascots, and imagery
- Follow Ubuntu design guidelines for a cohesive look and feel

### 2. Educational Content Integration
- Embed factual information about Ubuntu in gameplay mechanics
- Create learning opportunities through game interactions
- Balance educational content with engaging gameplay
- Provide contextual information to reinforce learning

### 3. Web Accessibility
- Ensure games are accessible across devices (desktop and mobile)
- Design for inclusivity following WCAG guidelines where possible
- Minimize resource requirements to ensure broad compatibility
- Create responsive layouts that adapt to different screen sizes

### 4. Open Source Values
- Release all game code under open-source licenses
- Document code thoroughly to encourage community contributions
- Use standard web technologies (HTML5, CSS3, JavaScript) without proprietary dependencies
- Encourage remixing and adaptation by the community

## Game Collection

### 1. Canoncentration (Memory Match)
Our inaugural game challenges players to match Ubuntu release versions with their corresponding codenames through a classic memory-matching mechanic. Players flip cards to find pairs, with each successful match revealing the Ubuntu release mascot. The game incorporates:

- Complete Ubuntu release history from 4.10 (Warty Warthog) to present
- Era-appropriate Circle of Friends logos as optional card backs
- Animated OB01 (Orangebox) mascot that reacts to game events
- Educational help panel showing all releases and mascots
- Scoring system with bonuses for LTS releases
- Time-based challenges with bonuses for beating personal best times
- Score history tracking via browser cookies

**Game Mechanics:**
- Match Ubuntu version numbers with their codenames
- Score points with a strategic system:
  - Successful match: +10 points
  - Wrong match: -5 points
  - LTS Match (6.06, 8.04, 10.04, etc.): +15 bonus points
  - Time Bonus: +1 point for each second faster than previous best time
- View your score history and compete against yourself
- Choose between 3 and 40+ match pairs for varying difficulty
- Option to toggle era-specific Ubuntu logos for hints or extra challenge

### 2. Ubuntu Whack-a-LTS (Reaction Game)
Our second game tests players' knowledge of Ubuntu's release cycle in a fun adaptation of the classic whack-a-mole arcade game. Players must quickly identify and "whack" only the Long Term Support (LTS) releases while avoiding regular releases. The game features:

- Fisher Price style Ubuntu mascot characters that pop up from holes
- Points awarded for correctly identifying LTS releases (+10) and penalties for mistakes (-5)
- Increasing difficulty as the player's score rises
- Educational value in teaching players about Ubuntu's LTS release pattern (every 2 years in April)
- Responsive design for both desktop and mobile play
- Score tracking to encourage improvement and repeated play

### Future Game Ideas

#### 3. Release Road (Timeline Game)
A drag-and-drop game where players must arrange Ubuntu releases in chronological order against a timer.

#### 4. Command Conundrum (Terminal Simulator)
Players type commands to solve progressively more complex Ubuntu terminal challenges.

#### 5. Mascot Mix-Up (Puzzle Game)
Sliding puzzle game featuring Ubuntu mascot images that players must rearrange correctly.

#### 6. Package Pursuit (Educational Quiz)
Quiz game testing knowledge of Ubuntu package names, dependencies, and functions.

#### 7. Desktop Dash (Interface Learning Game)
Game that teaches users about the Ubuntu desktop environment and interface elements.

## Technical Implementation

The games in this project are implemented using:

- **HTML5**: For structure and content
- **CSS3**: For styling and animations
- **Vanilla JavaScript**: For game logic and interactivity
- **SVG Graphics**: For scalable, lightweight visual elements
- **Responsive Design**: For cross-platform compatibility
- **Cookie Storage**: For saving player progress and scores
- **Modular JavaScript**: For maintainable and scalable code organization

All games are designed to run entirely in the browser without requiring installation or plugins, making them easily accessible for educational purposes, community events, and general promotion of Ubuntu Linux.

## Project Structure

```
ProGames/
├── Canoncentration/
│   ├── canoncentration.html
│   ├── README.md
├── Whack-a-mole/
│   └── ubuntu-whack-a-mole.html
├── images/
│   ├── canoncentration-logo.svg
│   ├── cof/
│   │   ├── cof_2004-2010.svg
│   │   ├── cof_2010-2022.svg
│   │   └── cof-2022.svg
│   ├── mini-mascots/
│   ├── fp-mascots/
│   └── ob01/
│       ├── ob-sad.svg
│       ├── ob-scream.svg
│       ├── ob-wave.svg
│       └── ob-woo.svg
├── js/
│   ├── canoncentration-data.js
│   ├── canoncentration-ui.js
│   ├── canoncentration-scoring.js
│   ├── canoncentration-game.js
│   └── whack-a-lts.js
└── ubuntu-pro-academy-games.md
```

## Contribution and Community Engagement

The Ubuntu Pro Academy Games project welcomes community contributions:

- Game concept suggestions
- Artwork and design improvements
- Code optimization and bug fixes
- Educational content verification and enhancement
- Translations to reach a global audience

By creating engaging, educational gaming experiences, this project aims to make learning about Ubuntu Linux more accessible and enjoyable for users of all skill levels, while fostering a deeper connection to the Ubuntu ecosystem and philosophy.
