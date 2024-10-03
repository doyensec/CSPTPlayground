const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.string(),
    _id: Joi.string(),
    title: Joi.string(),
    description: Joi.string()
})

// Some sink endpoints to test CSPT exploitation and bypasses
class SinkController {

    // This endpoint will accept extra parameters in the request and promote the user to admin
    static async laxInExtraParamPromote(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send();
            }

            user['role'] = 'admin';

            await user.save();
            res.send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // This endpoint will accept query parameters (instead of body parameters) and promote the user to admin
    static async bodyOrQueryPromote(req, res) {
        try {
            let validationError = idSchema.validate(req.body).error;
            if (validationError) {
                return res.status(400).json({
                    status: 400,
                    message: `Invalid request.${validationError}`
                });
            }

            //  Qurey parameter chosen over body parameter
            let id = req.query.id ? req.query.id : req.body.id;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send();
            }

            user['role'] = 'admin';

            await user.save();
            res.send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // This endpoint will demote the user to member
    static async Demote(req, res) {
        try {

            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send();
            }

            user['role'] = 'member';

            await user.save();
            res.send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }

}

router.post('/sink/promote/lax_in_extra_param_promote/:id', isAdmin, SinkController.laxInExtraParamPromote);
router.put('/sink/promote/body_or_query', isAdmin, SinkController.bodyOrQueryPromote);
router.delete('/sink/demote/:id', isAdmin, SinkController.Demote);

module.exports = router;