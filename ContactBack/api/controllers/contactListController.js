'use strict'
const mongoose = require('mongoose')
const Contact = mongoose.model('Contacts')

exports.listAllContacts = async function(req, res){
    try {
        const contacts = await Contact.find({})
        res.json(contacts)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.createAContact = async function(req, res){
    const newContact = new Contact(req.body)
    try {
        const contact = await newContact.save()
        res.json(contact)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.readAContact = async function(req, res){
    try {
        const contact = await Contact.findById(req.params.id)
        res.json(contact)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteAContact = async function(req, res){
    try {
        const contact = await Contact.findByIdAndRemove(req.params.id)
        const response = {
            message: "This contact has been deleted",
            id: contact.firstname
        }
        res.json(response)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.updateAContact = async function(req, res){
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(contact)
    } catch (err) {
        res.status(500).send(err)
    }
}