const { Router } = require('express');
const router = Router();

const { getArreglosByCategory, getArreglos } = require('../controllers/index.controller');

//GET ALL
router.get('/arreglos', getArreglos);

//GET BY ID 
router.get('/arreglos/:id', getArreglosByCategory);

module.exports = router;