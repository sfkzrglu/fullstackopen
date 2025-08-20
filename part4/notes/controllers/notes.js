const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).end();
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

notesRouter.put("/:id", async (request, response, next) => {
  const { content, important } = request.body;
  if (!content) {
    return response.status(400);
  }

  const foundNote = await Note.findById(request.params.id);
  if (foundNote) {
    foundNote.content = content;
    foundNote.important = important;
    const savedNote = await foundNote.save();
    return response.json(savedNote);
  } else {
    return response.status(404).end();
  }
});

module.exports = notesRouter;
