var express = require('express');
var app = express();
var rp = require('request-promise');
const https = require('https');
const fs = require('fs');


const options = {
    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
  };
  
  https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('bakery\n');
  }).listen(3000);
  
//Array options to question & answer, next versions, better in a Database
var textList = ['hello', 'menu', 'bye', ''];
var answerList = ['Good morning! welcome to BakeryChatbot', 'Our daily menu is: ', 'See you soon!, thanks for coming', 'Please, wait while you`ll be attendant. For today, this is our menu: '];


app.get("/", (req, res)=> {
   console.log("Responding to root route")
   res.send("Hello from Root")
})

/// SERVER IS LISTENING
app.listen(3000, ()=> {
    console.log("Server is ok")
})
/////////////////////////
//Connect with the API
async function getMenu() {
    var menuApi = await rp('https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery')
    .then(function(htmlString) {
        return htmlString;
    });  
    return menuApi;
}
//Options to answer
async function getResponse(clientQuestion) {
    if (clientQuestion.includes(textList[0])) {
        return answerList[0];   
    }
    if (clientQuestion.includes(textList[1])) {
        var giveAnswer = answerList[1]+ await getMenu();
        return giveAnswer;   
    } if (clientQuestion.includes(textList[2])) {
            var giveAnswer = answerList[2];
            return giveAnswer;   
    } else {
        return answerList[3]+ await getMenu();
    }
 }

 //testing
 async function initChatbot(){
    var hello= await getResponse('hello chat');
     var menu= await getResponse('Tell me your daily menu');
     var seeYou= await getResponse('bye');
     var nothing= await getResponse('nothing');

     console.log(hello);
     console.log(menu);
     console.log(seeYou);
     console.log(nothing);

 }

initChatbot();

 