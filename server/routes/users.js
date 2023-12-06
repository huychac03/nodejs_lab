const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// create, find, update, delete
router.get('/', userController.view);

router.get('/dishDetails', userController.dishDetails);

router.get('/search', userController.searchMain);

router.post('/searchByOrigin', userController.searchByOrigin);

router.post('/searchByCategory', userController.searchByCategory);

router.post('/searchByName', userController.searchByName);

router.get('/ingredientDetails', userController.ingredientDetails);



module.exports = router;
