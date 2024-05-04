import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
    credentials: true
}));

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('listening on http://localhost:8080');
});

const MONGODB_SERVER_URL = "mongodb+srv://varunkumarsde:HMume44IZ8zSclDA@cluster0.twevqcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.Promise = Promise;
mongoose.connect(MONGODB_SERVER_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use("/", router());
