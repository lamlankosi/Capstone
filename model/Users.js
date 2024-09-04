import { connection as db } from "../config/index.js"
import { createAToken } from "../middleware/AuthenticateUser.js"
import {compare, hash} from 'bcrypt'

class Users{
    fetchUsers(req,res){
        try{
            const strQry = `
            SELECT userID, firstName, lastName, userAge, Gender, userRole, emailAdd, password, profileURL
            FROM Users;
            `
            db.query(strQry, (err, results)=>{
                if(err) throw new Error('Unable to retieve users from the database') 
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
            SELECT firstName, lastName, userAge, Gender, userRole, emailAdd, password, profileURL
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
                if (err) throw new Error('Couldn\'t update a user')
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
            const { emailAdd, password } = req.body
            const strQry = `
            SELECT userID, firstName, lastName, userAge, Gender, emailAdd, password, userRole, profileURL
            FROM Users
            WHERE emailAdd = '${emailAdd}';
            `
            db.query(strQry, async (err, result) => {
                if (err) throw new Error(err)
                if (!result?.length) {
                    res.json(
                        {
                            status: 401,
                            msg: 'Invalid email address.'
                        }
                    )
                } else {
                    const validPass = await compare(password, result[0].password)
                    if (validPass) {
                        const token = createAToken({
                            emailAdd,
                            password
                        })
                        res.json({
                            status: res.statusCode,
                            token,
                            result: result[0]
                        })
                    } else {
                        res.json({
                            status: 401,
                            msg: 'Invalid password or you have not registered'
                        })
                    }
                }
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    

}
export{
    Users
}
