import { report } from "../model/index.js";
import { express } from "./userController.js";
import bodyParser from "body-parser";

const reportRouter = express.Router();
reportRouter.use(bodyParser.json());

reportRouter.get('/expenses', (req, res) => {
    report.fetchExpenses(req, res);
});

reportRouter.get('/income', (req, res) => {
    report.fetchIncome(req, res);
});

// Endpoint for downloading expenses as a PDF
reportRouter.get('/expenses/download', (req, res) => {
    report.downloadExpenses(req, res);
});

reportRouter.get('/income/download', (req,res)=> {
    report.downloadIncome(req, res);
})

export { reportRouter };
