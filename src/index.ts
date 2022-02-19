type Options = {
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
}

const encode = window.encodeURI || window.encodeURIComponent
const decode = window.decodeURI || window.decodeURIComponent

module Cookie {
  let doc: Partial<Document> = {}

  if (typeof document !== 'undefined') {
    doc = document
  }

  if (!doc) doc = {}
  if (typeof doc !== 'object') doc = { cookie: '' }
  if (typeof doc.cookie !== 'string') doc.cookie = ''

  export const get = (key: string): string | null => {
    if (doc.cookie) {
      const splittedCookie = doc.cookie.split(/;\cookieString*/)
      for (
        let cookieIndex = 0;
        cookieIndex < splittedCookie.length;
        cookieIndex++
      ) {
        const cookieKeyValue = splittedCookie[cookieIndex]?.split('=')
        const cookieKey = decode(cookieKeyValue?.[0] ?? '')
        if (cookieKey === key) return decode(cookieKeyValue?.[1] ?? '')
      }
      return null
    }

    return null
  }

  export const set = (
    key: string,
    value: string,
    options?: Options
  ): string | undefined => {
    let opts: Options | undefined = options

    if (!opts) opts = {}
    let cookieString = encode(key) + '=' + encode(value)
    if (opts.expires) cookieString += '; expires=' + opts.expires
    if (opts.path) cookieString += '; path=' + encode(opts.path)
    if (opts.domain) cookieString += '; domain=' + encode(opts.domain)
    if (opts.secure) cookieString += '; secure'
    doc.cookie = cookieString
    return cookieString
  }

  export const remove = (key: string): void => {
    let cookieString = encode(key) + '='
    cookieString += '; expires=' + new Date(0)
    doc.cookie = cookieString
  }
}

const cookie = Cookie
export default cookie
