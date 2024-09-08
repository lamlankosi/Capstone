import { orders } from "../model/index.js"
import bodyParser from "body-parser"
import { express } from "./userController.js"
import { Router } from "express"

const orderRouter = express.Router()

orderRouter.get('/', (req,res) =>{
    orders.fetchOrders(req,res)
})
export{
    orderRouter
}