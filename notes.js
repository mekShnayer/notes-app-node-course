const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return "your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(note => note.title === title)
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title, body: body
        })

        saveNotes(notes)
        console.log('new note added!')
    } else {
        console.log('note title taken')
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}
const removeNote = (title) => {
    console.log(title)
    const notes = loadNotes()
    const filterNotes = notes.filter(note => note.title !== title)
    if (filterNotes.length === notes.length) {
        const message = chalk.red.inverse('No note found')
        return console.log(message)
    } else {
        saveNotes(filterNotes)
        const message = chalk.green.inverse('note removed, remaining notes: ')
        console.log(message, filterNotes)
    }


}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}