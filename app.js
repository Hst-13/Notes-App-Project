const http = require('http');
const fs = require('fs');
const inp = require('readline');
const r1 = inp.createInterface({
  input : process.stdin,
  output : process.stdout
});

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

r1.question('Command : ', (cmd)=>{
  jsonUpdater();

  switch (cmd){

    case 'add':
      r1.question('Title : ', (title)=>{
        for(let i=0; i<list.length; i++){
          let x=i;
          if(list[x].title == title){
              console.log('Already Exixts!!');
              flag = 1;
              break;
            }
        }
        if(flag == 0){
          r1.question('Note : ', (body)=>{
            note ={title:`${title}`,body:`${body}`};
            list.push(note);
            list = JSON.stringify(list,null,2);
            fs.writeFile('./notes.json', list, err => {
              if (err) {
                  console.log('Error writing file', err);
              } else {
                  console.log('New Note Added!!');
              }
            });
          });
        }
      });
    break;

    case 'remove':
      r1.question("Title : ", (title)=>{
        for(let i=0; i<list.length; i++){
          let x=i;
          if(list[x].title == title){
            if(x==0){
              list.splice(x,x+1);
              list = JSON.stringify(list,null,2);
            }
            else{
              list.splice(x,x);
              list = JSON.stringify(list,null,2);
            }
          fs.writeFile('./notes.json', list, err => {
            if (err) {
                console.log('Error writing file', err);
              }
            else
            {
              console.log('Found and Deleted!!');
              flag = 1;
            }
          });
          break;
        }
      }
      if(flag == 0)
      {
      console.log('Not Found!!');
      }
    });
    break;

    case 'list':
      console.log('Your Notes :');
      for(let i=0; i<list.length; i++){
        let x=i;
        console.log(list[x].title);
      }
    break;

    case 'read':
      r1.question('Title : ', (title)=>{
        for(let i=0; i<list.length; i++){
          let x=i;
          if(list[x].title == title){
            console.log(`Note : ${list[x].body}\n`);
            flag = 1;
            break;
          }
        }
        if(flag != 1){
          console.log('Not Found!!');
        }
      });
    break;

    default :
    console.log("Invalid Command!!");
  }
});