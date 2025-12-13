const express = require("express");
const { addSweetItem, getAllSweets, updateSweetItem, deleteSweetItem, purchaseSweet, restockSweet } = require("../controllers/sweetController");
const verifyUserToken = require("../middleware/authMiddleware");
const checkAdminRole = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", verifyUserToken, getAllSweets);


router.post("/", verifyUserToken, checkAdminRole, addSweetItem);

router.put("/:id", verifyUserToken, checkAdminRole, updateSweetItem);

router.delete("/:id", verifyUserToken, checkAdminRole, deleteSweetItem);

router.post("/:id/purchase", verifyUserToken, purchaseSweet);


router.post("/:id/restock", verifyUserToken, checkAdminRole, restockSweet);




module.exports = router;

export {};
