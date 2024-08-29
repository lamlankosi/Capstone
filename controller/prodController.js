import { products } from "../model/index.js"
import bodyParser from "body-parser"
import { express } from "./userController.js"

const productRouter = express.Router()

productRouter.use(bodyParser.json())

productRouter.get('/', (req,res) => {
    products.fetchProducts(req,res)
})

productRouter.get('/:id', (req, res) =>{
    products.fetchProduct(req,res)
})

productRouter.post('/add', (req,res)=> {
    products.addProduct(req,res)
})

productRouter.patch('/:id', (req,res)=>{
    products.updateProduct(req,res)
})

productRouter.delete('/:id', (req,res)=> {
    products.deleteProduct(req,res)
})