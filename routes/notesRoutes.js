const router = require('express').Router();
const fs = require(`fs`);
const path = require(`path`);

router.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db.json"));
});

router.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "db.json"), "utf8", function(error, response) {
        if (error) {
            console.log(error);
        }
        const newNote = req.body;
        const notes = JSON.parse(response);
        const noteId = notes.length + 1;
        const note = {
            id: noteId,
            title: newNote.title,
            text: newNote.text
        };
        newNote.push(note);
        res.json(note);
        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes, null, 2), function(err) {
            if (err) throw err;
        });
    });
});

module.exports = router;