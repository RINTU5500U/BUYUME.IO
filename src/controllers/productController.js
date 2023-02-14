const productModel = require('../models/productModel')

module.exports = {

createProduct : async (req, res) => {
    try {
        let {quantity} = req.body
        req.body.userId = req.decodeToken.userId
        if (!quantity) {
            return res.status(400).send({status: false, msg: 'Quantity is mandatory'})
        }
        let saveData = await productModel.create(req.body)
        return res.status(201).send({status: true, msg: 'Product created successfully', Product: saveData})
    } catch (error) {
        return res.status(500).send(error.message)
    }
},

updateProduct : async (req, res) => {
    try {
        let {userId, productId} = req.params
        if (userId != req.decodeToken.userId) {
            return res.status(403).send({status: false, msg: 'Unauthorized person'})
        }
        let {quantity, operation} = req.body
        if (operation == 'add') {
            let updateData = await productModel.findOneAndUpdate({userId: userId,_id: productId}, {$inc: {quantity: (+quantity)},updatedAt: new Date().toLocaleString()}, {new: true})
            return res.status(201).send({status: true, msg: 'Quantity updated successfully', Product: updateData})
        } else {
            let updateData = await productModel.findOneAndUpdate({userId: userId,_id: productId}, {$inc: {quantity: (-quantity)},updatedAt: new Date().toLocaleString()}, {new: true})
            return res.status(201).send({status: true, msg: 'Quantity updated successfully', Product: updateData})
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

}
