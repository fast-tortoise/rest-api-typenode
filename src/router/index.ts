import express from 'express';
import authentication from './authentication';

const router = express.Router();

export default (): express.Router => {
    
    console.log('authentication');
    authentication(router);
    return router;
};
