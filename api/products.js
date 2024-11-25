const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const includeUser = req.user ? { where: { customerId: req.user.id } } : false;
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: +id },
      include: { orders: includeUser },
    });
    res.json(product);
  } catch (e) {
    next(e);
  }
});
