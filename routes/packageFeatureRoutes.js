
const express = require('express');
const router = express.Router();
const {
    createFeature,
    getFeatures,
    getFeatureById,
    updateFeature,
    deleteFeature
} = require('../controllers/packageFeatureController');

router.post('/', createFeature);
router.get('/', getFeatures);
router.get('/:id', getFeatureById);
router.put('/:id', updateFeature);
router.delete('/:id', deleteFeature);

module.exports = router;
