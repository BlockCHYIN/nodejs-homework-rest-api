const uniqid = require("uniqid");
const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.resolve('./contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find(({ id }) => id === contactId);
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const newData = data.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newData), 'utf8');
  return data.length !== newData.length;
};

const addContact = async ({name, email, phone}) => {
  const newContact = {
    id: uniqid(),
    name,
    email,
    phone,
  };
  try {
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const itemById = data.find((items) => items.id === contactId);
    itemById.name = body.name;
    itemById.email = body.email;
    itemById.phone = body.phone;
    await fs.writeFile(contactsPath, JSON.stringify(data), 'utf8');
    return itemById;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
