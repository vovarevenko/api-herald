import { parse } from 'dotenv-conf'

const data = parse(`${__dirname}/../.env`)

export const env = data.ENV ?? 'development'

export const http = {
  port: Number(data.HTTP_PORT) ?? 1337,
}

export const telegram = {
  botToken: data.TELEGRAM_BOT_TOKEN ?? '',
  chatId: Number(data.TELEGRAM_CHAT_ID),
}
