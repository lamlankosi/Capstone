import {connection as db } from '../config/index.js'

class Orders{
    fetchOrders(){
       try{
        const strQry =`
        SELECT *
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
}

export {
    Orders
}