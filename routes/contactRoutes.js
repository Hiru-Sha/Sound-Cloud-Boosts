const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');


router.post('/', contactController.createContact);
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.get('/email/:email', contactController.getContactByEmail);
router.put('/:id', contactController.updateContact);
router.put('/email/:email', contactController.updateContactByEmail);
router.delete('/:id', contactController.deleteContact);
router.delete('/email/:email', contactController.deleteContactByEmail);

module.exports = router;
