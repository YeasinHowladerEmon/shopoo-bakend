import express from "express";

const router = express.Router();


//post new order
router.post("/create-order");

//get all orders
router.get("/all-orders");// admin only access and order owen user we can use auth guard

router.patch("/all-orders");// admin only access we can use auth guard 


// details order
router.get("/:id"); // admin only access and order owen user


// this route using order delete
router.delete('/:id',) //admin only access and order owen user

export const OrdersRoutes = router;