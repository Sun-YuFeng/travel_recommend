import express from 'express';

//创建路由
const router = express.Router();

//创建推荐打卡接口
router.post('/recommend', (req, res) => {
    const { city, area, theme } = req.body;
    if (!city || !area || !theme) {
        return res.status(400).json({
            success: false,
            message: '城市、区域、主题不能为空',
        });
    }
    res.json({
        message: '推荐景点',
        timestamp: new Date().toISOString(),
    });
});

router.post('/chat', (req, res) => {
    res.json({
        message: '聊天',
        timestamp: new Date().toISOString(),
    });
});

export default router;
