import express from "express";
import bodyParser from "body-parser";
import mustache from "mustache";
import fs from "fs";

const app = express();

const PORT = 3000;

const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.json());

app.get(["/first", "/second", "/third", "/fourth", "/fifth"], function (request, response) {
    let data = JSON.parse(fs.readFileSync('.' + request.url + ".json"));
    let file = fs.readFileSync("template.html").toString();
    let template = mustache.render(file, data);
    response.send(template);
});

app.post('/', urlencodedParser, function (request, response) {
    let information = new Object();
    information.name = request.body.Name;
    information.gender = request.body.Gender;
    information.shoes = request.body.Shoes;
    let file = fs.readFileSync("main.html").toString();
    let newdata = file + '<div style="text-align: center; margin: 20px 0"> Name: {{name}} <br> Gender: {{gender}} <br> Shoes: {{shoes}} <br> </div>';
    let template = mustache.render(newdata, information);
    response.send(template);
});

app.get('/?', function (request, response) {
    response.sendFile(process.cwd() + '/main.html')
});

app.listen(PORT, () => {
    console.log("Server started at http://localhost:3000");
});