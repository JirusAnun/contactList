'use strict'
module.exports = function(app){
    var contactList = require('../controllers/contactListController')
    var user =  require('../controllers/userController')

    app.route('/contacts')
        .get(contactList.listAllContacts)
        .post(contactList.createAContact)

    app.route('/contacts/:id')
        .get(contactList.readAContact)
        .delete(contactList.deleteAContact)
        .post(contactList.updateAContact)

    app.route('/register')
        .post(user.createAUser)

    app.route('/login')
        .post(user.loginUser)

    app.route('/user/:id')
        .delete(user.deleteAContact)
}