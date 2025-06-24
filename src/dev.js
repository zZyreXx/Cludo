/**
 * This file adds a developer badge to a user
 * Use only if you want to manually flag a user as a developer
 */

const chalk = require('chalk');
const mongoose = require('mongoose');
require('dotenv').config();

// Exit if no member ID is provided
const memberId = process.argv[2];
if (!memberId) {
    console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`Developer Badge`), chalk.white(`>>`), chalk.red(`Please provide a member ID!`));
    process.exit(1);
}

// Database Model
const model = require('./database/models/badge.js');

// Mongo Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_TOKEN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(chalk.green(`[SUCCESS]`), chalk.white(`>>`), chalk.green(`Developer Badge`), chalk.white(`>>`), chalk.green(`Connected to the database!`));
    updateBadge();
}).catch((err) => {
    console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`Developer Badge`), chalk.white(`>>`), chalk.red(`Failed to connect to the database!`));
    console.error(err);
    process.exit(1);
});

// Main logic to add/update the badge
async function updateBadge() {
    try {
        const data = await model.findOne({ User: memberId });

        if (!data) {
            // Create a new document
            const newData = new model({
                User: memberId,
                FLAGS: ["DEVELOPER"]
            });
            await newData.save();
            console.log(chalk.white(`>>`), chalk.green(`Developer Badge has been added to the user!`));
        } else {
            // Prevent duplicate flag
            if (!data.FLAGS.includes("DEVELOPER")) {
                data.FLAGS.push("DEVELOPER");
                await data.save();
                console.log(chalk.white(`>>`), chalk.green(`Developer Badge has been added to the user!`));
            } else {
                console.log(chalk.white(`>>`), chalk.yellow(`User already has the Developer badge.`));
            }
        }
    } catch (err) {
        console.error(chalk.red(`[ERROR]`), chalk.white(`>>`), err);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}
