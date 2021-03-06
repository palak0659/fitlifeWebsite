const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Contact } = require('../models/contact');


router.get('/', (req, res) => {
   Contact.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Contacts :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

   Contact.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var con = new Contact({
       Name: req.body.Name,
      Email: req.body. Email,
     Message: req.body.Message
    });
   con.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Contact Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        var con = {
            Name: req.body.Name,
           Email: req.body. Email,
          Message: req.body.Message
         };
  
    Contact.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Contact Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

   Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Contact Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;