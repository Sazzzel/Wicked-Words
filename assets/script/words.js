const words = [
  // Difficulty 1 (short words: 3 letter)
  [
    "bat",
    "cat",
    "boo",
    "web",
    "fog",
    "owl",
    "hat",
    "bat",
    "rat",
    "eye",
    "pot",
    "hex",
    "pit",
    "boo",
    "ash",
    "zap",
    "wig",
    "nun",
    "mud",
    "paw",
  ],

  //Difficulty 2 (4-letter words)
  [
    "tomb",
    "wolf",
    "fear",
    "moth",
    "monsters",
    "dusk",
    "gory",
    "cree",
    "grim",
    "wail",
    "haze",
    "lurk",
    "dark",
    "rave",
    "dead",
    "fang",
  ],

  [
    // Difficulty 3 (5-letter words)
    "witch",
    "ghost",
    "candy",
    "grave",
    "skull",
    "beast",
    "broom",
    "sneak",
    "fangs",
    "clown",
    "crypt",
    "siren",
    "crows",
    "moons",
    "treat",
    "ghoul",
    "spook",
    "bones",
    "torch",
  ],

  // Difficulty 4 (6-letter words)
  [
    "zombie",
    "haunts",
    "spider",
    "spooky",
    "goblin",
    "witch",
    "cobweb",
    "dagger",
    "jackal",
    "spells",
    "devils",
    "candles",
    "scarer",
    "demons",
    "potion",
  ],

  // Difficulty 5 (7-letter words)
  [
    "monster",
    "vampire",
    "grimace",
    "skeleton",
    "haunted",
    "pumpkin",
    "creeper",
    "lurking",
    "mummies",
    "phantom",
    "villain",
    "warlock",
    "screams",
    "shadows",
    "dungeon",
    "ghastly",
    "witches",
    "mystery",
  ],

  // Difficulty 6 (8-letter words)
  [
    "werewolf",
    "cauldron",
    "phantoms",
    "skeleton",
    "darkness",
    "sorcerer",
    "exorcism",
    "cauldron",
    "gargoyle",
    "darkness",
    "cauldron",
    "banshees",
    "chilling",
  ],
];

let level = 1;
let puzzle = null;
let gameType;



function newWord(){
    puzzle= words[Math.floor(level - 1)][Math.floor(Math.random() * words[Math.floor(level - 1)].length)];
      let shuffle = puzzle;
    if(gameType === 'scramble'){
       shuffle =  puzzle.split('').sort(function(){return 0.5-Math.random()}).join('');
    }

  document.getElementById("Puzzle").innerHTML = shuffle;
}
