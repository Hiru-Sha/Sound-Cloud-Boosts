const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const {
  createSystemInfo,
  getSystemInfos,
  getSystemInfoById,
  updateSystemInfo,
  deleteSystemInfo
} = require('../controllers/systemInfoController');

router.post('/', upload.single('image'), createSystemInfo);           
router.get('/', getSystemInfos);               
router.get('/:id', getSystemInfoById);          
router.put('/:id', upload.single('image'), updateSystemInfo);          
router.delete('/:id', deleteSystemInfo);        

module.exports = router;
