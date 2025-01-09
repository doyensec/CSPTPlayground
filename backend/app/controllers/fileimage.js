const express = require("express");
const router = express.Router();
const fs = require('fs');
const fileType = async () => await import('file-type');

var Files = require('../models/file');

const checkFileType = async (binary) => {
    const { fileTypeFromBuffer } = await fileType();

    const type = await fileTypeFromBuffer(binary);
    const result = type.mime;

    const isValid = result.startsWith('image/');
    if (!isValid) {
        throw new Error('file-type: File is not an image : ' + result);
    }
};

// Some common Image bypasses to use Image as a gadget
class FileImageController {

    static async check_file_type(req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error('No files were uploaded.');
            }

            const form = req.files.file;

            // Check content-type 
            await checkFileType(form.data);

            const file = new Files({ content: form.data });
            await file.save();
            res.status(201).json({ "id": file._id });
        }
        catch (err) {
            res.status(400).json({ "message": err.message });
        }
    }

}
// Routes
router.post('/files/image/check_file_type', FileImageController.check_file_type);

module.exports = router;