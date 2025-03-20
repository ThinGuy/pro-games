// canoncentration-data.js - Contains all data for the Canoncentration game

// Ubuntu release data including version, codename, and SVG paths
const releases = [
    { version: "Ubuntu 4.10", codename: "Warty Warthog", svgPath: "../images/mini-mascots/Ubuntu_4.10-Warty_Warthog.svg", era: "early" },
    { version: "Ubuntu 5.04", codename: "Hoary Hedgehog", svgPath: "../images/mini-mascots/Ubuntu_5.04-Hoary_Hedgehog.svg", era: "early" },
    { version: "Ubuntu 5.10", codename: "Breezy Badger", svgPath: "../images/mini-mascots/Ubuntu_5.10-Breezy_Badger.svg", era: "early" },
    { version: "Ubuntu 6.06", codename: "Dapper Drake", svgPath: "../images/mini-mascots/Ubuntu_6.06-LTS_Dapper_Drake.svg", era: "early" },
    { version: "Ubuntu 6.10", codename: "Edgy Eft", svgPath: "../images/mini-mascots/Ubuntu_6.10-Edgy_Eft.svg", era: "early" },
    { version: "Ubuntu 7.04", codename: "Feisty Fawn", svgPath: "../images/mini-mascots/Ubuntu_7.04-Feisty_Fawn.svg", era: "early" },
    { version: "Ubuntu 7.10", codename: "Gutsy Gibbon", svgPath: "../images/mini-mascots/Ubuntu_7.10-Gutsy_Gibbon.svg", era: "early" },
    { version: "Ubuntu 8.04", codename: "Hardy Heron", svgPath: "../images/mini-mascots/Ubuntu_8.04-LTS_Hardy_Heron.svg", era: "early" },
    { version: "Ubuntu 8.10", codename: "Intrepid Ibex", svgPath: "../images/mini-mascots/Ubuntu_8.10-Intrepid_Ibex.svg", era: "early" },
    { version: "Ubuntu 9.04", codename: "Jaunty Jackalope", svgPath: "../images/mini-mascots/Ubuntu_9.04-Jaunty_Jackalope.svg", era: "early" },
    { version: "Ubuntu 9.10", codename: "Karmic Koala", svgPath: "../images/mini-mascots/Ubuntu_9.10-Karmic_Koala.svg", era: "early" },
    { version: "Ubuntu 10.04", codename: "Lucid Lynx", svgPath: "../images/mini-mascots/Ubuntu_10.04-LTS_Lucid_Lynx.svg", era: "early" },
    { version: "Ubuntu 10.10", codename: "Maverick Meerkat", svgPath: "../images/mini-mascots/Ubuntu_10.10-Maverik_Meerkat.svg", era: "middle" },
    { version: "Ubuntu 11.04", codename: "Natty Narwhal", svgPath: "../images/mini-mascots/Ubuntu_11.04-Natty_Narwhal.svg", era: "middle" },
    { version: "Ubuntu 11.10", codename: "Oneiric Ocelot", svgPath: "../images/mini-mascots/Ubuntu_11.10-Oneiric_Ocelot.svg", era: "middle" },
    { version: "Ubuntu 12.04", codename: "Precise Pangolin", svgPath: "../images/mini-mascots/Ubuntu_12.04-LTS_Precise_Pangolin.svg", era: "middle" },
    { version: "Ubuntu 12.10", codename: "Quantal Quetzal", svgPath: "../images/mini-mascots/Ubuntu_12.10-Quantal_Quetzal.svg", era: "middle" },
    { version: "Ubuntu 13.04", codename: "Raring Ringtail", svgPath: "../images/mini-mascots/Ubuntu_13.04-Raring_Ringtail.svg", era: "middle" },
    { version: "Ubuntu 13.10", codename: "Saucy Salamander", svgPath: "../images/mini-mascots/Ubuntu_13.10-Saucy_Salamander.svg", era: "middle" },
    { version: "Ubuntu 14.04", codename: "Trusty Tahr", svgPath: "../images/mini-mascots/Ubuntu_14.04-LTS_Trusty_Tahr.svg", era: "middle" },
    { version: "Ubuntu 14.10", codename: "Utopic Unicorn", svgPath: "../images/mini-mascots/Ubuntu_14.10-Utopic_Unicorn.svg", era: "middle" },
    { version: "Ubuntu 15.04", codename: "Vivid Vervet", svgPath: "../images/mini-mascots/Ubuntu_15.04-Vivid_Vervet.svg", era: "middle" },
    { version: "Ubuntu 15.10", codename: "Wily Werewolf", svgPath: "../images/mini-mascots/Ubuntu_15.10-Willy_Werewolf.svg", era: "middle" },
    { version: "Ubuntu 16.04", codename: "Xenial Xerus", svgPath: "../images/mini-mascots/Ubuntu_16.04-LTS_Xenial_Xerus.svg", era: "middle" },
    { version: "Ubuntu 16.10", codename: "Yakkety Yak", svgPath: "../images/mini-mascots/Ubuntu_16.10-Yakkety_Yak.svg", era: "middle" },
    { version: "Ubuntu 17.04", codename: "Zesty Zapus", svgPath: "../images/mini-mascots/Ubuntu_17.04-Zesty_Zapus.svg", era: "middle" },
    { version: "Ubuntu 17.10", codename: "Artful Aardvark", svgPath: "../images/mini-mascots/Ubuntu_17.10-Artful_Aardvark.svg", era: "middle" },
    { version: "Ubuntu 18.04", codename: "Bionic Beaver", svgPath: "../images/mini-mascots/Ubuntu_18.04-LTS_Bionic_Beaver.svg", era: "middle" },
    { version: "Ubuntu 18.10", codename: "Cosmic Cuttlefish", svgPath: "../images/mini-mascots/Ubuntu_18.10-Cosmic_Cuttlefish.svg", era: "middle" },
    { version: "Ubuntu 19.04", codename: "Disco Dingo", svgPath: "../images/mini-mascots/Ubuntu_19.04-Disco_Dingo.svg", era: "middle" },
    { version: "Ubuntu 19.10", codename: "Eoan Ermine", svgPath: "../images/mini-mascots/Ubuntu_19.10-Eoan_Ermine.svg", era: "middle" },
    { version: "Ubuntu 20.04", codename: "Focal Fossa", svgPath: "../images/mini-mascots/Ubuntu_20.04-LTS_Focal_Fossa.svg", era: "middle" },
    { version: "Ubuntu 20.10", codename: "Groovy Gorilla", svgPath: "../images/mini-mascots/Ubuntu_20.10-Groovy_Gorilla.svg", era: "middle" },
    { version: "Ubuntu 21.04", codename: "Hirsute Hippo", svgPath: "../images/mini-mascots/Ubuntu_21.04-Hirsute_Hippo.svg", era: "middle" },
    { version: "Ubuntu 21.10", codename: "Impish Indri", svgPath: "../images/mini-mascots/Ubuntu_21.10-Impish_Indri.svg", era: "middle" },
    { version: "Ubuntu 22.04", codename: "Jammy Jellyfish", svgPath: "../images/mini-mascots/Ubuntu_22.04-LTS_Jammy_Jellyfish.svg", era: "modern" },
    { version: "Ubuntu 22.10", codename: "Kinetic Kudu", svgPath: "../images/mini-mascots/Ubuntu_22.10-Kinetic_Kudo.svg", era: "modern" },
    { version: "Ubuntu 23.04", codename: "Lunar Lobster", svgPath: "../images/mini-mascots/Ubuntu_23.04-Lunar_Lobster.svg", era: "modern" },
    { version: "Ubuntu 23.10", codename: "Mantic Minotaur", svgPath: "../images/mini-mascots/Ubuntu_23.10-Mantic_Minotaur.svg", era: "modern" },
    { version: "Ubuntu 24.04", codename: "Noble Numbat", svgPath: "../images/mini-mascots/Ubuntu_24.04-LTS_Noble_Numbat.svg", era: "modern" },
    { version: "Ubuntu 24.10", codename: "Oracular Oriole", svgPath: "../images/mini-mascots/Ubuntu_24.10-Oracular_Oriole.svg", era: "modern" },
    { version: "Ubuntu 25.04", codename: "Plucky Puffin", svgPath: "../images/mini-mascots/Ubuntu_25.04-Plucky_Puffin.svg", era: "modern" }
];

// Circle of Friends (CoF) logos for different eras
const coverSvgs = [
    { era: "early", version: "Ubuntu 04.10-10.04", path: "../images/cof/cof_2004-2010.svg" },
    { era: "middle", version: "Ubuntu 10.10-21.10", path: "../images/cof/cof_2010-2022.svg" },
    { era: "modern", version: "Ubuntu 22.04+", path: "../images/cof/cof-2022.svg" }
];

// SVGs for OB01 (Orangebox Mascot) various faces used with game messaging
const obiFaces = [
    { name: "woo", path: "../images/ob01/ob-woo.svg" },
    { name: "scream", path: "../images/ob01/ob-scream.svg" },
    { name: "wave", path: "../images/ob01/ob-wave.svg" },
    { name: "sad", path: "../images/ob01/ob-sad.svg" }
];

// Game state variables - shared between all files
let selectedCards = [];
let matchedPairs = 0;
let startTime = 0;
let timerInterval;
let selectedReleases = [];
let isGamePaused = false;
let useEraLogos = false; // Default to not using era-specific logos
let gameInitialized = false; // Track if game is initialized but not yet started
