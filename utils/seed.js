const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { username, email, thoughtText, reactionBody } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // drop existing thoughts
    await Thought.deleteMany({});
    // drop existing users
    await User.deleteMany({});

    const reactions = [];
    let h = 0;
    for (let i = reactionBody.length - 1; i >= 0; i--){
        reactions.push({
            reactionBody: reactionBody[h],
            username: username[i] 
        });
        h++;
    }

    const thoughts = [];
    for (let j = 0; j < thoughtText.length; j++) {
        thoughts.push({
            thoughtText: thoughtText[j],
            username: username[j],
            reactions: [reactions[j]],
        })
    };

    const users = [];

    for (let k = 0; k < username.length; k++) {
        users.push({
            username: username[k], 
            email: email[k],
            thoughts: [thoughts[k]],
            friends: []
        })
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(thoughts);
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});