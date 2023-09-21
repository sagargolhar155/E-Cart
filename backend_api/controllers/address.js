const { validateAddress } = require("../models/address");
const { Address } = require("../models/address");

async function addAddress(req, res) {
    
    const user = req.user;
    // const {error} = validateAddress(req.body);
    // if(error) {
    //     return res.status(400).send(`Bad Request ${error}`);
    // }
console.log(req.body);
    try {
        const address = new Address({...req.body, user: user._id});
        const savedAddress = await address.save();
        return res.send({"err":0,"msg":{...savedAddress}});
    } catch(ex) {
        return res.send({"err":1,"msg":ex.message});
    }
}

async function getAddresses(req, res) {
    const user = req.user;

    try {
        const addresses = await Address.find({user: user._id});
        return res.send({"err":0,"address":addresses});
    } catch(ex) {
        return res.status(400).send(ex.message);
    }
}
async function updateaddress(req, res) {
    try {
        const updatedaddress = await Address.findByIdAndUpdate(req.params.id, req.body);
        return res.send({"err":0,"address":"address is updated"});
    } catch(ex) {
        return res.status(400).send(ex.message);
    }

   
}

async function deleteaddress(req, res) {
    try {
        const addresses = await Address.findByIdAndDelete(req.params.id);
        return res.send({"err":0,"address":"address is deleted"});
    } catch(ex) {
        return res.status(400).send(ex.message);
    }
}

module.exports = {
    addAddress,
    getAddresses,
    deleteaddress,
    updateaddress
}