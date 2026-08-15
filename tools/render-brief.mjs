#!/usr/bin/env node

import { readFile } from 'node:fs/promises'

const input = process.argv[2]
if (!input) {
  console.error('Usage: node tools/render-brief.mjs <topic>')
  process.exit(1)
}

const topic = input.trim()
if (!topic) {
  console.error('Topic cannot be empty.')
  process.exit(1)
}

const brief = {
  topic,
  assumptions: ['默认平台：短视频平台', '默认受众：对该主题有基础兴趣但不了解细节的人'],
  titleDirections: [
    `${topic}：3 个你真正需要知道的事实`,
    `为什么${topic}值得现在关注？`,
    `关于${topic}，大多数人忽略了什么？`,
  ],
  structure: ['Hook', 'Context', 'Core information', 'Evidence or example', 'CTA'],
  visualPlan: [
    { section: 'Hook', intent: '建立问题或冲突', supply: '截图、关键画面或大字标题' },
    { section: 'Core information', intent: '解释核心机制', supply: '图示、录屏或结构化字幕' },
    { section: 'CTA', intent: '推动下一步行动', supply: '产品界面、链接或评论引导' },
  ],
  qc: ['核验事实与数字', '检查字幕可读性', '确认画面与旁白匹配', '检查素材授权', '保留明确 CTA'],
}

console.log(JSON.stringify(brief, null, 2))
