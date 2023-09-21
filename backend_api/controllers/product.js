const { Product } = require("./../models/product");

async function searchProducts(req, res) {
    const { category, direction = "desc", sortBy = "_id", name = "" } = req.query;

    const searchObj = {};

    if (category) searchObj.category = category;
    searchObj.name = { $regex: name, $options: "i" }

    const products = await Product.find(searchObj).sort({ [sortBy]: direction });

    res.send({ "err": 0, "prodata": products });
}

async function getProductCategories(req, res) {
    try {
        const categories = await Product.find().select("category").distinct("category");
        res.send(categories);
    } catch (ex) {
        console.log(ex.message);
    }
}

async function getProductById(req, res) {
    let product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404).send(`Product with id ${req.params.id} not found`);
        return;
    }

    res.send({ "err": 0, "prodata": product });
}

async function saveProduct(req, res) {
    const requestBody = req.body;
    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
    const data = { ...requestBody, 'imageURL': url }
    console.log(data)


    const product = new Product(data)
    try {
        const savedProduct = await product.save();
        res.send({ "err": 0, "msg": "Product Added" });
    } catch (ex) {
        return res.send({ "err": 1, "msg": ex.message });
    }
}

async function updateProductDetails(req, res) {
    let product = await Product.findById(req.params.id);
    const requestBody = req.body;
    if (!product) {
        res.status(404).send(`Product with id ${req.params.id} not found`);
        return;
    }
    if (req.file?.filename) {

        const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
        requestBody.imageURL = url;
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, requestBody);
            res.send({ "err": 0, "msg": "Product Updated" });
        } catch (ex) {
            return res.status(400).send({ "err": 1, "msg": ex.message });
        }
    }
    else {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, requestBody);
            res.send({ "err": 0, "msg": "Product Updated" });
        } catch (ex) {
            return res.status(400).send({ "err": 1, "msg": ex.message });
        }
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.send({ "err": 1, "msg": `Product with id ${req.params.mentorId} not found` });
            return;
        }

        res.send({ "err": 0, "msg": "deleted" });
    } catch (ex) {
        return res.send({ "err": 1, "msg": ex.message });
    }
}
async function getProductByIds(req, res) {
    try {
        id = req.body.data;
        arr = [];
          for (let i = 0; i < id.length; i++) {
            let product = await Product.findById(id[i]);
            arr.push(product)
        }
        res.send(arr)
    }
    catch (ex) {
        return res.send({ "err": 1, "msg": ex.message });
    }
}


module.exports = {
    searchProducts,
    getProductCategories,
    getProductById,
    saveProduct,
    updateProductDetails,
    deleteProduct,
    getProductByIds
};

// pd, dd
// 24th March, 3rd April
// 21st March, 27th March
// 22nd March, 29th March
