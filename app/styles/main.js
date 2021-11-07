// // Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase/app";
// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// localStorage.removeItem("SnakeColor");
// localStorage.removeItem("CircleColor");
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
disableScroll();

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            //on swipe left
            BeforeLeft();
        } else {
            //on swipe right
            BeforeRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            //on swipe up
            BeforeUp();
        } else { 
            //on swipe down
            BeforeDown(); 
            
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
function displayAlert(){
            Swal.fire({
            //background: "url(greenframe3.png)",
            title: "<h1>You lost :( <h1>",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Leaderboard`,
            cancelButtonText: `\xa0\xa0\xa0\xa0\xa0`+`Restart`+`\xa0\xa0\xa0\xa0\xa0`,
            denyButtonText: `\xa0\xa0\xa0\xa0\xa0`+`Settings`+`\xa0\xa0\xa0\xa0\xa0`,
            confirmButtonColor: "#B2CC48",
            denyButtonColor: "#B2CC48",
            cancelButtonColor: "#B2CC48",
            
            
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href='http://junglesnake.unaux.com/leaderboard.html';
        } else if (result.isDenied) {
            window.location.href='http://junglesnake.unaux.com/index.html';
        }
        else if (result.dismiss == 'cancel') {
            Restart();
        }
        })
        }

var snake = document.getElementById("snake");
var SnakeColor = localStorage.getItem("SnakeColor");
if(SnakeColor!=null){snake.setAttribute("src",SnakeColor);}
var Username = localStorage.getItem("username");
var ScoreTV = document.getElementById('Score');
var btn_snake = document.getElementById('snake');
var PauseBtn = document.getElementById('PauseBtn');
var RestartBtn= document.getElementById('RestartBtn');
var HighScoreTV = document.getElementById('HighScore');
var YouLostTV = document.getElementById('help');
var apple = document.getElementById('apple');
var SnakeArray = [btn_snake];
var MLeftArray = [0,0,0];
var MTopArray = [0,0,0];
var MLeft =0 ;
var MTop = 175;
var MLeftApple= 100 ;
var MTopApple=175;
var sizepx = 25;
var LastArrow ="";
var step_right = 0;
var step_up = 0;
var step_down = 0;
var step_left = 0;
var i =0;
var delay = localStorage.getItem("delay");
if (delay==null){delay = 250;}
var Paused = false;
var Lost = false;
var Score = parseInt(ScoreTV.value);
var HighScore = localStorage.getItem("HighScore");
HighScoreTV.value=HighScore;
var NumberInQueue = Score/10;
var LastDirection = "";
var NextDirection = "";
var ThisIsANextDirection = false;
var database = firebase.database();
var mDatabase = database.ref();
var Machine_ID = localStorage.getItem("Machine_ID");


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)){
    YouLostTV.value = "Swipe to move snake";
    var siteWidth = 500;
var scale = screen.width /siteWidth;
document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');
}
else{
    
    document.getElementById('arrows').remove();
    //document.getElementById("body").setAttribute("style", "background-size : 500px;");
    window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
    }

class User {
    constructor(username,HighScore) {
      this.username = username;
      this.HighScore = parseInt(HighScore) ;
    }
  }
 
let User1 = new User(Username,HighScore);
function writeUserData(userId,user ) {
    database.ref('users/' + userId).set(user);
  }
  
  // writeUserData(Machine_ID,User1);
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            BeforeLeft();
            break;
        case 38:
            BeforeUp();           
            break;
        case 39:
            BeforeRight();
            break;
        case 40:
            BeforeDown();
            break;
    }
});
function Restart(){   
    document.location.reload(); 
}
function PauseOrResume(){
        if (!Paused) {
        Paused = true;
        PauseBtn.style.backgroundImage = "url('play.png')";
    }
    else {
        Paused = false
        PauseBtn.style.backgroundImage = "url('pause.png')";
    }
    }
    function BeforeLeft(){
        if (ThisIsANextDirection){
            NextDirection="Left";}
        else{
            Left();
        }
    }
    function BeforeRight(){
        if (ThisIsANextDirection){
            NextDirection="Right";}
        else{
            Right();
        }
    }
    function BeforeUp(){
        if (ThisIsANextDirection){
            NextDirection="Up";}
        else{
            Up();
        }
    }
    function BeforeDown(){
        if (ThisIsANextDirection){
            NextDirection="Down";}
        else{
            Down();
        }
    }
function Left(){
        if (LastArrow!="Right"&&!Lost){
        document.querySelector("#snake").style.transform = "rotate(90deg)";
        LastArrow = "Left";
        step_right = 0;
        step_up = 0;
        step_down = 0;
        step_left = sizepx;
        ThisIsANextDirection = true;
        LastDirection = "Left";
        // btn_snake.style('rotate(' + angle + 'deg)');
        // MLeft = MLeft-sizepx;
        // btn_snake.style.marginLeft = MLeft+'px';
    } 
}

function Right(){
        if (LastArrow!="Left"&&!Lost){
        document.querySelector("#snake").style.transform = "rotate(270deg)";
        LastArrow = "Right";
        step_right = sizepx;
        step_up = 0;
        step_down = 0;
        step_left = 0;
        ThisIsANextDirection = true;
        LastDirection = "Right";
        // MLeft = MLeft+ sizepx;
        // btn_snake.style.marginLeft = MLeft+'px';
    }
}

function Up(){
    if (LastArrow!="Down"&&!Lost){
        document.querySelector("#snake").style.transform = "rotate(180deg)";
        LastArrow = "Up";
        step_right = 0;
        step_up = sizepx;
        step_down = 0;
        step_left = 0;
        ThisIsANextDirection = true;
        LastDirection = "Up";
        // MTop = MTop- sizepx;
        // btn_snake.style.marginTop = MTop+'px';
    }
    
}
function Down(){
    if (LastArrow!="Up"&&!Lost){
        document.querySelector("#snake").style.transform = "rotate(0deg)";
        LastArrow = "Down";
        step_right = 0;
        step_up = 0;
        step_down = sizepx;
        step_left = 0;
        ThisIsANextDirection = true;
        LastDirection = "Down";
        // MTop = MTop+ sizepx;
        // btn_snake.style.marginTop = MTop+'px';
    }
    
}
function MoveSnakeHeadInDirectionSelected(){
    MLeft = MLeft - step_left;
    MLeft = MLeft + step_right;
    MTop = MTop - step_up;
    MTop = MTop + step_down;
    btn_snake.style.marginLeft = MLeft+'px';
    btn_snake.style.marginTop = MTop+'px';
} 
function FollowParent(){
        MLeftArray.unshift(MLeft);
        MTopArray.unshift(MTop);
        MLeftArray.length = NumberInQueue+15;
        MTopArray.length = NumberInQueue+15;
        SnakeArray.length = NumberInQueue+15;
}
function MoveSnakeTailAndLoseIfSnakeHitsItsBody(){
    NumberInQueue = Score / 10;
        for (var i = NumberInQueue; i > 0; i--) {
            if (MLeftArray[i] == MLeft && MTopArray[i] == MTop&&i<NumberInQueue){
                Lose();//LoseIfSnakeHitsItsBody
            }
            SnakeArray[i-1].style.marginLeft=MLeftArray[i-1]+'px';
            SnakeArray[i-1].style.marginTop=MTopArray[i-1]+'px';
        }
}
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function AddImageView(){
    var circle = document.createElement("img");
    circle.src = localStorage.getItem("CircleColor");
    circle.setAttribute("height", "25px");
    circle.setAttribute("width", "25px");
    circle.setAttribute("id", "circle"+NumberInQueue);
    circle.setAttribute("style", "position: absolute;");
    document.getElementById("Playground").appendChild(circle);
    var NewImg = document.getElementById("circle"+NumberInQueue);
    SnakeArray.unshift(NewImg);
    SnakeArray[0].style.marginLeft = MLeftArray[0] + 'px';
    SnakeArray[0].style.marginTop = MTopArray[0] + 'px';
}
function AdjustHighScore (){
    if (Score>HighScore) {
        HighScore=Score;
        localStorage.setItem("HighScore", HighScore); 
        HighScoreTV.value = HighScore;
        User1 = new User(Username,HighScore);
        writeUserData(Machine_ID,User1);
    }
}
function WhenAppleEatenDo(){
    //TODO: add eating sound effect
    Score = Score + 10;
    ScoreTV.value = Score;
    ChangeApplePosToRandomPos();
    AddImageView();
    AdjustHighScore();
}
function ConflictWithSnake(){
    NumberInQueue = Score / 10;
    for (var i = NumberInQueue; i >= 0; i--) {
        if (MLeftApple == MLeftArray[i] && MTopApple==MTopArray[i]) {
            return true;
        }
    }
    return false;
}
function GetNewApplePos(){
    MLeftApple = parseInt ((getRandomNumber(0,14)*sizepx)-175);
    MTopApple = parseInt (getRandomNumber(0,16)*sizepx);
}
function ChangeApplePosToRandomPos(){
    GetNewApplePos();
    while(ConflictWithSnake()==true){
        GetNewApplePos();
    }
    apple.style.marginLeft = MLeftApple+'px';
    apple.style.marginTop = MTopApple+'px';
}
function LoseIfOutOfBounds(){
    if (MLeft < -175 || MLeft >150 || MTop < 0 || MTop >375 ){
        Lose();
    }
}




function Lose(){
    // if (!finished){losingsoundeffect.start(); }
    Lost = true
        clearInterval(myInterval);
        displayAlert();
        //mDatabase.child("users").child(Machine_ID).child("HighScore").setValue(HighScore);
        //YouLostTV.value = "YOU LOST :(";
        
        //RecordScore();
        // showInterstitial();
}

var myInterval = setInterval(function() {
    if (!Paused) {
        FollowParent();
        MoveSnakeHeadInDirectionSelected();
        MoveSnakeTailAndLoseIfSnakeHitsItsBody();
        if (!Lost) {
            if (MLeftApple == MLeft && MTopApple == MTop) {
                WhenAppleEatenDo();
            }
            
            LoseIfOutOfBounds();
            NextDirectionx();
        }
    }
}, delay);
function NextDirectionx(){

    
    if (NextDirection=="Right"){Right();}
        if (NextDirection=="Left"){Left();}
        if (NextDirection=="Up"){Up();}
        if (NextDirection=="Down"){Down();}
        NextDirection = "";
        ThisIsANextDirection = false;
}