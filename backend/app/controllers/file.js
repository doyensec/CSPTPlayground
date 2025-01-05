const express = require("express");
const router = express.Router();
const Joi = require('joi');
var Files = require('../models/file');

const fileSchema = Joi.object({
    content: Joi.binary().required()
})

// Files can be used as a gadget to exploit CSPT
class FileController {
    static async createFile(req, res) {
        try {
            let validationError = fileSchema.validate(req.body).error;
            if (validationError) {
                return res.status(400).json({
                    status: 400,
                    message: `Invalid request.${validationError}`
                });
            }

            const file = new Files(req.body);
            await file.save();
            res.status(201).json(file);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    //TODO to test
    static async getRawFile(req, res) {
        try {
            const file = await Files.findById(req.params.id);
            if (!file) {
                return res.status(404).json();
            }
            
            res.setHeader('Content-disposition', 'attachment; filename=' + file._id);
            res.type("text/plain");
            res.send(file.content);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getFile(req, res) {
        try {
            const file = await Files.findById(req.params.id);
            if (!file) {
                return res.status(404).json();
            }
            res.json(file);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async updateFile(req, res) {
        let validationError = fileSchema.validate(req.body).error;
        if (validationError) {
            return res.status(400).json({
                status: 400,
                message: `Invalid request.${validationError}`
            });
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'content'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        try {
            const file = await Files.findById(req.params.id);
            if (!file) {
                return res.status(404).json();
            }

            updates.forEach((update) => (file[update] = req.body[update]));
            await file.save();
            res.json(file);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    static async deleteFile(req, res) {
        try {
            const file = await Files.findByIdAndDelete(req.params.id);
            if (!file) {
                return res.status(404).json();
            }
            res.json(file);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    static async getAllFiles(req, res) {
        try {
            const files = await Files.find();
            res.json(files);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}


// Routes
router.post('/files', FileController.createFile);
router.get('/files/:id', FileController.getFile);
router.get('/files/:id/raw', FileController.getRawFile);
router.put('/files/:id', FileController.updateFile);
router.get('/files', FileController.getAllFiles);
router.delete('/files/:id', FileController.deleteFile);

module.exports = router;