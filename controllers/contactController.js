const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Create Contact
const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
        status: 'unread',
      },
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact message.' });
  }
};

// Get All Contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
};

// Get Contact by ID
const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(id) },
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact.' });
  }
};

// Get Contact by Email
const getContactByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const contact = await prisma.contact.findMany({
      where: { email },
    });

    if (!contact || contact.length === 0) {
      return res.status(404).json({ error: 'No contacts found for this email.' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact by email.' });
  }
};

// Update Contact by ID
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, subject, message, status } = req.body;

  try {
    const updated = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: { name, email, subject, message, status },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact.' });
  }
};

// Update Contact by Email
const updateContactByEmail = async (req, res) => {
  const { email } = req.params;
  const { name, subject, message, status } = req.body;

  try {
    const updated = await prisma.contact.updateMany({
      where: { email },
      data: { name, subject, message, status },
    });

    res.status(200).json({ message: updated.count + " contact(s) updated." });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact by email.' });
  }
};

// Soft Delete by ID
const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.contact.update({
      where: { id: parseInt(id) },
      data: { status: 'deleted' },
    });

    res.status(200).json({ message: 'Contact soft deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact.' });
  }
};

// Soft Delete Contact by Email
const deleteContactByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const deleted = await prisma.contact.updateMany({
      where: { email },
      data: { status: 'deleted' },
    });

    res.status(200).json({ message: deleted.count + " contact(s) soft deleted." });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact by email.' });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactByEmail,
  updateContactByEmail,
  deleteContactByEmail,
};
