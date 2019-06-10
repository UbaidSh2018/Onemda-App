// The User schema.
import User from "../../../models/User";
const bcrypt = require('bcrypt');
import { Role } from '../../../models/User'

export async function isUserWithRole(user, role) {
  try {
    if (!user) {
      throw Error('No user is authenticated')
    }
    const retrievedUser = await User.findById(user.id)
    if (retrievedUser.roles.includes(role)) {
      return true
    } else {
      return false
    }
  } catch(e) {
    throw Error(e)
  }
}

export default {
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    async participants (root, args, { user }) {
      try {
        const isUserAdmin = await isUserWithRole(user, Role.Admin)
        const isUserTrainer = await isUserWithRole(user, Role.Trainer)
        if (!isUserAdmin && !isUserTrainer) {
          throw Error('You must be a logged in admin or trainer to query participants')
        }
  
        const users =  await new Promise((resolve, reject) => {
          User.find({})
            .populate()
            .exec((err, res) => {
              err ? reject(err) : resolve(res);
            });
        });
        return users.filter(u => {
          return u.roles.includes(Role.Participant)
        })
      } catch(e) {
        throw Error(e)
      }
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    async createUser (root, { username, name, email, password, roles, stream }, { user }) {
      const isUserAdmin = await isUserWithRole(user, Role.Admin)
      if (!isUserAdmin) {
        throw Error('You must be a logged in admin to create a user')
      }

      const encryptedPassword = bcrypt.hashSync(password, 10)

      const newUser = new User({
        username,
        name,
        email,
        password: encryptedPassword,
        roles,
        stream
      });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    async editUser (root, { id, name, email, password, roles }, { user }) {
      const isUserAdmin = await isUserWithRole(user, Role.Admin)
      if (!isUserAdmin) {
        throw Error('You must be a logged in admin to edit a user')
      }

      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ id }, { $set: { name, email, password, roles } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
