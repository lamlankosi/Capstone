import path from 'path'
import cors from 'cors'
import 'dotenv/config'
import { express, userRouter } from './controller/userController.js'

const app = express()
const port = +process.env.PORT || 4000

app.use('/user', userRouter)
app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true
    }),
    cors()
)


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