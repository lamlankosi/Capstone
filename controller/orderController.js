import { orders } from "../model/index.js"
import bodyParser from "body-parser"
import { express } from "./userController.js"

const orderRouter = express.Router()

orderRouter.use(bodyParser.json())

orderRouter.get('/', (req,res) =>{
    orders.fetchOrders(req,res)
})
orderRouter.get('/:id', (req,res)=>{
    orders.fetchOrder(req,res)
})
orderRouter.post('/add',(req,res)=>{
    orders.addOrder(req,res)
})
orderRouter.patch('/:id', (req,res)=>{
    orders.updateOrder(req,res)
}) 
orderRouter.delete('/:id', (req,res)=> {
    orders.deleteOrder(req,res)
})
export{
    orderRouter
}