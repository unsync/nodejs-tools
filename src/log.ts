import lodash from 'lodash'
import winston from 'winston'
import { format } from 'logform'

const { combine, timestamp, printf, errors } = format

export function getLogger(_: {service: string}) {
  const myFormat = printf((info) => {
    const { level, message, timestamp, stack, ...meta } = info
    const data = lodash.omit(meta, ['service'])
    const dataLog = Object.keys(data).length ? JSON.stringify(data) : ''
    const stackLog = stack ? JSON.stringify(stack?.split('\n')) : ''
    return `${timestamp} [${meta.service}] ${level}: ${message} ${dataLog} ${stackLog}`
  })

  return winston.createLogger({
    level: 'debug',
    // format: winston.format.json(),
    format: combine(errors({ stack: true }), timestamp(), myFormat),
    defaultMeta: { service: _.service },
    transports: [new winston.transports.Console()],
  })
}
