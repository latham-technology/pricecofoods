declare const MAILGUN_API_BASE_URL: string
declare const MAILGUN_API_KEY: string

export interface EmailData {
  from: string
  to: string
  subject: string
  html: string
  text?: string
  'amp-html'?: string
  attachment?: {
    size: number
    url: string
    name: string
    'content-type': string
  }[]
  cc?: string
  bcc?: string
  't:version'?: string
  'h-Reply-To'?: string
  'o:testmode'?: boolean
}

function urlEncodeObject(object: {[s: string]: any}) {
  return Object.keys(object).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(object[key])).join('&')
}

export function sendMail(data: EmailData) {
  const dataUrlEncoded = urlEncodeObject(data)
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': dataUrlEncoded.length.toString()
    },
    body: dataUrlEncoded
  }

  return fetch(`${MAILGUN_API_BASE_URL}/messages`, options)
}