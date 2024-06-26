import express from 'express';
import { getUsersByEmail, createUser } from '../db/users';
import {random, authentication} from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const{email, password} = req.body;
        if(!email || !password){
            console.log("wrong data");
            return res.sendStatus(400);
        }

        const user = await getUsersByEmail(email).select('+authentication.salt +authentication.password');

        if(!user) {
            console.log("user not found");
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);
        
        if(user.authentication.password != expectedHash){
            console.log("password mismatch");
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('VARUN-AUTH', user.authentication.sessionToken, {domain: 'localhost', path : '/'});

        return res.status(200).json(user).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const{ email, password, username } = req.body; 
        console.log(email);
        console.log(password);
        console.log(username);

        if(!email || !password || !username){
            console.log("wrong data");
            return res.sendStatus(400);
        }

        const existingUser = await getUsersByEmail(email);

        if(existingUser){
            console.log("wrong data exsisting");
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication : {
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(200).json(user).end();
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(404);
    }
}