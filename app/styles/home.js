var siteWidth = 600;
var scale = screen.width /siteWidth;

document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 13:
            save()
            break;
    }
});
var toolongTV = document.getElementById("toolongTV");
var Username = localStorage.getItem("username");
var UsernameTV = document.getElementById("UsernameTV");
var database = firebase.database();
var mDatabase = database.ref().child("users");
var HighScore = localStorage.getItem("HighScore");
var Machine_ID = localStorage.getItem("Machine_ID");
if (Machine_ID==null){
    Machine_ID = "w"+makeid(15);
    localStorage.setItem("Machine_ID",Machine_ID);
}
var BlueBtn = document.getElementById("BlueBtn");
var GreenBtn = document.getElementById("GreenBtn");
var PinkBtn = document.getElementById("PinkBtn");
var SlowBtn = document.getElementById("SlowBtn");
var NormalBtn = document.getElementById("NormalBtn");
var FastBtn = document.getElementById("FastBtn");
var SnakeColor = localStorage.getItem("SnakeColor");
var SnakeSpeed = localStorage.getItem("delay");
if (SnakeColor == null|| SnakeColor=="snake.png"){Green();}
if(SnakeColor=="snakeblue.png"){Blue();}
if(SnakeColor=="snakepink.png"){Pink();}
if (SnakeSpeed == null|| SnakeSpeed==250){Normal();}
if(SnakeSpeed==300){Slow();}
if(SnakeSpeed==200){Fast();}
if(Username!=null){UsernameTV.value = Username;}
function save(){
    if (UsernameTV.value.length > 10){
        toolongTV.setAttribute("style", "color:red;");
        toolongTV.value = "Username is too long";
    }
    else if (UsernameTV.value.length < 1){
        toolongTV.setAttribute("style", "color:red;");
      toolongTV.value = "Please enter username";
    }
    else if (UsernameTV.value.length < 2){
        toolongTV.setAttribute("style", "color:red;");
        toolongTV.value = "Username is too short";
    }
    
    else{
    localStorage.setItem("username",UsernameTV.value);
    Username = localStorage.getItem("username");
    if(Username==null){Username="";}
    if(HighScore==null){HighScore=0;}
    let User1 = new User(Username,HighScore);
    writeUserData(Machine_ID,User1);
    //toolongTV.setAttribute("style", "color:green;");
    //toolongTV.value = "saved";
    }
    
}
class User {
    constructor(username,HighScore) {
      this.username = username;
      this.HighScore = parseInt(HighScore) ;
    }
}
  function Play (){
      save();
    Username = localStorage.getItem("username");
    if(Username!=null){
      window.location.href='http://junglesnake.unaux.com/home.html';
    }
    
  }
  function writeUserData(userId,user ) {
    mDatabase.child(userId).set(user);
  }
  function Blue(){
    localStorage.setItem("SnakeColor", "snakeblue.png");
    localStorage.setItem("CircleColor", "circleblue.png");
    BlueBtn.setAttribute("style", "background-color:blue;");
    GreenBtn.setAttribute("style", "background-color:white;");
    PinkBtn.setAttribute("style", "background-color:white;");
  }
  function Green(){
    localStorage.setItem("SnakeColor", "snake.png");
    localStorage.setItem("CircleColor", "circle.png");
    BlueBtn.setAttribute("style", "background-color:white;");
    GreenBtn.setAttribute("style", "background-color:#B2CC48;");
    PinkBtn.setAttribute("style", "background-color:white;");
  }
  function Pink(){
    localStorage.setItem("SnakeColor", "snakepink.png");
    localStorage.setItem("CircleColor", "circlepink.png");
    BlueBtn.setAttribute("style", "background-color:white;");
    GreenBtn.setAttribute("style", "background-color:white;");
    PinkBtn.setAttribute("style", "background-color:#F90075;");
  }
  function Slow(){
    localStorage.setItem("delay", 300);
    SlowBtn.setAttribute("style", "background-color:#B2CC48;");
    NormalBtn.setAttribute("style", "background-color:white;");
    FastBtn.setAttribute("style", "background-color:white;");
  }
  function Normal(){
    localStorage.setItem("delay", 250);
    SlowBtn.setAttribute("style", "background-color:white;");
    NormalBtn.setAttribute("style", "background-color:#B2CC48;");
    FastBtn.setAttribute("style", "background-color:white;");
  }
  function Fast(){
    localStorage.setItem("delay",200 );
    SlowBtn.setAttribute("style", "background-color:white;");
    NormalBtn.setAttribute("style", "background-color:white;");
    FastBtn.setAttribute("style", "background-color:#B2CC48;");
  }
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
  