const express = require('express');

const Contacts = require('../../models/schema/contacts');

const { schema } = require('../../validation');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const results = await Contacts.find();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    next(err);
  }
  
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await Contacts.findById(req.params.contactId);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = await schema.validate(req.body);
    if (error) {
      res.status(400).json(error);
      return;
    }
    res.status(201).json(await Contacts.create(req.body));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const data = await Contacts.findByIdAndRemowe(req.params.contactId);
    if (data) {
      res.status(200).json({ message: "contact deleted", data });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = await schema.validate(body);
    if (error) {
      return res.status(400).json(error);
    }
    const data = await Contacts.findByIdAndUpdate(
      req.params.contactId,
      body,
      { new: true }
    );
    if (data) {
      return res.status(200).json(data);
    }
    res.status(404).json({ message: "Not found" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  if (typeof body?.favorite !== "boolean") {
    res.status(400).json({ message: "missing fied favorite" });
  }
  try {
    const result = await Contacts.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );
    if (result) {
      res.status(200).json({ message: "result" });
    } else {
      res.status(404).json({
        message: `Not found task id:${contactId}`
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
