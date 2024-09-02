import { connection as db } from "../config/index.js"

class Products{
    fetchProducts(req, res){
        try{
            const strQry =`
            SELECT prodName, Category, description, quantity, amount, prodUrl
            FROM Products
            `
            db.query(strQry, (err, results) => {
                if(err) throw new Error ('Couldn\'t retrieve products')
                    res.json({
                        status: res.statusCode,
                        err
                    })
            })
        } catch(e){
            res.json({
                status: 404,
                mgs:e.message
            })
        }
    }
    fetchProduct(req,res){
        try{
            const strQry =`
            SELECT prodName, Category, description, quantity, amount, prodUrl
            FROM Products
            WHERE prodID= ${req.params.id}
            `
            db.query(strQry, (err, results) => {
                if(err) throw new Error ('Couldn\'t retrieve products')
                    res.json({
                        status: res.statusCode,
                        results
                    })
            })
        } catch(e){
            res.json({
                status: 404,
                mgs:e.message
            })
        }
    }
    addProduct(req,res){
        try {
            const strQry = `
            INSERT INTO Products
            SET ?
            `
            db.query(strQry, [req.body], (err) => { 
                if (err) throw new Error('Couldn\'t add a product')
                res.json({
                    status: res.statusCode,
                    msg: 'Product has been added'
                })
            })
        } catch (e) {
            res.json({
                status: 404,
                err: e.message
            })
         }
    }
    deleteProduct(req,res){
        try{
            const strQry = `
            DELETE 
            FROM Products
            WHERE prodID = ${req.params.id};`
    
            db.query(strQry, (err) => {
                if(err) throw new Error ('Unable to delete a product')
                    res.json({
                        status: res.statusCode,
                        msg: 'Product has been removed successfully'
                    })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    updateProduct(req, res) { 
        try {
            let data = req.body
            const strQry = `
            UPDATE Products
            SET ?
            WHERE prodID = ${req.params.id};
            `
            db.query(strQry, [data], (err) => { 
                if (err) throw new Error('Unable to edit a product')
                res.json({
                    status: res.statusCode,
                    msg: 'Product was updated.'
                })
            })
        } catch (e) { 
            res.json({
                status: 404,
                err: e.message
            })
        }
    }
}

export{
    Products
}
