var express = require('express');
var app = express();
var rp = require('request-promise');

var textList = ['hola', 'menu', 'adios'];
var answerList = ['Buenos dias, bienvenido a BakeryChatbot', 'nuestro menu del día es: ', 'hasta otra, gracias por venir '];


app.get("/", (req, res)=> {
   console.log("Responding to root route")
   res.send("Hello from Root")
})


/// SERVER IS LISTENING
app.listen(3000, ()=> {
    console.log("Server is ok")
})
async function getMenu() {
    var a = await rp('https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery')
    .then(function(htmlString) {
        return htmlString;
    });  
    return a;
}

async function getResponse(key) {
    if (key === textList[0]) {
        return answerList[0];   
    }
    if (key.includes(textList[1])) {
        var a = answerList[1]+ await getMenu();
        return a;   
    } else {
        return answerList[2];
    }
 }
 async function initChatbot(){
     var op= await getResponse('quiero saber el menu del dia');
     console.log(op);
 }
initChatbot();

 