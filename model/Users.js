import { connection as db } from "../config/index.js"
import { createAToken } from "../middleware/AuthenticateUser.js"
import {compare, hash} from 'bcrypt'

class Users{
    fetchUsers(req,res){
        try{
            const strQry = `
            SELECT userID, firstName,lastName, password, gender, emailAdd, role,imageURL,Location, createdAt
            FROM Users;
            `
            db.query(strQry, (err, results)=>{
                if(err) throw new Error(err) 
                    res.json({
                    status: res.statusCode,
                    results
                    })
            }) 
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    fetchUser(req, res){
        try{
            const strQry = `
            SELECT userID, firstName,lastName, password, gender, Gender, emailAdd, role,imageURL,Location, createdAt, 
            FROM Users
            WHERE userID = ${req.params.id};
            `
            db.query(strQry, (err, result)=>{
                if(err) throw new Error('Unable to retieve user from the database') 
                    res.json({
                    status: res.statusCode,
                    result:result[0]
                    })
            }) 
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    deleteUser(req, res) {
        try{
            const strQry = `
            DELETE  
            FROM Users
            WHERE userID= ${req.params.id};
            `
            db.query(strQry, (err) => {
                if (err) throw new Error('To delete a user, please review your delete query.')
                res.json({
                    status: res.statusCode,
                    msg: 'User details deleted successfully'
                })
            })
        } catch (e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    async registerUser(req,res){
        try { 
            let data = req.body
            data.password = await hash(data.password, 12)

            let user = {
                emailAdd: data.emailAdd,
                password: data.password
            }
            let strQry = `
            INSERT INTO Users
            SET ?;
            `
            db.query(strQry, [data], (err) => {
                if (err) {
                    res.json({
                        status: res.statusCode,
                        err: err.message
                    })
                } else {
                    const token = createAToken(user)
                    res.json({
                        token,
                        msg: 'Welcome, You are now registered.'
                    })
                }
            })
        } catch (e) {
            res.json({
                status: 404,
                err: e.message
            })
        }
    }
    async updateUser(req, res) {
        try {
            let data = req.body
            if (data.pwd) {
                data.pwd = await hash(data.pwd, 12)
            }
            const strQry = `
            UPDATE Users
            SET ?
            WHERE userID = ${req.params.id}
            `
            db.query(strQry, [data], (err) => {
                if (err) throw new Error(err)
                res.json({
                    status: res.statusCode,
                    msg: 'The user details was updated.'
                })
            })
        } catch (e) {
            res.json({
                status: 400,
                err: e.message
            })
        }

    }
    async login(req, res) {
        try {
            const { emailAdd, password } = req.body;
            const strQry = `
                SELECT userID, firstName, lastName, password, gender, emailAdd, role, imageURL, Location, createdAt
                FROM Users
                WHERE emailAdd = ?;
            `;
            db.query(strQry, [emailAdd], async (err, result) => {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        msg: 'Database query error'
                    });
                    return;
                }
                if (!result?.length) {
                    res.status(401).json({
                        status: 401,
                        msg: 'Invalid email address.'
                    });
                    return;
                }
    
                const user = result[0];
                const validPass = await compare(password, user.password);
    
                if (validPass) {
                    if (user.role === 'Admin') {
                        const token = createAToken({
                            emailAdd,
                            password
                        });
                        res.status(200).json({
                            status: 200,
                            token,
                            result: user
                        });
                    } else {
                        res.status(403).json({
                            status: 403,
                            msg: 'Access denied: Admins only'
                        });
                    }
                } else {
                    res.status(401).json({
                        status: 401,
                        msg: 'Invalid password'
                    });
                }
            });
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: e.message
            });
        }
    }
    
    

}
export{
    Users
}
