const express = require("express");
const router = express.Router();
const fs = require('fs');
const { execFileSync } = require('child_process');
const tmp = require('tmp');

var Files = require('../models/file');

const { PDFDocument } = require('pdf-lib');
const mmm = require('mmmagic')
const Magic = mmm.Magic;

async function checkMimeType(form) {
    const isValid = (form.mimetype === 'application/pdf')
    if (!isValid) {
        throw new Error('mime-type: File is not a PDF : ' + form.mimetype);
    }

}

async function checkMMMagic(binaryFile) {
    // File must be a pdf
    var magic = new Magic(mmm.MAGIC_MIME_TYPE);

    // Promisify the magic.detect function using an arrow function to preserve context
    const detectAsync = (binaryFile) => {
        return new Promise((resolve, reject) => {
            magic.detect.call(magic, binaryFile, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    const result = await detectAsync(binaryFile);

    const isValid = (result === 'application/pdf')
    if (!isValid) {
        throw new Error('mmmagic: File is not a PDF : ' + result);
    }
}

async function checkPdfLib(binaryFile) {
    let pdfDoc = null
    try {
        pdfDoc = await PDFDocument.load(binaryFile);
    } catch (error) {
        throw new Error('pdflib: Not a valid PDF')
    }

    if (pdfDoc.getPageCount() == 0) {
        throw new Error('pdflib: PDF doesn\'t have a page');
    }
}

async function checkFileCommand(binaryFile) {
    //Write a temporary file
    const tmpobj = tmp.fileSync();
    fs.writeSync(tmpobj.fd, binaryFile);
    fs.closeSync(tmpobj.fd);

    // Exec file command
    output = execFileSync('file', ["-b", "--mime-type", tmpobj.name])

    const isValid = (output.toString() === 'application/pdf\n')
    if (!isValid) {
        throw new Error(`content - type: File is not a PDF : ${output}`);
    }
    tmpobj.removeCallback();

}

// Some common PDF bypasses to use PDF as a gadget
class FilePDFController {

    static async check_mime_type(req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error('No files were uploaded.');
            }

            const form = req.files.file;

            // Check content-type 
            await checkMimeType(form);

            const file = new Files({ content: form.data });
            await file.save();
            res.status(201).json({ "id": file._id });
        }
        catch (err) {
            res.status(400).json({ "message": err.message });
        }
    }
    static async check_mime_type_mmmagic(req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error('No files were uploaded.');
            }

            const form = req.files.file;

            // Check content-type
            await checkMimeType(form);

            // Check with mmagic library
            await checkMMMagic(form.data);

            const file = new Files({ content: form.data });
            await file.save();
            res.status(201).json({ "id": file._id });
        }
        catch (err) {
            res.status(400).json({ "message": err.message });
        }
    }

    static async check_mime_type_mmmagic_pdflib(req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error('No files were uploaded.');
            }

            const form = req.files.file;

            // Check content-type
            await checkMimeType(form);

            // Check with mmagic library
            await checkMMMagic(form.data);

            // Check with pdflib
            await checkPdfLib(form.data);

            const file = new Files({ content: form.data });
            await file.save();
            res.status(201).json({ "id": file._id });
        }
        catch (err) {
            res.status(400).json({ "message": err.message });
        }
    }

    static async check_mime_type_mmmagic_file_pdflib(req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error('No files were uploaded.');
            }

            const form = req.files.file;

            // Check content-type
            await checkMimeType(form);

            // Check with mmagic library
            await checkMMMagic(form.data);

            // Check with file command line
            await checkFileCommand(form.data);

            // Check with pdflib
            await checkPdfLib(form.data);

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
router.post('/files/pdf/check_mime_type', FilePDFController.check_mime_type);
router.post('/files/pdf/check_mime_type_mmmagic', FilePDFController.check_mime_type_mmmagic);
router.post('/files/pdf/check_mime_type_mmmagic_pdflib', FilePDFController.check_mime_type_mmmagic_pdflib);
router.post('/files/pdf/check_mime_type_mmmagic_file_pdflib', FilePDFController.check_mime_type_mmmagic_file_pdflib);

module.exports = router;