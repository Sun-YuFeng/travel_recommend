const MOCK_REPLIES = {
  推荐本地美食:
    '根据你的位置，为你推荐以下美食打卡点：\n\n1. 🍜 老城区面馆 — 百年传承手工面，人均35元\n2. 🥟 街角小笼包 — 本地人气早餐，需排队\n3. 🍢 夜市烧烤摊 — 深夜灵魂补给，推荐烤苕皮\n\n建议傍晚出发，边逛边吃，体验最地道的城市味道！',
  周末去哪玩:
    '这个周末推荐你去这些地方：\n\n🏛️ 城市博物馆 — 免费参观，适合拍照\n🌳 滨江公园 — 骑行+野餐，亲子友好\n🎨 创意园区 — 文艺青年必逛，咖啡+展览\n\n路线建议：上午博物馆 → 中午创意园午餐 → 下午滨江骑行',
  亲子打卡路线:
    '亲子一日游路线规划：\n\n9:00 科技馆（互动体验，孩子超爱）\n11:30 附近亲子餐厅\n14:00 动物园或海洋馆\n17:00 城市广场喂鸽子\n\n全程约8小时，记得带推车和水壶哦！',
  网红景点:
    '当前最火网红打卡点：\n\n📸 彩虹阶梯 — 超出片，建议穿纯色衣服\n🌸 樱花大道 — 季节性限定，人较多\n🏰 复古街区 — 文艺范十足，适合下午茶\n\nTips：工作日上午人最少，光线也最好！',
}

const THEME_REPLIES = {
  food: '已收到你的美食主题规划！为你精选以下打卡美食：\n\n🥘 必吃榜第一名：本地特色火锅\n🍰 网红甜品店：排队但值得\n☕ 隐藏咖啡馆：老建筑改造，氛围满分\n\n按距离排序，步行可达，开启你的美食之旅吧！',
  scenic:
    '景点主题规划已生成！推荐路线：\n\n🏯 上午：历史古迹（2小时）\n🌊 中午：江边漫步+午餐\n🌆 傍晚：观景台看日落\n\n全程约6小时，建议穿舒适的鞋！',
  entertainment:
    '娱乐设施推荐来啦：\n\n🎢 主题乐园 — 刺激项目+拍照圣地\n🎳 室内运动馆 — 保龄球+攀岩\n🎬 沉浸式剧场 — 互动体验超有趣\n\n适合朋友聚会或情侣约会，记得提前购票哦！',
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getReplyByPrompt(prompt) {
  if (MOCK_REPLIES[prompt]) return MOCK_REPLIES[prompt]

  for (const [key, reply] of Object.entries(MOCK_REPLIES)) {
    if (prompt.includes(key) || key.includes(prompt)) return reply
  }

  return `关于「${prompt}」，我为你整理了以下建议：\n\n这是一个很棒的问题！根据当前热门趋势，我建议你先确定出行时间和预算，我可以进一步为你定制专属打卡路线。\n\n你也可以试试下方的快捷标签，获取更精准的推荐哦！`
}

export function getReplyByTheme(theme) {
  return THEME_REPLIES[theme] ?? THEME_REPLIES.scenic
}

export async function mockStreamText(text, onChunk) {
  for (const char of text) {
    onChunk(char)
    await sleep(char === '\n' ? 50 : 30)
  }
}
