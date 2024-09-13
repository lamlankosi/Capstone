import { connection as db } from "../config/index.js";
import PDFDocument from 'pdfkit';

class Report {
    fetchIncome(req, res) {
        try {
            const strQry = `
            SELECT incomeID, orderID, category, amount, incomeDate, description
            FROM income
            `;
            db.query(strQry, (err, results) => {
                if (err) throw new Error(err);
                res.json({
                    status: res.statusCode,
                    results
                });
            });
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }

    fetchExpenses(req, res) {
        try {
            const strQry = `
            SELECT expenseID, category, amount, expenseDate, description
            FROM expenses;
            `;
            db.query(strQry, (err, results) => {
                if (err) throw new Error(err);
                res.json({
                    status: res.statusCode,
                    results
                });
            });
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }


    downloadExpenses(req, res) {
        try {
            const strQry = `
            SELECT expenseID, category, amount, expenseDate, description
            FROM expenses;
            `;
            db.query(strQry, (err, results) => {
                if (err) throw new Error(err);
    
                // Create a new PDF document
                const doc = new PDFDocument();
                
                // Set the response headers for downloading the PDF
                res.setHeader('Content-disposition', 'attachment; filename=expenses_report.pdf');
                res.setHeader('Content-type', 'application/pdf');
    
                // Pipe the PDF document directly to the response
                doc.pipe(res);
    
                // Add document title
                doc.fontSize(25).text('Expenses Report', { align: 'center' });
                doc.moveDown(1);
    
                // Table headers
                const tableTop = 150;
                const colWidths = {
                    id: 70,
                    category: 100,
                    amount: 100,
                    date: 120,
                    description: 180,
                };
    
                doc.fontSize(12)
                    .text('ID', 50, tableTop, { width: colWidths.id, align: 'left' })
                    .text('Category', 130, tableTop, { width: colWidths.category, align: 'left' })
                    .text('Amount', 230, tableTop, { width: colWidths.amount, align: 'right' })
                    .text('Date', 330, tableTop, { width: colWidths.date, align: 'right' })
                    .text('Description', 450, tableTop, { width: colWidths.description, align: 'left' });
    
                // Draw a line below the headers
                doc.moveTo(50, tableTop + 20)
                   .lineTo(530, tableTop + 20)
                   .stroke();
    
                // Table rows
                let rowPosition = tableTop + 30;
                results.forEach((expense) => {
                    const rowHeight = 20;
                    const amount = parseFloat(expense.amount) || 0;  // Ensure amount is a number, default to 0 if null
    
                    doc.fontSize(10)
                        .text(expense.expenseID, 50, rowPosition, { width: colWidths.id, align: 'left' })
                        .text(expense.category, 130, rowPosition, { width: colWidths.category, align: 'left' })
                        .text(amount.toFixed(2), 230, rowPosition, { width: colWidths.amount, align: 'right' })  // Safely using toFixed
                        .text(new Date(expense.expenseDate).toLocaleDateString(), 330, rowPosition, { width: colWidths.date, align: 'right' })
                        .text(expense.description, 450, rowPosition, { width: colWidths.description, align: 'left' });
    
                    rowPosition += rowHeight;
    
                    // Optionally, draw a line between rows
                    doc.moveTo(50, rowPosition - 5)
                       .lineTo(530, rowPosition - 5)
                       .stroke();
                });
    
                doc.end(); // Finalize the PDF and end the stream
            });
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }
    downloadIncome(req, res) {
        try {
            const strQry = `
            SELECT incomeID, orderID, category, amount, incomeDate, description
            FROM income;
            `;
            db.query(strQry, (err, results) => {
                if (err) throw new Error(err);
    
                // Create a new PDF document with landscape orientation
                const doc = new PDFDocument({
                    size: [841.89, 595.28]  // A4 size in landscape orientation (210mm x 297mm)
                });
                
                // Set the response headers for downloading the PDF
                res.setHeader('Content-disposition', 'attachment; filename=income_report.pdf');
                res.setHeader('Content-type', 'application/pdf');
    
                // Pipe the PDF document directly to the response
                doc.pipe(res);
    
                // Add document title
                doc.fontSize(25).text('Income Report', { align: 'center' });
                doc.moveDown(1);
    
                // Table headers
                const tableTop = 150;
                const colWidths = {
                    id: 70,
                    orderID: 80,
                    category: 100,
                    amount: 100,
                    date: 120,
                    description: 180,
                };
    
                doc.fontSize(12)
                    .text('ID', 50, tableTop, { width: colWidths.id, align: 'left' })
                    .text('Order ID', 130, tableTop, { width: colWidths.orderID, align: 'left' })
                    .text('Category', 210, tableTop, { width: colWidths.category, align: 'left' })
                    .text('Amount', 310, tableTop, { width: colWidths.amount, align: 'right' })
                    .text('Date', 410, tableTop, { width: colWidths.date, align: 'right' })
                    .text('Description', 530, tableTop, { width: colWidths.description, align: 'left' });
    
                // Draw a line below the headers
                doc.moveTo(50, tableTop + 20)
                   .lineTo(791.89, tableTop + 20) // Adjusted for landscape width
                   .stroke();
    
                // Table rows
                let rowPosition = tableTop + 30;
                results.forEach((income) => {
                    const rowHeight = 20;
                    const amount = parseFloat(income.amount) || 0;  // Ensure amount is a number, default to 0 if null
    
                    doc.fontSize(10)
                        .text(income.incomeID, 50, rowPosition, { width: colWidths.id, align: 'left' })
                        .text(income.orderID, 130, rowPosition, { width: colWidths.orderID, align: 'left' })
                        .text(income.category, 210, rowPosition, { width: colWidths.category, align: 'left' })
                        .text(amount.toFixed(2), 310, rowPosition, { width: colWidths.amount, align: 'right' })  // Safely using toFixed
                        .text(new Date(income.incomeDate).toLocaleDateString(), 410, rowPosition, { width: colWidths.date, align: 'right' })
                        .text(income.description, 530, rowPosition, { width: colWidths.description, align: 'left' });
    
                    rowPosition += rowHeight;
    
                    // Optionally, draw a line between rows
                    doc.moveTo(50, rowPosition - 5)
                       .lineTo(791.89, rowPosition - 5) // Adjusted for landscape width
                       .stroke();
                });
    
                doc.end(); // Finalize the PDF and end the stream
            });
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            });
        }
    }
}
    
    


export {
    Report 
}
