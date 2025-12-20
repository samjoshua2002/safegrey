
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function checkUserOtp() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI not found");
        return;
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('test'); // default db name usually unless specified in URI
        const users = database.collection('users');

        // Find a user with an OTP set
        // Note: Use projection to verify the field exists
        const user = await users.findOne({ otp: { $exists: true } });

        if (user) {
            console.log('Found user with OTP:', user.email);
            console.log('OTP:', user.otp);
            console.log('OTP Type:', typeof user.otp);
            console.log('Status:', user.status);
        } else {
            console.log('No user with OTP found.');
        }
    } finally {
        await client.close();
    }
}

checkUserOtp();
