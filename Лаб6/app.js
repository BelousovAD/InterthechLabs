var http = require("http");
var fs = require("fs");

const hostname = 'localhost';
const port = 3000;

http.createServer((request, response) => {
    if (request.method == 'GET') {
        fs.readFile(__dirname + request.url, (error, data) => {
            if (error) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                response.end("Wrong path!")
            } else {
                response.end(data);
            }
        });
    }
    if (request.method == 'POST') {
        let buffer = [];
        request.on('data', function (chunk) {
            buffer.push(chunk);
        });
        request.on('end', function () {
            const data = Buffer.concat(buffer).toString().split('&');
            data.forEach((value, index, array) => {
                array[index] = value.split('=').splice(1, 1).toString();
            });
            console.log(data);
            authorization(data, response);
        });
    }
}).listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function authorization(dataPost, resp) {
    let arrUsers = JSON.parse(fs.readFileSync("users.json")).data;

    let checkUser = arrUsers.find((value) => {
        if (value.name === dataPost[0]) {
            return value;
        }
    });

    if (checkUser === undefined) {
        fs.readFile("auth.html", function (err, data) {
            resp.end(data + '<h3 style="color: red; text-align: center;">Wrong data!</h3>');
        });
    }
    else {
        if (checkUser.password == dataPost[1]) {
            fs.readFile("auth.html", function (err, data) {
            resp.end(data + '<h3 style="color: green; text-align: center;">Success!</h3>');
            });
        } else {
            fs.readFile("auth.html", function (err, data) {
            resp.end(data + '<h3 style="color: red; text-align: center;">Wrong data!</h3>');
            });
        }
    }
}