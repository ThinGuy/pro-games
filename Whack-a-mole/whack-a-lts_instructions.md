# Ubuntu Whack-a-Mole

## Setup Instructions

1. Place the `ubuntu-whack-a-mole.html` file in the `Whack-a-mole` directory of your ProGames project.

2. To integrate the JavaScript, you have two options:
   - Keep the JavaScript inline within the HTML file (current implementation)
   - Create a separate JavaScript file at `js/whack-a-mole.js` and move the JavaScript code there

3. The game will use the mascot images from the `images/fp-mascots` directory. Ensure these images are available and properly named according to the Ubuntu release versions.

## File Structure

The game expects the following file structure:

```
ProGames/
├── images/
│   └── fp-mascots/
│       ├── Ubuntu_4.10-Warty_Warthog.png
│       ├── Ubuntu_5.04-Hoary_Hedgehog.png
│       └── ...
├── js/
│   └── whack-a-mole.js (optional)
└── Whack-a-mole/
    └── ubuntu-whack-a-mole.html
```

## Game Rules

- Players should whack LTS (Long Term Support) releases for +10 points
- If a player whacks a non-LTS release, they lose 5 points
- LTS releases come out every 2 years in April (XX.04), with 6.06 as an exception
- Players have 60 seconds to score as many points as possible
- The game gets progressively faster and more challenging as the score increases
- Bonus points (+5) are awarded when players beat their previous score
- High scores and last scores are saved locally for tracking progress

## Score Tracking

The game attempts to use the browser's localStorage to track:
- High Score (all-time best)
- Last Score (most recent)

These are displayed at the top of the game and on both start and end screens. Players get bonus points for beating their previous scores, encouraging repeated play and improvement.

**Note on Sandboxed Environments**: The game includes fallback mechanisms for environments where localStorage access is restricted (such as sandboxed iframes). In these cases, scores will be tracked for the current session but may not persist between visits.

## Customization Options

You can customize the game by editing the following:

1. Game difficulty:
   - Adjust the speed by modifying the `stayUpTime` and `nextPopUpTime` variables
   - Change point values for correct/incorrect whacks

2. Visual appearance:
   - Update the CSS styles to match your desired look and feel
   - Modify the hole positions or game container size

3. Game duration:
   - Change the `timeLeft` variable to make the game longer or shorter

4. Scoring mechanisms:
   - Adjust the bonus point system in the whackMascot function
   - Change the conditions for awarding bonuses

## Development Notes

- The game is designed to be responsive and works on both desktop and mobile devices
- Mobile layout automatically adjusts based on screen size
- The code includes extensive comments to aid in understanding and modifications

