import path from 'path'
import cors from 'cors'
import 'dotenv/config'
import { express, userRouter } from './controller/userController.js'
import {productRouter} from './controller/prodController.js'
import {orderRouter} from './controller/orderController.js'

const app = express()
const port = +process.env.PORT || 4000

//middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");

    next()
})

app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cors()
)

app.use('/users', userRouter)
app.use('/products', productRouter )
app.use('/orders', orderRouter)
//endpoint for home page
app.get('^/$|/gamingInventory', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})

app.get('*', (req, res) => {
    res.json({
        status: 404,
        msg: 'Resource not found'
    })
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
