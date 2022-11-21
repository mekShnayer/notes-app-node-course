// function sayHello(name) {
//     console.log('hello ' + name);
// }

// sayHello('shani');
// const { notStrictEqual } = require('assert');
// // console.log(window);//window isnt defined in node.

// const fs = require('fs');

// fs.writeFileSync('notes.txt', 'my name is shani',)

// fs.appendFileSync('notes.txt', 'hi again');


//using an installed packege:
// const validator = require('validator')

const notes = require('./notes.js')
// console.log(getNotes())
/////////////
//challenge: Define and use a function in a new file

// create a new file called notes.js
// create getNotes function that returns "your notes..."
// export getNotes function
// from app.js, load in and call the function printing message to console

// console.log(validator.isEmail('andrew@example.com')) // valid email
// console.log(validator.isEmail('andrewexample.com'))// isnt a valid email
// console.log(validator.isURL('https://mead.io'))//valid
// console.log(validator.isURL('https://meadio'))//invalid
const chalk = require('chalk')
//  const string = chalk.inverse.green('Success! yay')
//  console.log(string)

//  //if i want to kill the nodemon actions just run cntr c
//  //if i want to start it i run nodemon app.js

//  console.log(process.argv[2])
const yargs = require('yargs')
const command = process.argv[2]

// if (command === 'add') {
// console.log('adding note..')
// }
// else if (command === 'remove'){
//     console.log('removing note')
// }

// console.log(process.argv)


yargs.version('1.1.0')//costomize yargs version

//create add command: (object)
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, //this is false by default. if we set this to true we must provide the title
            type: 'string'// expecting strings only
        },
        body: {
            describe: 'notes body',
            demandOption: true,
            type: 'string',

        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
        const noteTitle = chalk.green.bold(`title: ${argv.title} `)
        const noteBody = chalk.inverse.green(`body: ${argv.body}`)
        console.log(noteTitle, noteBody)

    }
})

// create remove command:
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, //this is false by default. if we set this to true we must provide the title
            type: 'string'// expecting strings only
        }
    },
    handler(argv) {
        console.log('removing the note')
        notes.removeNote(argv.title)
    }
})

// create read command:
yargs.command({
    command: 'read',
    describe: 'read the note',
    handler() {
        console.log('reading the note')
    }
})

// create list command:
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler() {
        console.log('listing all notes')
        notes.listNotes()
        // notes.addNote(argv.title, argv.body)
        // const noteTitle = chalk.green.bold(`title: ${argv.title} `)
        // const noteBody = chalk.inverse.green(`body: ${argv.body}`)
        // console.log(noteTitle, noteBody)
    }
})
//add, remove, read, list (notes)
// console.log(yargs.argv) 
yargs.parse() // 