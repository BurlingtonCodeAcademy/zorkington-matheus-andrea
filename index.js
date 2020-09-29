const readline = require("readline");
const rlInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rlInterface.question(questionText, resolve);
  });
}
startGame();
//------------------Sanitize
function sanitize(input) {
  return input.toLowerCase().trim();
}
//------START THE GAME
async function startGame() {
  let welCome = await ask(
    "                     WELCOME To Zoorkington....\n\n\n Do you want to play?\n\n>_"
  );
  if (welCome == "yes") {
    console.log(
      "                                -------ATTENTION!!!!-------\n\
    This game still in construction this is just a basic demo, bugs will appear!\n\
    Set the cmder at Width:82 Height:60 and enjoy the game!\n\n\n\n\
    "
    );
    let userName = await ask("What is your name? \n\n>_");
    userName = sanitize(userName);
    player.name = userName;

    console.log(
      `\n\n\nWELCOME ${userName} It is fall in Vermont....Halloween is approaching... the smell of Pumpkin Spiced lates, apple pie and \
  scented candles is in the air. Han Solo fashion season is upon us again. The spookiness is tangible.\
  You head to BCA for your Javascript class, with a mug of hot Java in your hand.\n`
    );

    console.log(
      "You head to BCA for your Javascript class, with a mug of hot Java in your hand.\n\
  And then....\n The door gets locked...There is nobody at BCA right now ...\n\n\n\n\
  You got locked at the BCA-Room\nYour goal is to find the large key and leave the room to explore the world."
    );

    console.log("\n -------------------COMMANDS---------------- \n");
    console.log(
      "Please use the following commands to play the game!\n\
    'examine' => Use examine to check rooms and items.\n(ex: examine room => 'There is a rug a clock a table and a door')\n\
    'use' => To use any item.\n(ex: use rug => 'You lift up the rug')\
    'take' => To take any item.\n(ex: take smallKey => 'You picked up ItemName')\
    'leave' => To leave the room. \n\n"
    );
    lvl1();
  } else if (welCome == "no") {
    console.log("Was Good to see you!");
    process.exit();
  } else {
    console.log("Please enter a Valid input!");
    start();
  }
}

//-----------PLAYER

let player = {
  name: "",
  iventory: [],
  room: "",
};

//------------ Action adn Target Function
function checkTarget(action, target) {
  let avTargets = [
    "desk",
    "rug",
    "clock",
    "small key",
    "smallkey",
    "large key",
    "largekey",
    "room",
    "shelf",
    "cat",
    "key",
    "crystal",
    "door",
  ];
  if (action === "leave") {
    return [action, target];
  }

  if (avTargets.includes(target)) {
    if (
      target === "desk" ||
      target === "rug" ||
      target === "clock" ||
      target === "room" ||
      target === "shelf" ||
      target === "key" ||
      target === "cat" ||
      target === "crystal" ||
      target === "door"
    ) {
      return [action, target];
    } else if (target.includes("small")) {
      return [action, "smallKey"];
    } else if (target.includes("large")) {
      return [action, "largeKey"];
    }
  } else {
    return ["action", "target"];
  }
}

//----------------------CLASSES

class Items {
  constructor(name, desc, takeable, action) {
    this.name = name;
    this.desc = desc;
    this.takeable = takeable;
    this.action = action;
  }
  take() {
    if (this.takeable) {
      player.iventory.push(this.name);
      return `You picked up ${this.name}`;
    } else {
      return "You can't take this item!";
    }
  }
  use() {
    if (this.name === "desk" && player.iventory.includes("smallKey")) {
      return "You opened the drawer, You found a large key inside";
    } else {
      return this.action;
    }
  }
}

//---------------------ITEMS adn Rooms

let desk = new Items(
  "desk",
  "This is a old oak teacher desk, it has a drawer",
  false,
  "The drawer is locked!"
);
let rug = new Items(
  "rug",
  "A old dusty rug",
  false,
  "You lift up the rug, there is a small key under it!"
);
let clock = new Items(
  "clock",
  "Old dusty cuckoo clock",
  false,
  "This clock is creepy, Dosn't do anything!"
);
let smallKey = new Items(
  "smallKey",
  "A Golden small key",
  true,
  "This could fit a drawer!"
);
let largeKey = new Items(
  "largeKey",
  "A Bone large key",
  true,
  "This could open a door!"
);
let room = new Items(
  "BCA-Room",
  "You can seee a desk, a clock on the wall and a rug.",
  false,
  "IDK YET!"
);

