const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}


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


let playerAnswer = await ask(" >_")
if(playerAnswer == "inventory"){
  console.log(player.inventory)
}

if(player.inventory.includes("note")){
  console.log(note)
}else{
  console.log("You")
}

///////////////////////////////

let  player = {
  name: "Matheus",
  inventory:[],
  status:[],
  currentRoom: '',
 facing: "N, W , E, S"
}