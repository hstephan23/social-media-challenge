const router = require('express').Router();
const { Thought, User } = require('../../models');

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

// route to create a new thought
router.post('/', async (req, res) => {
    try {
        const addThought = await Thought.create(req.body);
        // {
        //     "thoughtText": "Here's a cool thought...",
        //     "username": "lernantino",
        //     "userId": "5edff358a0fcb779aa7b118b"
        // }
        
        const updateUser = await User.findOneAndUpdate( 
            { _id: req.body.userId },
            { $push: {thoughts: addThought} },
            { new: true }
        )

        res.status(200).json({addThought, updateUser});
    } catch (err) {
        res.status(400).json(err);
    }
})

// route to update a thought by it's id
router.put('/:thoughtId', async (req, res) => {
    try {
        const updateThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.status(200).json(updateThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// route to delete based on thoughtId
router.delete('/:thoughtId', async (req, res) => {
    try {
        const removeThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        res.status(200).json(removeThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const addReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: {reactions: req.body } },
            { runValidators: true, new: true}
        );
        res.status(200).json(addReaction);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const reactionId = req.params.reactionId;

        const thought = await Thought.findById(thoughtId);
        thought.reactions = thought.reactions.filter(reaction => reaction.reactionId !== reactionId);
        
        const updatedThought = await thought.save();
        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(400).json(err);
    }
})
module.exports = router;