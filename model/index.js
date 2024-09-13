import { Products } from "./Products.js"
import { Users } from "./Users.js"
import { Orders } from "./Orders.js"
import { Report } from "./Report.js"


const users = new Users()
const products = new Products()
const orders = new Orders()
const report = new Report()

export{
    users,
    products,
    orders,
    report
}