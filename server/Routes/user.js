const { Register, GetOne, DeleteUser, UpdateUser, Login, GetAll, Current } = require("../Controllers/user");
const express= require('express');
const isAuth = require("../middleware/isAuth");
const  isAdmin  = require("../middleware/isAdmin");
const upload = require("../utils/multer")
const router = express.Router();

router.post('/Register',upload.single("image"), Register);
router.post('/Login' , Login);
router.get('/current' ,isAuth, Current )
router.delete('/Delete/:id',isAuth, isAdmin, DeleteUser);
router.put('/UpdateUser/:id',isAuth,isAdmin, UpdateUser);
router.get('/GetOne/:id',GetOne);
router.get('/GetAll', GetAll)

module.exports = router;