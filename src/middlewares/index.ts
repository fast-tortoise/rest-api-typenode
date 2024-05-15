import express from 'express';
import {get, merge} from 'lodash';
import { getUsersBySessionToken } from '../db/users';

export const isOwner = async(req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId){
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id){
            return res.sendStatus(403);
        }
        next();

    }catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}

export const isAuththenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try
    {
        const sessionToken = req.cookies['VARUN-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const exsistingUser = await getUsersBySessionToken(sessionToken);
        if(!exsistingUser){
            return res.sendStatus(403);
        }

        merge(req, {identity: exsistingUser});
        return next();

    } catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}


