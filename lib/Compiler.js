const fs = require("fs");
const hbs = require("handlebars");

class Compiler {
    constructor() {
        this.templates = ['../templates/main.html', '../templates/manager.html', '../templates/engineer.html',
        '../templates/intern.html'];

    }
    getSolution(data) {
        return this.templates
          .map(function(filename, data) {
              console.log(data);
            var source = fs.readFileSync(filename, 'utf8').toString();
            var template = hbs.compile(source);
            var output = template(data);
            return output;
          })
          .join(", "); // create a string from the array of solved letters
      }
}

const arr = [{Manager : {name: "manager", id: 123}}]
console.log(new Compiler().getSolution(arr));