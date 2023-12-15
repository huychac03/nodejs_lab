const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');


// create, find, update, delete
router.get('/', menuController.view);

router.get('/dishDetails', menuController.dishDetails);

router.get('/search', menuController.searchMain);

router.post('/searchByOrigin', menuController.searchByOrigin);

router.post('/searchByCategory', menuController.searchByCategory);

router.post('/searchByName', menuController.searchByName);

router.get('/ingredientDetails', menuController.ingredientDetails);



module.exports = router;
