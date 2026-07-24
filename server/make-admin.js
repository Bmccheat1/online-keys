const mongoose = require('mongoose');
const path = require('path');

const serverPath = 'C:\\Users\\PC\\AppData\\Local\\Temp\\opencode\\keys-selling-website\\server';

// Load env first
require(path.join(serverPath, 'config', 'env'));
const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const db = mongoose.connection.db;
        const users = db.collection('users');
        
        // Check existing users
        const count = await users.countDocuments();
        console.log('Total users:', count);
        
        if (count === 0) {
            console.log('No user found. Please register first at http://localhost:5173/register');
        } else {
            // Show all users
            const allUsers = await users.find({}).project({ name: 1, email: 1, role: 1 }).toArray();
            console.log('Users:');
            allUsers.forEach(u => console.log('  -', u.name, '|', u.email, '| Role:', u.role));
            
            // Update first non-admin user to admin
            const firstNonAdmin = await users.findOne({ role: { $ne: 'admin' } });
            if (firstNonAdmin) {
                await users.updateOne(
                    { _id: firstNonAdmin._id },
                    { $set: { role: 'admin' } }
                );
                console.log('\n✅ Updated ' + firstNonAdmin.email + ' to ADMIN!');
            } else {
                console.log('\nAll users are already admins.');
            }
        }
        
        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err.message);
    }
    process.exit(0);
}
main();
