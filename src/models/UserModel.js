export class User {
  static async all() {
    try {
      // return all without password
      return users.map((user) => {
        const { password, ...rest } = user;
        return rest;
      });
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    try {
      const rs = users.find((user) => user.id === id);
      if (!rs) {
        throw new Error("User not found");
      }
      const { password, ...rest } = rs;
      return rest;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const rs = users.find((user) => user.email === email);
      if (!rs) {
        throw { status: 404, message: "User not found" };
      }

      return rs;
    } catch (error) {
      throw error;
    }
  }

  static async create(user) {
    try {
      user.id = users[users.length - 1].id + 1 || 1;
      users.push(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, user) {
    try {
      const index = users.findIndex((user) => user.id === id);
      users[index] = user;
      return user;
    } catch (error) {
      throw error;
    }
  }

  static delete(id) {
    try {
      const index = users.findIndex((user) => user.id === id);
      users.splice(index, 1);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const users = [
  {
    id: 1,
    email: "admin1@example.com",
    password: "123456",
    name: "John",
    lastname: "Doe",
    role: "admin",
  },
  {
    id: 2,
    email: "user1@example.com",
    password: "123456",
    name: "Jane",
    lastname: "Smith",
    role: "user",
  },
  {
    id: 3,
    email: "user2@example.com",
    password: "123456",
    name: "Robert",
    lastname: "Johnson",
    role: "user",
  },
  {
    id: 4,
    email: "user3@example.com",
    password: "123456",
    name: "Emily",
    lastname: "Williams",
    role: "user",
  },
  {
    id: 5,
    email: "user4@example.com",
    password: "123456",
    name: "Michael",
    lastname: "Brown",
    role: "user",
  },
  {
    id: 6,
    email: "admin2@example.com",
    password: "123456",
    name: "Jessica",
    lastname: "Davis",
    role: "admin",
  },
  {
    id: 7,
    email: "user5@example.com",
    password: "123456",
    name: "William",
    lastname: "Wilson",
    role: "user",
  },
  {
    id: 8,
    email: "user6@example.com",
    password: "123456",
    name: "Ashley",
    lastname: "Garcia",
    role: "user",
  },
  {
    id: 9,
    email: "user7@example.com",
    password: "123456",
    name: "David",
    lastname: "Rodriguez",
    role: "user",
  },
  {
    id: 10,
    email: "user8@example.com",
    password: "123456",
    name: "Sarah",
    lastname: "Martinez",
    role: "user",
  },
];
