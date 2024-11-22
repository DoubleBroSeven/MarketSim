const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");
const generateRandomInt = (high, low) => {
  const number = Math.floor(Math.random() * high) + low;
  return number;
};
const seed = async (numProducts = 20) => {
  const products = Array.from({ length: numProducts }, () => ({
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: generateRandomInt(2000, 10),
  }));
  await prisma.product.createMany({ data: products });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
