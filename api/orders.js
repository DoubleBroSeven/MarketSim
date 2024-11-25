const express = require("express");
const router = express.Router();
module.exports = router;

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: req.user.id },
    });
    res.json(orders);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { date, note, itemIds } = req.body;
  try {
    const products = itemIds.map((id) => ({ id }));
    const order = await prisma.order.create({
      data: {
        date,
        note,
        customerId: req.user.id,
        items: { connect: products },
      },
      include: {
        items: true,
      },
    });
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: +id },
      include: {
        items: true,
      },
    });
    if (req.user.id !== order.customerId) {
      next({ status: 403, message: "Access Forbidden" });
    }
    res.json(order);
  } catch (e) {
    next(e);
  }
});
