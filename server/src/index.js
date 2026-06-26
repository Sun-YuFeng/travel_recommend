import express from 'express';
import travelRouter from './routes/travel.js';
import 'dotenv/config';

const app = express();

const port = process.env.PORT;

//中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//创建心跳接口
app.get('/heartbeat', (req, res) => {
    res.json({
        message: 'OK',
        timestamp: new Date().toISOString(),
    });
});

//中间件
app.use('/api/travel', travelRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});