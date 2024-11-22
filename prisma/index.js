const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async register(username, password) {
        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: username,
          password: hash,
        });
        return user;
      },
      async login(username, password) {
        try {
          const customer = await prisma.user.findUniqueOrThrow({
            where: { username },
          });
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) throw Error(`Woah back up, BUddy.`);
          return customer;
        } catch (e) {
          next(e);
        }
      },
    },
  },
});
module.exports = prisma;
