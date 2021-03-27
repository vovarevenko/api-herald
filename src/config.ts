import { parse } from 'dotenv-conf'

const data = parse(`${__dirname}/../.env`)

export const env = data.ENV ?? 'development'

export const http = {
  port: Number(data.HTTP_PORT) ?? 1337,
}

export const telegram = {
  bot: {
    token: data.TELEGRAM_BOT_TOKEN ?? '',
  },
}
