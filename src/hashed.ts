import bcrypt from 'bcrypt'

async function getHashedPassword() {
    const hashed = await bcrypt.hash('', 10)
    console.log('hashed', hashed);
}

getHashedPassword();
