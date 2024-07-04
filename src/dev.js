/*
* This script adds a developer badge to a user 
* Only use this if you want to add a badge to a user
* If someone tells you to use this to add their id, they are lying 
* 
* @string member - The member you want to add the badge to
*/

const chalk = require('chalk');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const model = require('./database/models/badge.js');

// Load environment variables
dotenv.config();

// Check if member ID is provided as argument
if (!process.argv[2]) {
    console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`Developer Badge`), chalk.white(`>>`), chalk.red(`Please provide a member id!`));
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_TOKEN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false // Ensure compatibility with Mongoose updates
}).then(async () => {
    console.log(chalk.green(`[SUCCESS]`), chalk.white(`>>`), chalk.green(`Developer Badge`), chalk.white(`>>`), chalk.green(`Connected to the database!`));

    try {
        // Find the user in the database
        let data = await model.findOne({ User: process.argv[2] });

        if (!data) {
            // User not found, create a new document
            const newData = new model({
                User: process.argv[2],
                FLAGS: ["DEVELOPER"]
            });

            await newData.save();
            console.log(chalk.green(`[SUCCESS]`), chalk.white(`>>`), chalk.green(`Developer Badge`), chalk.white(`>>`), chalk.green(`Badge added to user!`));
        } else {
            // User found, update the document
            data.FLAGS.push("DEVELOPER");
            await data.save();
            console.log(chalk.green(`[SUCCESS]`), chalk.white(`>>`), chalk.green(`Developer Badge`), chalk.white(`>>`), chalk.green(`Badge added to user!`));
        }

        // Close the database connection
        mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`Developer Badge`), chalk.white(`>>`), chalk.red(`Error:`), err);
        mongoose.connection.close();
        process.exit(1);
    }
}).catch((err) => {
    console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`Developer Badge`), chalk.white(`>>`), chalk.red(`Failed to connect to the database!`), err);
    process.exit(1);
});
