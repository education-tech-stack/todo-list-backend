import bcrypt from 'bcrypt'

async function getHashedPassword() {
    const hashed = await bcrypt.hash('user2@123', 10);
    console.log('hashed', hashed);
}

getHashedPassword();
