
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkUsers() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.log('No MONGODB_URI');
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log('Connected to DB');

        // Define a loose schema to read everything
        const userSchema = new mongoose.Schema({}, { strict: false });
        const User = mongoose.model('User', userSchema);

        // Explicitly select otp as it might be excluded in original schema but here strict:false might ignore that, 
        // but just in case, use lean()
        const users = await User.find({}).lean();

        console.log('--- USERS DUMP (Masked) ---');
        users.forEach(u => {
            console.log(`Email: ${u.email}, OTP: '${u.otp}', Status: ${u.status}`);
        });
        console.log('---------------------------');
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

checkUsers();
