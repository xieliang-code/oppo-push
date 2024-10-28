import express from 'express';
import newsQueryRoute from './routes/newsQueryRoute.js';
// 如果有反馈数据相关路由，在此引入

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', newsQueryRoute);
// 如果有反馈数据相关路由，在此注册

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});