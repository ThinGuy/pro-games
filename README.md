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
pro-games
├── Canoncentration
│   ├── canoncentration-game-spec.md
│   ├── canoncentration.html
│   ├── canoncentration-spec.md
│   └── README.md
├── css
│   ├── showdown-animations.css
│   ├── showdown-styles.css
│   ├── showdown-welcome-popup.css
│   └── whack-styles.css
├── images
│   ├── achievments
│   │   └── README.md
│   ├── canoncentration-logo.svg
│   ├── cof
│   │   ├── cof_2004-2010.svg
│   │   ├── cof_2010-2022.svg
│   │   └── cof-2022.svg
│   ├── fp-mascots
│   │   ├── Ubuntu_10.04-LTS_Lucid_Lynx.png
│   │   ├── Ubuntu_10.10-Maverik_Meerkat.png
│   │   ├── Ubuntu_11.04-Natty_Narwhal.png
│   │   ├── Ubuntu_11.10-Oneiric_Ocelot.png
│   │   ├── Ubuntu_12.04-LTS_Precise_Pangolin.png
│   │   ├── Ubuntu_12.10-Quantal_Quetzal.png
│   │   ├── Ubuntu_13.04-Raring_Ringtail.png
│   │   ├── Ubuntu_13.10-Saucy_Salamander.png
│   │   ├── Ubuntu_14.04-LTS_Trusty_Tahr.png
│   │   ├── Ubuntu_14.10-Utopic_Unicorn.png
│   │   ├── Ubuntu_15.04-Vivid_Vervet.png
│   │   ├── Ubuntu_15.10-Willy_Werewolf.png
│   │   ├── Ubuntu_16.04-LTS_Xenial_Xerus.png
│   │   ├── Ubuntu_16.10-Yakkety_Yak.png
│   │   ├── Ubuntu_17.04-Zesty_Zapus.png
│   │   ├── Ubuntu_17.10-Artful_Aardvark.png
│   │   ├── Ubuntu_18.04-LTS_Bionic_Beaver.png
│   │   ├── Ubuntu_18.10-Cosmic_Cuttlefish.png
│   │   ├── Ubuntu_19.04-Disco_Dingo.png
│   │   ├── Ubuntu_19.10-Eoan_Ermine.png
│   │   ├── Ubuntu_20.04-LTS_Focal_Fossa.png
│   │   ├── Ubuntu_20.10-Groovy_Gorilla.png
│   │   ├── Ubuntu_21.04-Hirsute_Hippo.png
│   │   ├── Ubuntu_21.10-Impish_Indri.png
│   │   ├── Ubuntu_22.04-LTS_Jammy_Jellyfish.png
│   │   ├── Ubuntu_22.10-Kinetic_Kudu.png
│   │   ├── Ubuntu_23.04-Lunar_Lobster.png
│   │   ├── Ubuntu_23.10-Mantic_Minotaur.png
│   │   ├── Ubuntu_24.04-LTS_Noble_Numbat.png
│   │   ├── Ubuntu_24.10-Oracular_Oriole.png
│   │   ├── Ubuntu_25.04-Plucky_Puffin.png
│   │   ├── Ubuntu_4.10-Warty_Warthog.png
│   │   ├── Ubuntu_5.04-Hoary_Hedgehog.png
│   │   ├── Ubuntu_5.10-Breezy_Badger.png
│   │   ├── Ubuntu_6.06-LTS_Dapper_Drake.png
│   │   ├── Ubuntu_6.10-Edgy_Eft.png
│   │   ├── Ubuntu_7.04-Feisty_Fawn.png
│   │   ├── Ubuntu_7.10-Gutsy_Gibbon.png
│   │   ├── Ubuntu_8.04-LTS_Hardy_Heron.png
│   │   ├── Ubuntu_8.10-Intrepid_Ibex.png
│   │   ├── Ubuntu_9.04-Jaunty_Jackalope.png
│   │   └── Ubuntu_9.10-Karmic_Koala.png
│   ├── fp-playsets
│   │   ├── boxed
│   │   │   ├── GTJM7759.WEBP
│   │   │   ├── JXBB4767.WEBP
│   │   │   ├── LVPU6231.WEBP
│   │   │   ├── QHZO6007.PNG
│   │   │   ├── VIAD9270.WEBP
│   │   │   ├── XKLU3150.PNG
│   │   │   └── XLWG9242.WEBP
│   │   └── unboxed
│   │       ├── IMG_1091.PNG
│   │       ├── IMG_1092.PNG
│   │       ├── IMG_1093.PNG
│   │       ├── IMG_1094.PNG
│   │       ├── IMG_1096.PNG
│   │       ├── IMG_1097.PNG
│   │       ├── IMG_1098.PNG
│   │       └── Maga playset.PNG
│   ├── mini-mascots
│   │   ├── Ubuntu_10.04-LTS_Lucid_Lynx.svg
│   │   ├── Ubuntu_10.10-Maverik_Meerkat.svg
│   │   ├── Ubuntu_11.04-Natty_Narwhal.svg
│   │   ├── Ubuntu_11.10-Oneiric_Ocelot.svg
│   │   ├── Ubuntu_12.04-LTS_Precise_Pangolin.svg
│   │   ├── Ubuntu_12.10-Quantal_Quetzal.svg
│   │   ├── Ubuntu_13.04-Raring_Ringtail.svg
│   │   ├── Ubuntu_13.10-Saucy_Salamander.svg
│   │   ├── Ubuntu_14.04-LTS_Trusty_Tahr.svg
│   │   ├── Ubuntu_14.10-Utopic_Unicorn.svg
│   │   ├── Ubuntu_15.04-Vivid_Vervet.svg
│   │   ├── Ubuntu_15.10-Willy_Werewolf.svg
│   │   ├── Ubuntu_16.04-LTS_Xenial_Xerus.svg
│   │   ├── Ubuntu_16.10-Yakkety_Yak.svg
│   │   ├── Ubuntu_17.04-Zesty_Zapus.svg
│   │   ├── Ubuntu_17.10-Artful_Aardvark.svg
│   │   ├── Ubuntu_18.04-LTS_Bionic_Beaver.svg
│   │   ├── Ubuntu_18.10-Cosmic_Cuttlefish.svg
│   │   ├── Ubuntu_19.04-Disco_Dingo.svg
│   │   ├── Ubuntu_19.10-Eoan_Ermine.svg
│   │   ├── Ubuntu_20.04-LTS_Focal_Fossa.svg
│   │   ├── Ubuntu_20.10-Groovy_Gorilla.svg
│   │   ├── Ubuntu_21.04-Hirsute_Hippo.svg
│   │   ├── Ubuntu_21.10-Impish_Indri.svg
│   │   ├── Ubuntu_22.04-LTS_Jammy_Jellyfish.svg
│   │   ├── Ubuntu_22.10-Kinetic_Kudo.svg
│   │   ├── Ubuntu_23.04-Lunar_Lobster.svg
│   │   ├── Ubuntu_23.10-Mantic_Minotaur.svg
│   │   ├── Ubuntu_24.04-LTS_Noble_Numbat.svg
│   │   ├── Ubuntu_24.10-Oracular_Oriole.svg
│   │   ├── Ubuntu_25.04-Plucky_Puffin.svg
│   │   ├── Ubuntu_4.10-Warty_Warthog.svg
│   │   ├── Ubuntu_5.04-Hoary_Hedgehog.svg
│   │   ├── Ubuntu_5.10-Breezy_Badger.svg
│   │   ├── Ubuntu_6.06-LTS_Dapper_Drake.svg
│   │   ├── Ubuntu_6.10-Edgy_Eft.svg
│   │   ├── Ubuntu_7.04-Feisty_Fawn.svg
│   │   ├── Ubuntu_7.10-Gutsy_Gibbon.svg
│   │   ├── Ubuntu_8.04-LTS_Hardy_Heron.svg
│   │   ├── Ubuntu_8.10-Intrepid_Ibex.svg
│   │   ├── Ubuntu_9.04-Jaunty_Jackalope.svg
│   │   └── Ubuntu_9.10-Karmic_Koala.svg
│   ├── ob01
│   │   ├── ob-sad.svg
│   │   ├── ob-scream.png
│   │   ├── ob-scream.svg
│   │   ├── ob-wave.svg
│   │   └── ob-woo.svg
│   ├── Ubuntu-Pro-Logo.png
│   └── Ubuntu-Pro-Logo.svg
├── js
│   ├── canoncentration-data.js
│   ├── canoncentration-game.js
│   ├── canoncentration.js
│   ├── canoncentration-scoring.js
│   ├── canoncentration-ui.js
│   ├── showdown-game.js
│   ├── showdown-questions.js
│   ├── showdown-storage.js
│   ├── showdown-ui.js
│   ├── showdown-welcome-popup.js
│   ├── whack-a-mole.js
│   ├── whack-data.js
│   ├── whack-game.js
│   ├── whack-storage.js
│   └── whack-ui.js
├── LICENSE
├── README.md
├── UbuntuProShowdown
│   ├── README.md
│   └── showdown.html
└── Whack-a-LTS
    ├── README.md
    ├── whack-a-lts-game-spec.md
    ├── whack-a-lts.html
    └── whack-a-lts_instructions.md
```

## Contribution and Community Engagement

The Ubuntu Pro Academy Games project welcomes community contributions:

- Game concept suggestions
- Artwork and design improvements
- Code optimization and bug fixes
- Educational content verification and enhancement
- Translations to reach a global audience

By creating engaging, educational gaming experiences, this project aims to make learning about Ubuntu Linux more accessible and enjoyable for users of all skill levels, while fostering a deeper connection to the Ubuntu ecosystem and philosophy.