let shelf = new Items(
  "shelf",
  "A glass shelf, on it, you see a lot of shiny crystals, but one purple crystal calls your attention",
  false,
  "What would you like to do?"
);
let crystal = new Items(
  "crystal",
  "A big violet quartz crystal sits on the shelf.",
  true,
  "You lift up the crystal, there is a key underneath!"
);
let cat = new Items(
  "cat",
  "A black cat approaches!",
  false,
  "The cat does not want to be picked up!"
);
let key = new Items(
  "key",
  "A beautiful golden key",
  true,
  "This looks like it might fit in the secret door the clerk told you about"
);
let book = new Items(
  "book",
  "An old book",
  true,
  "The book talks about a secret room and a key under a crystal"
);

//----------------------lOOKuPTables

let itemTable = {
  desk: desk,
  rug: rug,
  clock: clock,
  smallKey: smallKey,
  largeKey: largeKey,
  room: room,
  shelf: shelf,
  crystal: crystal,
  cat: cat,
  key: key,
  book: book,
};

//--------------FUNCTIONS of the Rooms.

async function lvl1() {
  let playerAction = await ask("What would you like to do?\n");
  playerAction = sanitize(playerAction);
  let input = playerAction.split(" ");
  let action = input[0];
  let target = input.splice(1).join(" ");
  let fixTarget = checkTarget(action, target);
  action = fixTarget[0];
  target = fixTarget[1];

  if (action === "use") {
    console.log(itemTable[target].use());
    return lvl1();
  } else if (action === "examine") {
    console.log(itemTable[target].desc);
    return lvl1();
  } else if (action === "take") {
    console.log(itemTable[target].take());
    return lvl1();
  } else if (action === "leave") {
    if (player.iventory.includes("largeKey")) {
      lvl2();
    }
  } else {
    console.log("Sorry, Invalid Comand...Try again!");
    return lvl1();
  }
}

async function lvl2() {
  player.inventory = [];
  console.log("------------------THIS AREA STILL IN CONSTRUCTION!");
  process.exit();
}

/////////////////////////////////////////////////////////////////////////////////////////////////CODES IDEAS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//  let shelf = new Item(
//    "shelf",
//    "A glass shelf, on it, you see a lot of shiny crystals, but one purple crystal calls your attention",
//    false,
//    "What would you like to do?"
//  );
//  let crystal = new Item(
//    "crystal",
//    "A big violet quartz crystal sits on the shelf.",
//    true,
//    "You lift up the crystal, there is a key underneath!"
//  );
//  let cat = new Item(
//    "cat",
//    "A black cat approaches!",
//    false,
//    "The cat does not want to be picked up!"
//  );
//  let key = new Item(
//    "key",
//    "A beautiful golden key",
//    true,
//    "This looks like it might fit in the secret door the clerk told you about"
//  );
//  let book = new Item(
//    "book",
//    "An old book",
//    true,
//    "The book talks about a secret room and a key under a crystal"
//  );
//
//  let rooms = [];
//  class room {
//    constructor(roomname, roomdesc, opendoor, action) {
//      this.roomname = roomname;
//      this.roomdesc = roomdesc;
//      this.opendoor = opendoor;
//      this.action = action;
//    }
//    action() {
//      if (this.action) {
//        rooms.push(this.action);
//        return `You tried opening ${this.roomname}`;
//      } else {
//        return "The door is locked!";
//      }
//    }
//    opendoor() {
//      if (this.name === "opendoor" && inventory.includes("key")) {
//        return "You opened the secret door!";
//      } else {
//        return this.action;
//      }
//    }
//  }
//  let BCA = new room(
//    "BCA room",
//    "The BCA classroom is empty, you look around and find a note on one of the tables. The door shuts behind you on it's own.",
//    true,
//    "What would you like to do?"
//  );
//  // let spiritDancer = new room(
//  // );
//  // let muddyWaters = new room(
//  // );
//  // let spiritHalloween = new room(
//  // );
//////////---------------------------------------------------------------JUST SOME RANDOM CODE TO CHECK--------------------------------------------\\\\\\\\\\\\\\\\\\\\\\\\\\

/* First Room
BCA-ROOM 
North {
  door:{
  out side of BCA-room
  stairs 
  outside building 
  main street
  "place holder bob story."
  }
} 

south{
  The door to be open.
}
East{
  Table ---- function that says you cant pick up the table...
Window ----

}
weast{
  table ----- the table is too havy.
Note On top of any table so the player can pick it up and read.

}
Ideasss...... 

Tv- Report
Loook out the windowd and see snow.

Find someone in direction of the book store.

BookStore{
  BOOKs{}
  crystals{
    EpicCrystal{Takes to another dimession.}
  }
  clerck{
    says: A joke.
    If you solve the guiven problem you get a clue.
    Prints a poem (Guive the clue for openning the door )
  }
 
 
}


*/
