// $(document).ready(function() {
//start code

//define variables
const board = [];
const xCoord = ["A", "B", "C", "D", "E"];
const yCoord = ["1", "2", "3", "4", "5"];
let selection = false;  //switch variable for checking mouseover
let validM = [];  //array of valid next moves possible
let moveStack = []; //stores moves made in order
let scoreArray = []; //stores the potential array of numbers to check if valid
let score = 0; //the score


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

const color = (position) => {
  switch (position) {
    case 1:
      return "purple1";
    case 2:
      return "purple2";
    case 3:
      return "purple3";
    default:
      return "purple4";
  }
}

//adds color scheme to the board via css classes
const colorBoard = function() {
  for (let i=0; i<5; i++) {
    for (let j=0; j<5; j++) {
      let temp = color(board[i][j]);
      $("#" + xCoord[i] + yCoord[j]).addClass(temp);
    }
  }
}

colorBoard();

//checks traversal on board, returns valid moves (up to 4)
const traverse = (point) => {
  let x = point[0];
  let y = point[1];
  let xVal = xCoord.indexOf(x);
  let yVal = yCoord.indexOf(y);
  const validMoves = [];
  //up
  if (yVal>0) {
    validMoves.push(x+yCoord[yVal-1]);
  }
  //down
  if (yVal<4) {
    validMoves.push(x+yCoord[yVal+1]);
  }
  //left
  if (xVal>0) {
    validMoves.push(xCoord[xVal-1]+y);
  }
  //right
  if(xVal<4) {
    validMoves.push(xCoord[xVal+1]+y);
  }
  return validMoves;
}

//checks if board move is legal, returns true/false
const isValid = (move, validMoves) => {
  if (validMoves.indexOf(move)>-1) {
    return true;
  }
  return false; 
}

//adds a pre-checked list of scores if valid
const addScore = (scoreArray) => {
  let points = scoreArray.reduce((a,b)=>parseInt(a)+parseInt(b));
  score += points;
  $("#scoreValue").text(score);
  let lastMove = moveStack.pop();
  scoreArray.pop();
  $("#"+lastMove).children().text(points);
  $("#"+lastMove).removeClass("purple1 purple2 purple3 purple4");
  $("#"+lastMove).addClass(color(points));
  while (scoreArray.length !== 0) {
    let randomNum = Math.ceil(Math.random()*3);
    let curBox = "#"+moveStack.pop();
    $(curBox).children().text(randomNum);
    $(curBox).removeClass("purple1 purple2 purple3 purple4");
    $(curBox).addClass(color(randomNum));
    scoreArray.pop();
  }
}

//onClick events section

//adds class selected on anything held down and hovered over
$(document).on("mousedown", ".box", function() {
  if (!$(this).hasClass("selected")) {
    $(this).addClass("selected");
    let cur = $(this).attr("id");
    selection = true;
    validM = traverse(cur);
    let target = $(this).children().text();
    scoreArray.push(target);
    moveStack.push(cur);
  }
});

$(document).on("mouseover", ".box", function () {
  //create function for checking if move is allowed, returns true/false
  if (selection) {
    let move = $(this).attr("id");
    if (!$("#"+move).hasClass("selected")) {

      if (isValid(move, validM)) {
      $("#"+move).addClass("selected");
      let target = $(this).children().text();
      scoreArray.push(target);
      moveStack.push(move);
      validM = traverse(move);
      }
    }
  //interacting with the stack function
    if ($("#"+move).hasClass("selected") && moveStack.indexOf(move)>-1 && moveStack.indexOf(move)!== moveStack.length-1) {
      while(moveStack.length-1 > moveStack.indexOf(move)) {
        let remove = moveStack.pop();
        $("#"+remove).removeClass("selected");
        scoreArray.pop();
        validM = traverse(move);
      }
    }
  }
});

//function to clear selections if mouse hovered outside boxes or if mouseup finished
const clearFunc = () => {
  selection = false;
  validM.length = 0;
  scoreArray.length = 0;
  moveStack.length = 0;
  $(".selected").removeClass("selected");
}

//removes class selected and sees if move is valid
$(document).on("mouseup", ".box", function() {
  if ($(this).hasClass("selected")) {
    if (scoreArray.length >1) {
        let scoreSet = new Set(scoreArray);
      //if scoreArray is all same number, then run score function, also updates missing boxes with new random number
      if (scoreSet.size == 1) {
        addScore(scoreArray);
      }
    }
  }
  clearFunc();
});

$(document).on("mouseleave", ".grid", function() {
    clearFunc();
});



//end document.ready
// });