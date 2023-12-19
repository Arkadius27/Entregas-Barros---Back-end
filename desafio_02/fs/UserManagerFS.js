const fs = require('fs').promises;
const path = require('path');

class UserManager {
  static dataFile = path.join(__dirname, 'data', 'users.json');

  static async read() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(this.dataFile, JSON.stringify([], null, 2));
        return [];
      } else {
        throw error;
      }
    }
  }

  static async readOne(id) {
    const users = await this.read();
    return users.find(user => user.id === id);
  }

  static async create(data) {
    const users = await this.read();
    const user = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      ...data
    };
    users.push(user);
    await fs.writeFile(this.dataFile, JSON.stringify(users, null, 2));
    return user;
  }
}

// create() method
async function createUsers() {
  const usersData = [
    { name: 'User1', photo: "img/route1", email: 'user1@example.com' },
    { name: 'User2', photo: "img/route2", email: 'user2@example.com' },
    { name: 'User3', photo: "img/route3", email: 'user3@example.com' },
  ];

  for (const data of usersData) {
    const user = await UserManager.create(data);
    console.log('Created user:', user);
  }
}
createUsers().catch(console.error);

// read() method
async function readUsers() {
  const users = await UserManager.read();
  console.log('Users:', users);
}
readUsers().catch(console.error);

// readOne() method
async function readOneUser() {
  const user = await UserManager.readOne(3);
  console.log('User:', user);
}
readOneUser().catch(console.error);