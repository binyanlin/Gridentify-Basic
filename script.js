// $(document).ready(function() {
//start code

//define variables
const board = [];
const xCoord = ["A", "B", "C", "D", "E"];
const yCoord = ["1", "2", "3", "4", "5"];

//initializing board values function
const rollBoard = function() {
  while (board.length<5) {
    let arr1 = [];
    for(let i=0; i<5; i++) {
      arr1.push(Math.ceil(Math.random()*3));
    };
    board.push(arr1);
  }
}
rollBoard();
console.log(board);

//generating the HTML for the board
const generateBoard = () => {
  for (let i=0; i<5; i++) {
    for (let j=0; j<5; j++) {
      
    }
  }
}

const colorBoard = function() {
  for (let i=0; i<5; i++) {
    for (let j=0; j<5; j++) {
      let temp;
      if (board[i][j] == 1) {
        temp = "purple1";
      } else if (board[i][j] == 2) {
        temp = "purple2";
      } else if (board[i][j] == 3) {
        temp = "purple3";
      } else {
        temp = "purple4"
      }
      $("#" + xCoord[i] + yCoord[j]).addClass(temp);
    }
  }
}

colorBoard();


//onClick event
$(document).on("click", ".box", function() {
  $(this).toggleClass("selected");
  
});

//end document.ready
// });