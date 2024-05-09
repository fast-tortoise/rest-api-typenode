import express from 'express';
import authentication from './authentication';
import users from './users';

const router = express.Router();

export default (): express.Router => {
    
    console.log('authentication');
    authentication(router);
    users(router);
    return router;
};
