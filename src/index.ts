import * as cfg from './config'

import axios from 'axios'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import yaml from 'js-yaml'

const apiUrl = 'https://api.telegram.org'

const { port } = cfg.http
const { botToken, chatId } = cfg.telegram

const app = new Koa()

app.use(bodyParser())

interface RequestData {
  msg?: string
  data?: Record<string, unknown>
}

app.use(async ctx => {
  if (ctx.method === 'POST') {
    const { msg, data } = ctx.request.body as RequestData

    let text = ''

    if (msg && data) {
      text += `${msg}\n\n${yaml.dump(data)}`
    } else {
      if (msg) text += msg
      if (data) text += yaml.dump(data)
    }

    const url = `${apiUrl}/bot${botToken}/sendMessage?parse_mode=html`
    const payload = { chat_id: chatId, text }

    try {
      await axios.post(url, payload)
      ctx.res.statusCode = 204
    } catch (err) {
      console.error(err)
      ctx.throw(500)
    }
  }
})

app.listen(port)

console.log(`HTTP server is up on port ${port}`)
