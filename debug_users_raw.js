
const mongoose = require('mongoose');

// I can't run TS models in node script easily without ts-node.
// I'll use the raw mongo driver which is easier for a quick check script.

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function checkUsers() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.log('No MONGODB_URI');
        return;
    }
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(); // uses default db from uri
        const users = await db.collection('users').find({}).toArray();

        console.log('--- USERS DUMP (Masked) ---');
        users.forEach(u => {
            console.log(`Email: ${u.email}, OTP: '${u.otp}', Status: ${u.status}`);
        });
        console.log('---------------------------');
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

checkUsers();
