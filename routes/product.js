const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.index);
router.get("/new", productController.renderNewForm);
router.post("/", productController.createProduct);
router.get("/:id", productController.showProduct);
router.get("/:id/edit", productController.renderEditForm);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
