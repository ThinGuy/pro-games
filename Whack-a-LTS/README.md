# Ubuntu Pro Academy: Whack-a-LTS

A fast-paced educational game that tests your knowledge of Ubuntu's Long Term Support (LTS) releases in a fun, arcade-style format.

![Whack-a-LTS Game Screenshot](../images/whack-a-lts-screenshot.png)

## Game Overview

Whack-a-LTS is an Ubuntu-themed take on the classic whack-a-mole arcade game. Ubuntu release mascots pop up from holes, and players must quickly identify and whack only the LTS releases while avoiding non-LTS releases.

### Educational Value

This game helps players learn:
- Which Ubuntu releases are Long Term Support (LTS)
- The pattern of LTS releases (every 2 years in April, with 6.06 as an exception)
- Ubuntu release version numbers and their corresponding mascot names
- Visual recognition of Ubuntu mascot characters

## How to Play

1. Click "Start Game" to begin
2. Mascots will pop up randomly from holes
3. **Whack LTS releases** (6.06, 8.04, 10.04, 12.04, 14.04, 16.04, 18.04, 20.04, 22.04, 24.04) for **+10 points**
4. **Avoid non-LTS releases** or lose **-5 points**
5. Try to beat your previous high score
6. The game gets faster as your score increases

## Technical Details

### Installation

Simply open `ubuntu-whack-a-mole.html` in any modern web browser.

### Dependencies

- No external JavaScript libraries required
- Uses images from the `../images/fp-mascots/` directory
- Leverages browser localStorage for score tracking (when available)

### Compatibility

- Works on desktop and mobile devices
- Responsive design adapts to different screen sizes
- Fallback mechanisms for environments where localStorage is restricted

## Development Notes

### File Structure

```
Whack-a-mole/
├── ubuntu-whack-a-mole.html     # Main game file
└── README.md                   # This file
```

### Score Tracking

The game attempts to use the browser's localStorage to track:
- High Score (all-time best)
- Last Score (most recent)

Players earn bonus points (+5) for beating their previous scores once they reach 50+ points.

### Customization Options

Edit the HTML file to customize:
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
