const { Register, GetOne, DeleteUser, UpdateUser, Login, IsAuth, GetAll } = require("../Controllers/user");
const express= require('express');

const router = express.Router();

router.post('/Register', Register);
router.get('/GetOne/:id',GetOne);
router.get('/GetAll', GetAll)
router.delete('/Delete/:id',DeleteUser);
router.put('/UpdateUser/:id',UpdateUser);
router.post('/Login' , Login);
router.get('/current' , IsAuth)

module.exports = router;