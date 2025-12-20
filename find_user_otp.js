
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Try loading env vars manually
const envConfigLocal = dotenv.parse(fs.readFileSync('.env.local'));
const envConfig = fs.existsSync('.env') ? dotenv.parse(fs.readFileSync('.env')) : {};

const uri = envConfigLocal.MONGODB_URI || envConfigLocal.MONGODB_URL || envConfig.MONGODB_URI || envConfig.MONGODB_URL || process.env.MONGODB_URI;

async function findUserByOtp() {
    if (!uri) {
        console.log("No MONGODB_URI found");
        return;
    }

    console.log("Using URI starting with:", uri.substring(0, 15) + "...");

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db();
        const user = await db.collection('users').findOne({ otp: "821812" });

        if (user) {
            console.log(`FOUND_EMAIL: ${user.email}`);
        } else {
            console.log("User with OTP 821812 not found.");
            const allUsers = await db.collection('users').find({ otp: { $exists: true } }).toArray();
            console.log("Other OTPs found:", allUsers.map(u => `${u.email}:${u.otp}`));
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

findUserByOtp();
