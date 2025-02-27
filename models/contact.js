const { Schema, model } = require('mongoose');
const Joi = require('joi');

const joiSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    
    phone: Joi.string()
        .pattern(
            /^[+]?[(]?[0-9]{1,3}[)]?[-s.]?[ ]?[0-9]{1,3}[-s.]?[0-9]{3,6}$/im
        )
        .min(5)
        .max(30)
        .required(),
    
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .required(),
    favorite: Joi.boolean(),
});

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { versionKey: null }
);
const Contact = model("contacts", contactSchema);

module.exports = {
    Contact, joiSchema
};