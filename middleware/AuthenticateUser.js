import {jwt} from 'jsonwebtoken'
import 'dotenv/config'

const { sign, verify } = jwt

function createAToken(user){
    return sign(
        {
            email: user.emailAdd,
            pwd: user.pwd
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )
}

function verifyAToken(req, res, next){
    const token = req?.headers["authorization"]
    if (token) {
        if (verify(token, process.env.SECRET_KEY)) {
            next()
        } else {
            res?.json({
                status: res.statusCode,
                msg: "Please provide the correct Details."
            })
        }
    } else {
        res?.json({
            status: res.statusCode,
            msg: "Please login."
        })
    }
}

export{
    createAToken,
    verifyAToken
}