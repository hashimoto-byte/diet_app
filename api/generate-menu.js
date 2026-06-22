const Anthropic = require('@anthropic-ai/sdk')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `あなたはダイエット管理の専門家です。
ユーザーのプロフィールに基づいて、現実的で続けやすい献立を提案してください。
タンパク質を十分に確保した構成を心がけてください。

【出力形式】
必ずJSON形式のみで返答してください。前置き・説明文は不要です。
以下のスキーマに従ってください：
{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "meals": [
        {
          "timing": "朝食|昼食|夕食",
          "title": "メニュー名",
          "dishes": [
            { "name": "品名", "amount": "量", "kcal": 数値, "protein": 数値 }
          ],
          "totalKcal": 数値,
          "totalProtein": 数値,
          "cookingMemo": "一言メモ",
          "ingredients": [
            { "name": "食材名", "note": "量・個数", "category": "冷蔵・生鮮|缶詰・乾物|主食|調味料|その他" }
          ]
        }
      ]
    }
  ]
}`

function buildUserPrompt({ profile, unit, timing, date, options, alreadyGenerated }) {
  const cookingMap = { simple: '超簡単（1食3品以内）', normal: '普通', full: 'しっかり作る' }
  const lines = [
    `以下のプロフィールで${unit === '1meal' ? `${date}の${timing}1食分` : `${date}の1日分`}の献立を作成してください。`,
    '',
    `目標摂取カロリー：${profile.targetCalories}kcal`,
    `目標タンパク質：${profile.targetProtein}g`,
    `調理レベル：${cookingMap[profile.cookingLevel] || profile.cookingLevel}`,
    `食の好み：${(profile.foodPreference || []).join('、') || 'なし'}`,
    `アレルギー：${profile.allergies || 'なし'}`,
    profile.activityDetail && `活動詳細：${profile.activityDetail}`,
    options?.eatOut && '外食・コンビニ案を適宜混ぜてください。',
    options?.ingredient && `次の食材を使ってください：${options.ingredient}`,
    options?.excludeMenu && `「${options.excludeMenu}」以外のメニューにしてください。`,
    alreadyGenerated?.length && `既に生成済みのメニュー（重複を避けてください）：${alreadyGenerated.join('、')}`,
  ].filter(Boolean)
  return lines.join('\n')
}

async function callClaude(systemPrompt, userPrompt) {
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4000,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  })
  const text = msg.content[0]?.text || ''
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('JSON not found in response')
  return JSON.parse(match[0])
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const body = req.body
    const userPrompt = buildUserPrompt(body)

    let result
    try {
      result = await callClaude(SYSTEM_PROMPT, userPrompt)
    } catch {
      // 1 retry
      result = await callClaude(SYSTEM_PROMPT, userPrompt)
    }

    res.status(200).json(result)
  } catch (e) {
    if (e?.status === 429) {
      await new Promise(r => setTimeout(r, 5000))
      try {
        const result = await callClaude(SYSTEM_PROMPT, buildUserPrompt(req.body))
        return res.status(200).json(result)
      } catch (e2) {
        return res.status(429).json({ error: 'Rate limited. Please try again.' })
      }
    }
    res.status(500).json({ error: e.message || 'Internal server error' })
  }
}
