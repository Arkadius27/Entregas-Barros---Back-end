import { users } from "../data/mongo/Manager.mongo.js";

class usersService {
  constructor() {
    this.model = users;
  }
  create = async (data) => {
    try {
      const newUser = await this.model.create(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  };
  read = async ({ filter, sortAndPaginate }) => {
    try {
      const allUsers = await this.model.read({ filter, sortAndPaginate });
      return allUsers;
    } catch (error) {
      throw error;
    }
  };
  readOne = async (uid) => {
    try {
      const oneUser = await this.model.readOne(uid);
      return oneUser;
    } catch (error) {
      throw error;
    }
  };
  update = async (uid, data) => {
    try {
      const updatedUser = await this.model.update(uid, data);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (uid) => {
    try {
      const deletedUser = await this.model.destroy(uid);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  };
}

const service = new usersService();
export default service;