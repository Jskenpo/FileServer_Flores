const { Router } = require('express');
const router = Router();

const { getArreglosByCategory } = require('../controllers/index.controller');

//GET BY ID 
router.get('/arreglos/:id', getArreglosByCategory);

module.exports = router;