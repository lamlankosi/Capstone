import {connection as db } from '../config/index.js'

class Orders{
    fetchOrders(req,res){
       try{
        const strQry =`
        SELECT o.orderID, o.orderDate, u.firstName, u.emailAdd, p.prodName,o.totalAmount, o.status
        FROM Orders o
        INNER JOIN Users u ON o.userID = u.userID
        INNER JOIN Products p ON o.prodID = p.prodID;
        `
        db.query(strQry, (err, results)=>{
            if(err) throw new Error('Unable to fetch Orders')
                res.json({
            status: res.statusCode,
            results
        })
        })
       }catch(e){
        res.json({
            status:404,
            msg:e.message
        })
       } 
    }
    fetchOrder(req,res){
    try{
        const strQry=`
        SELECT o.orderID, o.orderDate, u.firstName, u.emailAdd, p.prodName,o.totalAmount, o.status
        FROM Orders o
        INNER JOIN Users u ON o.userID = u.userID
        INNER JOIN Products p ON o.prodID = p.prodID
        WHERE orderID=${req.params.id}
        `
        db.query(strQry, (err, result) =>{
            if(err) throw new Error (err)
                res.json({
                    status:res.statusCode,
                    result
                })
        })
    } catch(e){
        res.json({
            status:404,
            msg: e.message
        })
    }
    }
    addOrder(req,res){
        try{
            let data = req.body
            const strQry=`
            INSERT INTO Orders
            SET ?
            `
            db.query(strQry, [data],(err) => {
                if (err) throw new Error(err)
                    res.json({
                        status: res.statusCode,
                        msg: 'You have placed an order'
                    })
            })
        } catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    updateOrder(req,res){
        try{
            let data = req.body
            const strQry = `
            UPDATE Orders
            SET ?
            WHERE orderID = ${req.params.id}
            `
            db.query(strQry, [data], (err) =>{
                if(err) throw new Error(err)
                    res.json({
                        status:res.statusCode,
                        msg:'You have update the order'
                    })
            })
        }catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    deleteOrder(req,res) {
        try{
            const strQry=`
            DELETE
            FROM Orders
            WHERE orderID = ${req.params.id};`
            db.query(strQry, (err)=>{
                if(err) throw new Error (err)
                    res.json({
                        status: res.statusCode,
                        msg: 'Order has been deleted'
                    })
            })
        } catch (e) {
            res.json({
                status:404,
                msg: e.message
            })
        }
    }

}

export {
    Orders
}