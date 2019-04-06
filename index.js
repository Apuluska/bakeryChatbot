var express = require('express');
var app = express();
var rp = require('request-promise');

var textList = ['hola', 'que hay de menu', 'adios'];
var answerList = ['Buenos dias, bienvenido a BakeryChatbot', 'nuestro menu del día es:', 'hasta otra, gracias por venir'];

function getMenu() {
    rp('https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery')
        .then(function (vienenTodosLosdatos) {
            console.log(vienenTodosLosdatos);
            /*  var datosParseados = JSON.parse(vienenTodosLosdatos);
             var monedaExtranjera = datosParseados.rates[monedaDelUsuario].toString();
             res.send(monedaExtranjera); */
        }).catch((error) => { console.log('error') })
}

function getResponse(key) {
    let response = '';
    switch (key) {
        case String.contains('hola'):
            response = answerList[0];
            break;
        case String.contains('menu'):
            response = answerList[1] + getMenu();
            break;
        case String.contains('adios'):
            response = answerList[2];
            break;
        default:
            response = 'While you will be attendat, take a look to our menu' + getMenu();
            break;
    }
    return response;
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

