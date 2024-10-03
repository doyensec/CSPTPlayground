const express = require('express');
const router = express.Router();

// Sample endpoints for the JSONP challenge
class StaticController {
    static async translation_en(req, res) {
        const script = "message='This is an app to manage notes.Multiple CSPTs can be exploited in this app.';\
    title='CSPT Application';\
    document.getElementById('title').innerText = title;\
     document.getElementById('description').innerText = message;";
        res.setHeader('Content-type', "application/javascript");
        res.status(200).send(script);
    };

    static async translation_fr(req, res) {
        const script = "message='Cette app gère des notes. Plusieurs CSPTs sont exploitables.';\
    title='CSPT Application';\
     document.getElementById('title').innerText = title;\
     document.getElementById('description').innerText = message;";
        res.setHeader('Content-type', "application/javascript");
        res.status(200).send(script);
    }
}

router.get('/translation/en.js', StaticController.translation_en);
router.get('/translation/fr.js', StaticController.translation_fr);

module.exports = router;