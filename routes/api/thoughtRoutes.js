const router = require('express').Router();
const { Thought } = require('../../models');

// route to get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtsData = await Thought.find();
        res.status(200).json(thoughtsData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// route to get a single thought by id
router.get('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;