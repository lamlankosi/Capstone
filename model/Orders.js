import {connection as db } from '../config/index.js'

class Orders{
    fetchOrders(){
       try{
        const strQry =`
        SELECT orderID, firstName, emailAdd, prodID
        FROM Orders
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
    fetchOrder(){
    try{
        const strQry=`
        SELECT orderID, firstName, emailAdd, prodID
        FROM Orders
        WHERE orderID=${req,params.id}
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
    addOrder(){
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
    updateOrder(){
        try{
            let data = req.body
            const strQry = `
            UPDATE Orders
            SET ?
            WHERE = ${req.params.id}
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
                status: res.statusCode,
                msg: e.message
            })
        }
    }
    deleteOrder(){
        try{
            const strQry=`
            DELETE
            FROM Orders
            WHERE orderID=${req.params.id}`
            db.query(strQry, (err)=>{
                if(err) throw new Error (err)
                    res.json({
                        status: res.statusCode,
                        msg: 'Order has been deleted'
                    })
            })
        }catch(e){
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