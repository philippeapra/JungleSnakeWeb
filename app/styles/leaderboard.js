var siteWidth = 600;
var scale = screen.width /siteWidth;

document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');

var database = firebase.database();
var mDatabase = database.ref().child("users");
var ListView = document.getElementById('leaderboard');
var StringsToBeAdded = [];
var rank = 0;
var Machine_ID = localStorage.getItem("Machine_ID");

getValue();


function getValue(){
    var query = mDatabase.orderByChild("HighScore");
    query.once('value', (snapshot) => {
        StringsToBeAdded=[];
        var i =parseInt(snapshot.numChildren()+1) ;
        snapshot.forEach((childSnapshot) => {
            i--;
            if (childSnapshot.key == Machine_ID){
                rank = i-1;
            }
        //   var childKey = childSnapshot.key;
          var Username = childSnapshot.child("username").val();
          var Score = childSnapshot.child("HighScore").val();
          var S = "                     ";
          var S1 = "#" + i;
          if(Username==null){Username="Unknown";}
          var S2 = Username;
          if(Score==null){Score=0;}
          var S3 = Score;
          var StringToBeAdded =S1+S.substring(0,6-S1.length)+ S2+S.substring(0,14-S2.length)+S.substring(0,4-S3.length)+ S3;
          StringsToBeAdded.unshift(StringToBeAdded);
        });
        //  StringsToBeAdded.reverse();
for (var i = 0; i < StringsToBeAdded.length; i++) {
    var row = document.createElement("div");
    var text = document.createElement("input");
    row.setAttribute("id", "row"+i);
    if(i == rank){
        row.setAttribute("style","background-color: #B2CC48;")
        
    }
    text.setAttribute("id", "text"+i);
    text.setAttribute("readonly", "true");
    text.setAttribute("value", StringsToBeAdded[i]);
    ListView.appendChild(row);
    row.appendChild(text);
}
var rank2 = rank+1;
var MeRow = document.getElementById("row"+rank2);
MeRow.scrollIntoView({behavior: "smooth", block:"center", inline: "nearest"});
      });
}
