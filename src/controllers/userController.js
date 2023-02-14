let userModel = require('../models/userModel')
let productModel = require('../models/productModel')

module.exports = {
createUser : async (req, res) => {
    try {
        let {name, phone, email, password} = req.body
        if (!name) {
            return res.status(400).send({status: false, msg: 'Name is mandatory'})
        }
        if (!phone) {
            return res.status(400).send({status: false, msg: 'Phone is mandatory'})
        }
        let findPhone = await userModel.findOne({phone: phone})
        if (findPhone) {
            return res.status(409).send({status: false, msg: 'Phone number is already exist'})
        }
        if (!email) {
            return res.status(400).send({status: false, msg: 'email is mandatory'})
        }
        let findemail = await userModel.findOne({email: email})
        if (findemail) {
            return res.status(409).send({status: false, msg: 'email number is already exist'})
        }
        if (!password) {
            return res.status(400).send({status: false, msg: 'password is mandatory'})
        }
        let saveData = await userModel.create(req.body)
        return res.status(201).send({status: true, msg: 'User created successfully', User: saveData})
    } catch (error) {
        return res.status(500).send(error.message)
    }
},

login : async (req, res) => {
    try {
        let {email, password} = req.body
        let findData = await userModel.findOne({email: email, password: password})
        if (!findData) {
            return res.status(404).send({status: false, msg: 'Either email or password is not correct'})
        }
        let token = jwt.sign({
            userId: findData._id}, 'SecretKey')
            res.setHeader('token', token)
            return res.status(200).send({status: true, msg: 'Token generated successfully', Token: token})
        } catch (error) {
        return res.status(500).send(error.message)
    }
}

}