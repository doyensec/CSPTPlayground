const express = require("express");
const router = express.Router();

class GadgetController {

  // An open redirect to leak access token
  static async openRedirect(req, res) {
    try {
      const { url } = req.query;
      if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
      }

      const urlScheme = new URL(url).protocol;
      if (urlScheme !== 'http:' && urlScheme !== 'https:') {
        return res.status(400).json({ error: 'Invalid URL' });
      }
      res.redirect(url);

    } catch (error) {
      res.status(400).json({ error: 'Invalid URL' });
    }
  }

  // a JSONP endoint to exploit CSPT in script tag

  static async jsonp(req, res) {
    const { callback } = req.query;
    if (!callback) {
      return res.status(400).json({ error: 'Missing callback parameter' });
    }

    const data = { message: 'Hello, world!' };
    const jsonpResponse = `${callback}(${JSON.stringify(data)})`;
    res.setHeader('Content-type', "text/plain");
    res.send(jsonpResponse);
  }
}

router.get('/open_redirect', GadgetController.openRedirect);
router.get('/jsonp', GadgetController.jsonp);

module.exports = router;