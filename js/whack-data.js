/**
 * Ubuntu releases data for the Whack-a-LTS game
 * Contains information about Ubuntu releases and their LTS status
 */

// Define global namespace to avoid variable conflicts
window.WhackGame = window.WhackGame || {};

// Ubuntu releases data
WhackGame.ubuntuReleases = [
    { version: "4.10", name: "Warty Warthog", isLTS: false },
    { version: "5.04", name: "Hoary Hedgehog", isLTS: false },
    { version: "5.10", name: "Breezy Badger", isLTS: false },
    { version: "6.06", name: "Dapper Drake", isLTS: true },  // Exception: LTS
    { version: "6.10", name: "Edgy Eft", isLTS: false },
    { version: "7.04", name: "Feisty Fawn", isLTS: false },
    { version: "7.10", name: "Gutsy Gibbon", isLTS: false },
    { version: "8.04", name: "Hardy Heron", isLTS: true },
    { version: "8.10", name: "Intrepid Ibex", isLTS: false },
    { version: "9.04", name: "Jaunty Jackalope", isLTS: false },
    { version: "9.10", name: "Karmic Koala", isLTS: false },
    { version: "10.04", name: "Lucid Lynx", isLTS: true },
    { version: "10.10", name: "Maverick Meerkat", isLTS: false },
    { version: "11.04", name: "Natty Narwhal", isLTS: false },
    { version: "11.10", name: "Oneiric Ocelot", isLTS: false },
    { version: "12.04", name: "Precise Pangolin", isLTS: true },
    { version: "12.10", name: "Quantal Quetzal", isLTS: false },
    { version: "13.04", name: "Raring Ringtail", isLTS: false },
    { version: "13.10", name: "Saucy Salamander", isLTS: false },
    { version: "14.04", name: "Trusty Tahr", isLTS: true },
    { version: "14.10", name: "Utopic Unicorn", isLTS: false },
    { version: "15.04", name: "Vivid Vervet", isLTS: false },
    { version: "15.10", name: "Willy Werewolf", isLTS: false },
    { version: "16.04", name: "Xenial Xerus", isLTS: true },
    { version: "16.10", name: "Yakkety Yak", isLTS: false },
    { version: "17.04", name: "Zesty Zapus", isLTS: false },
    { version: "17.10", name: "Artful Aardvark", isLTS: false },
    { version: "18.04", name: "Bionic Beaver", isLTS: true },
    { version: "18.10", name: "Cosmic Cuttlefish", isLTS: false },
    { version: "19.04", name: "Disco Dingo", isLTS: false },
    { version: "19.10", name: "Eoan Ermine", isLTS: false },
    { version: "20.04", name: "Focal Fossa", isLTS: true },
    { version: "20.10", name: "Groovy Gorilla", isLTS: false },
    { version: "21.04", name: "Hirsute Hippo", isLTS: false },
    { version: "21.10", name: "Impish Indri", isLTS: false },
    { version: "22.04", name: "Jammy Jellyfish", isLTS: true },
    { version: "22.10", name: "Kinetic Kudu", isLTS: false },
    { version: "23.04", name: "Lunar Lobster", isLTS: false },
    { version: "23.10", name: "Mantic Minotaur", isLTS: false },
    { version: "24.04", name: "Noble Numbat", isLTS: true },
    { version: "24.10", name: "Oracular Oriole", isLTS: false },
    { version: "25.04", name: "Plucky Puffin", isLTS: false }
];

// Default hole positions
WhackGame.defaultHolePositions = [
    {x: 50, y: 50},
    {x: 250, y: 50},
    {x: 450, y: 50},
    {x: 150, y: 150},
    {x: 350, y: 150},
    {x: 50, y: 250},
    {x: 250, y: 250},
    {x: 450, y: 250},
    {x: 150, y: 350},
    {x: 350, y: 350}
];
