const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const usersData = await User.find();
        res.status(200).json(usersData);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/:userId', async (req, res) => {
    try{
        const userData = await User.findOne({ _id: req.params.userId}).select('-__v');
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;