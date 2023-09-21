const express = require("express");
const { createOrder } = require("./controllers/order");
const { addAddress, getAddresses,updateaddress,deleteaddress } = require("./controllers/address");
const {
  saveProduct,
  searchProducts,
  getProductCategories,
  getProductById,
  updateProductDetails,
  deleteProduct,
  getProductByIds
} = require("./controllers/product");
const router = express.Router();
const { signUp, signIn } = require("./controllers/auth");
const admin = require("./middleware/admin");
const auth = require("./middleware/auth");
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//Auth
router.post("/api/v1/users", signUp);
router.post("/api/v1/auth", signIn);

//Address
router.post("/api/v1/addresses", auth, addAddress);
router.get("/api/v1/addresses", auth, getAddresses);
router.delete("/api/v1/addresses/:id", auth, deleteaddress);
router.put("/api/v1/addresses/:id", auth, updateaddress);

//Product
router.post("/api/v1/products",upload.single('attach'),saveProduct);
router.get("/api/v1/products", searchProducts);
router.get("/api/v1/products/categories", getProductCategories);
router.get("/api/v1/products/:id", getProductById);
router.put("/api/v1/products/:id",upload.single('attach'), updateProductDetails);
router.delete("/api/v1/products/:id", deleteProduct);

//Order
router.post("/api/v1/orders", auth, createOrder);

// get product by id
router.post("/api/v1/getproductByIds", getProductByIds);


module.exports = router;
