const http = require('http');
const fs = require('fs');
const yargs = require('yargs');

const server = http.createServer((req,res) => {
  console.log('Server Created');
});
server.listen(3000,'localhost');

console.log("Notes Taking App");
console.log("Commands :\nadd \nremove\nlist\nread\n");

let data;
let list = [];
var note;
let flag = 0;

function jsonUpdater(){
  try{
    data = fs.readFileSync('./notes.json',{encoding:'utf-8'});
    list = JSON.parse(data);
  }
  catch(err) {
    console.log('Error Parsing JSON', err);
  }
}

yargs.command({

	command: 'add',
	describe: 'Adds New Note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true, // Required
			type: 'string'	
		},
		body: {
			describe: 'Note Body',
			demandOption: true,
			type: 'string'
		}
	},

	// Function for your command
	handler(argv) {
		for(let i=0; i<list.length; i++){
      let x=i;
      if(list[x].title == argv.title){
          console.log('Already Exixts!!');
          flag = 1;
          break;
        }
    }
    if(flag == 0){
      note ={title:`${argv.title}`,body:`${argv.body}`};
        list.push(note);
        list = JSON.stringify(list,null,2);
        fs.writeFile('./notes.json', list, err => {
          if (err) {
              console.log('Error writing file', err);
          } else {
              console.log('New Note Added!!');
          }
        });
    }
	}
})

yargs.parse() // To set above changes
