const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')

const saltRounds = 10;

async function createUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword
    }
  });

  return newUser;
}

async function verifyUserPassword(email, password) {
  const user = await PrismaClient.user.findUnique({
    where: { email: email }
  });

  if (user && await bcrypt.compare(password, user.password)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  createUser,
  verifyUserPassword
};
