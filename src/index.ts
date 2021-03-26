import * as cfg from './config'

import axios from 'axios'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import yaml from 'js-yaml'

const url = 'https://api.telegram.org'

const app = new Koa()

app.use(bodyParser())

interface RequestData {
  title: string
  time: string
  data: string
}

app.use(async ctx => {
  if (ctx.method === 'POST') {
    const { title, time, data } = ctx.request.body as RequestData
    const dumpedData = yaml.dump(data)
    const uri = `${url}/bot${cfg.telegram.bot.token}/sendMessage?parse_mode=html`
    const text = `<b>${title}</b>\n<i>${time}</i>\n\n<code>${dumpedData}</code>`

    try {
      await axios.post(uri, { chat_id: 34897485, text })
      ctx.res.statusCode = 204
    } catch (err) {
      console.error(err)
      ctx.throw(500)
    }
  }
})

app.listen(cfg.http.port)

console.log(`HTTP server is up on port ${cfg.http.port}`)
