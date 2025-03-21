# Ubuntu Pro Academy: Whack-a-LTS

A fast-paced educational game that tests your knowledge of Ubuntu's Long Term Support (LTS) releases in a fun, arcade-style format.

## Game Overview

Whack-a-LTS is an Ubuntu-themed take on the classic whack-a-mole arcade game. Ubuntu release mascots pop up from holes, and players must quickly identify and whack only the LTS releases while avoiding non-LTS releases.

### Educational Value

This game helps players learn:
- Which Ubuntu releases are Long Term Support (LTS)
- The pattern of LTS releases (every 2 years in April, with 6.06 as an exception)
- Ubuntu release version numbers and their corresponding mascot names
- Visual recognition of Ubuntu mascot characters

## How to Play

1. Click "Start Game" or "Let's Play" to begin
2. Mascots will pop up randomly from holes
3. **Whack LTS releases** (6.06, 8.04, 10.04, 12.04, 14.04, 16.04, 18.04, 20.04, 22.04, 24.04) for **+10 points**
4. **Avoid non-LTS releases** or lose **-5 points**
5. Try to beat your previous high score
6. The game gets faster as your score increases

## Technical Details

### Project Structure

The game uses a modular JavaScript approach with a namespace pattern to prevent variable conflicts:

```
Whack-a-LTS/
├── whack-a-lts.html           # Main game HTML file
├── whack-a-lts-game-spec.md   # Game specification
├── whack-a-lts_instructions.md # Game instructions
└── README.md                  # This file

../css/
└── whack-styles.css           # Game styling

../js/
├── whack-data.js              # Ubuntu release data
├── whack-storage.js           # Score persistence
├── whack-game.js              # Core game logic
└── whack-ui.js                # UI initialization

../images/fp-mascots/
└── Ubuntu_*.png               # Mascot images
```

### Code Architecture

- **Namespace Pattern**: All game code uses the `WhackGame` namespace
- **Modular Design**: Separate files for data, storage, game logic, and UI
- **Local Storage**: Saves high scores and last scores between sessions
- **Mobile Responsive**: Automatically adjusts to different screen sizes

## Score Tracking

The game attempts to use the browser's localStorage to track:
- High Score (all-time best)
- Last Score (most recent)

These are displayed at the top of the game and on both start and end screens. Players get bonus points for beating their previous scores, encouraging repeated play and improvement.

**Note on Sandboxed Environments**: The game includes fallback mechanisms for environments where localStorage access is restricted (such as sandboxed iframes). In these cases, scores will be tracked for the current session but may not persist between visits.

## Customization Options

Edit the JavaScript files to customize:
- Game difficulty (speed and timing)
- Point values and bonuses
- Visual appearance
- Game duration (default: 60 seconds)

## License

This game is part of the Ubuntu Pro Academy Games project and is released under the same open-source license. Feel free to modify and improve the game following the project's contribution guidelines.

## Credits

- Created for the Ubuntu Pro Academy Games project
- Uses Ubuntu mascot imagery
- Designed to be educational, engaging, and accessible to all users
