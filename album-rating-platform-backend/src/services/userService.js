const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const saltRounds = 10;

async function createUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword
    }
  });

  return newUser;
}

async function verifyUserPassword(email, password) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (user && await bcrypt.compare(password, user.password)) {
    return true;
  } else {
    return false;
  }
}

async function updateUser(email, newUsername, newEmail, newPassword) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const updatedData = {
    username: newUsername || user.username,
    email: newEmail || user.email,
  };

  if (newPassword) {
    updatedData.password = await bcrypt.hash(newPassword, saltRounds);
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: updatedData
  });

  return updatedUser;
}

async function getUserProfile(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        username: true,
        email: true
        // outros campos que você queira retornar
      }
    });
    return user;
  } catch (error) {
    throw new Error('Error fetching user profile');
  }
}

module.exports = {
  createUser,
  verifyUserPassword,
  updateUser,
  getUserProfile
};
