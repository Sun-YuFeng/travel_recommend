import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';

class TravelService {
    constructor() {
        this.llm = null;
        this.initLLM();
    }

    initLLM() {
        this.llm = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            configuration: {
                baseURL: process.env.OPENAI_BASE_URL,
            },
            model: process.env.OPENAI_MODEL,
            temperature: 0.7,
            streaming: true,
        });
    }

    async recommendTravel(city, area, theme){
        const messages = this.getTravelPrompt(city, area, theme)
        
        const response = await this.llm.invoke(messages)

        console.log(response);
    }

    getTravelPrompt(city, area, theme){
        return [
            new HumanMessage(
                `请为我生成一份 [城市]​ 的 [区域/行政区]​ 的 [主题]​ 打卡推荐清单。
                要求：
                推荐 5–8 个​ 具有代表性的地点；
                每个地点包含：名称 + 一句话亮点介绍 + 适合什么类型的游客；
                按「必去榜 / 小众榜 / 综合榜」其中一种方式排序；
                给出一条合理的 半日游或一日游路线建议（含动线顺序）；
                补充 实用小贴士（最佳时间、避坑提醒、交通方式等）。
                示例：
                城市：${city}
                区域：${area}
                主题：${theme}`
            ),
        ]
    }
}

export default new TravelService();
