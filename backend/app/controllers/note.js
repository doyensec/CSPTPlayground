const express = require("express");
const router = express.Router();
const Notes = require('../models/note');
const Joi = require('joi');

const noteSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string()
})

// Note is just an entity with a title and a description
class NoteController {

  // Create a new note
  static async addNote(req, res) {
    try {
      let validationError = noteSchema.validate(req.body).error;
      if (validationError) {
        return res.status(400).json({
          status: 400,
          message: `Invalid request.${validationError}`
        });
      }

      const note = new Notes(req.body);
      const data = await note.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Retrieve all notes
  static async getAllNotes(req, res) {
    try {
      const data = await Notes.find({}).exec();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // Retrieve the first note
  static async getFirstNote(req, res) {
    try {
      const data = await Notes.findOne({}).exec();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // Retrieve a note by ID
  static async getNoteById(req, res) {
    try {
      const data = await Notes.findOne({ _id: req.params.id }).exec();
      if (!data) {
        return res.status(404).json().end();
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // Update a note by ID
  static async updateNoteById(req, res) {
    try {
      let validationError = noteSchema.validate(req.body).error;
      if (validationError) {
        return res.status(400).json({
          status: 400,
          message: `Invalid request.${validationError}`
        });
      }

      const data = await Notes.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { title: req.body.title, description: req.body.description } },
        { new: true }
      ).exec();
      if (!data) {
        return res.status(404).json().end();
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // Delete a note by ID
  static async deleteNoteById(req, res) {
    try {
      const data = await Notes.deleteOne({ _id: req.params.id }).exec();
      if (data.deletedCount === 0) {
        return res.status(404).json();
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // This function is not implemented but used for demonstration purposes
  static async updateNoteByIdLastSeen(req, res) {
    res.status(200).json("OK");
  }

}

router.get('/notes', NoteController.getAllNotes);
router.get('/notes/:id', NoteController.getNoteById);
router.get('/first_note', NoteController.getFirstNote);
router.post('/notes/:id/seen', NoteController.updateNoteByIdLastSeen);

//Only admin can edit notes
router.post('/notes', isAdmin, NoteController.addNote);
router.put('/notes/:id', isAdmin, NoteController.updateNoteById);
router.delete('/notes/:id', isAdmin, NoteController.deleteNoteById);

module.exports = router;

