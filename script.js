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

//generating the HTML for the board
const generateBoard = () => {
  for (let i=0; i<5; i++) {
    for (let j=0; j<5; j++) {
      $(".row"+(i+1)).append(`
      <div id="${xCoord[i] + yCoord[j]}" class="box border border-dark">
                  <div id="${xCoord[i] + yCoord[j] + "val"}" class="inner noselect">${board[i][j]}</div>
                </div>
      `)
    }
  }
}

generateBoard();

//adds color scheme to the board via css classes
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


//checks if board move is legal, returns true/false
const isValid = () => {
  return false;
}

//onClick events section

//adds class selected on anything held down and hovered over
$(document).on("mousedown", ".box", function() {
  $(this).addClass("selected");

  $(document).on("mouseover", ".box", function() {
    //create function for checking if move is allowed, returns true/false
    if (isValid()) {
      $(this).addClass("selected");
    }
  });
});

//removes class selected and sees if move is valid
$(document).on("mouseup", ".body", function() {
  $(".selected").removeClass("selected");
});


//end document.ready
// });