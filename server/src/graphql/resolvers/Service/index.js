import Service from "../../../models/Service";
import { isUserWithRole } from "../User/index"

export default {
  Query: {
    async services (root, args, { user }) {
      return new Promise((resolve, reject) => {
        Service.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
  Mutation: {
    async createService (root, { name }, { user }) {
      const isUserAdmin = await isUserWithRole(user, Role.Admin)
      if (!isUserAdmin) {
        throw Error('You must be a logged in admin to create a user')
      }

      const newService = new Service({ name });

      return new Promise((resolve, reject) => {
        newService.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};