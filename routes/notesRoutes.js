const router = require('express').Router();
const fs = require(`fs`);
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const path = require(`path`);
const db = require(`../db/db.json`);

router.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text, } = req.body;

  console.log(req.length);
    // If all the required properties are present
    if (title && text ) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in saving note');
    }
  });


  router.delete('/:title',(req,res,next)=>{
    const noteId = req.params.title
    console.log(noteId);
  fs.readFile('./db/db.json', 'utf8', function(error, response){
    if (error) {
      console.log(error);
    }
    let notes = JSON.parse(response);
      res.json(notes.splice(noteId,1));
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), function(error){
      if (error) {
        console.log(error)
      }
      else {
        res.json(false);
      }
    });
  });    

});
module.exports = router;