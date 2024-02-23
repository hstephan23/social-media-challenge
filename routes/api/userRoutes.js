const router = require('express').Router();
const { User } = require('../../models');

// create a get route to show all users
router.get('/', async (req, res) => {
    try {
        const usersData = await User.find();
        res.status(200).json(usersData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// create a get route to show a user by specific id
router.get('/:userId', async (req, res) => {
    try{
        const userData = await User.findOne({ _id: req.params.userId}).select('-__v');
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// add a user, through req.body
router.post('/', async (req, res) => {
    try {
        // { "username": "lernantino", "email": "lernantino@gmail.com"}
        const createUser = await User.create(req.body);
        res.status(200).json(createUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update user by userId
router.put('/:userId', async (req, res) => {
    try {
        const userUpdate = await User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $set: req.body },
            { runValidators: true, new: true });
        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete route by userId
router.delete('/:userId', async (req, res) => {
    try {
        const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });
        res.status(200).json(deleteUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// add friend through UserId and friendId
router.put('/:userId/friends/:friendId', async (req, res) => {
    try {
        const addFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true}
            );
        res.status(200).json(addFriend);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete friend through userId and friendId
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const removeFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true}
        );
        res.status(200).json(removeFriend);
    } catch (err) {
        res.status(400).json(err);
    }
});
module.exports = router;