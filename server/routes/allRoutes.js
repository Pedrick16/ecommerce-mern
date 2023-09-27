const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser,getProfile,logoutUser } = require('../controllers/authControler')
const {getAllProducts, AddProduct, getProduct, getActiveproducts, EditProduct, UpdateProduct, DeleteProduct } = require('../controllers/productController')



router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', getProfile)


//product routes
router.get('/get-active-products', getActiveproducts);
router.get('/all-products', getAllProducts)
router.post('/add-product', AddProduct)
router.get('/get-product/:id', getProduct);
router.get('/edit-product/:id', EditProduct);
router.put('/update-product/:id', UpdateProduct);
router.delete('/delete-product/:id', DeleteProduct);




module.exports = router; 