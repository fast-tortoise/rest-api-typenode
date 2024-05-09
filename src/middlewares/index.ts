import express from 'express';
import {get, merge} from 'lodash';
import { getUsersBySessionToken } from '../db/users';

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


