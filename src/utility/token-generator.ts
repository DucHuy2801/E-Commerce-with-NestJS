import jwt from 'jsonwebtoken';

export const generateAuthToken = (id: string) => {
    return jwt.sign({_id: id}, process.env.jwtSecret, {
        expiresIn: '30d'
    })
}

export const decodeAuthToken = (token: string) => {
    return jwt.verify(token, process.env.jwtSercret)
}