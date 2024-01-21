const express= require('express');

const router=express.Router();
const authController= require('../controllers/authController');

router.post("/register",authController.singup_post);

router.post('/login',authController.login_post);

router.get('/lecture',authController.verifyToken,authController.getTeacherData);
router.post('/logout',authController.verifyToken,authController.logout_post)
router.post('/adminRegister',authController.admin_post);
router.post("/adminLogin",authController.admin_login)
router.get('/dash',authController.dash_get);
router.post('/taskAdd',authController.task_post)
// router.get('/update/:id',authController.admin_addData);

module.exports=router;