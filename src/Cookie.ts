interface Options {
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}

export const encode = global?.window?.encodeURIComponent;
export const decode = global?.window?.decodeURIComponent;

export default class Cookie {
  private doc: Partial<Document> | undefined | string;
  constructor(domDocument?: Partial<Document> | string) {
    this.doc = domDocument;

    if (typeof domDocument === 'object') {
      this.doc = domDocument;
    }

    if (!this.doc) this.doc = {};
    if (typeof this.doc !== 'object') this.doc = { cookie: '' };
    if (typeof this.doc.cookie !== 'string') this.doc.cookie = '';
  }

  /**
   * This method will get your cookies from the browser with the specified key
   *
   * @param {string} key - The cookie string used to uniquely identify the cookie in the browser
   *
   * @returns {string | null} - The return value of the found cookie with the specified key provided
   *
   * @example
   * cookie.get("session_value")
   *
   */
  get = (key: string): string | null => {
    if (typeof this.doc === 'object' && this.doc.cookie) {
      const splittedCookie = this.doc.cookie.split(/;\cookieString*/);
      for (let cookieIndex = 0; cookieIndex < splittedCookie.length; cookieIndex++) {
        const cookieKeyValue = splittedCookie[cookieIndex]?.split('=');
        const cookieKey = decode(cookieKeyValue?.[0] ?? '');
        if (cookieKey === key) return decode(cookieKeyValue?.[1] ?? '');
      }
      return null;
    }

    return null;
  };

  /**
   * This method will set your cookies to the browser the specified key and value provided.
   * If options are provided the value option values will also be set in the cookie storage in the browser
   *
   * @param {string} key - The cookie string used to uniquely identify the cookie in the browser
   *
   * @param {string} value - The value of the cookie you need to set
   *
   * @param {Options} options - The optional parameters to pass when setting the cookie
   *
   * @returns {string | undefined} - The return value of the set cookie
   *
   * @example
   * cookie.set('session_value', 'Uxc70_67gGuHHvAmTy10a', {
   *    expires: new Date(2022, 03, 13),
   *    path: '',
   *    secure: true
   * })
   *
   */
  set = (key: string, value: string, options?: Options): string | undefined => {
    let opts: Options | undefined = options;

    if (!opts) opts = {};
    let cookieString = encode(key) + '=' + encode(value);
    if (opts.expires) cookieString += '; expires=' + opts.expires;
    if (opts.path) cookieString += '; path=' + encode(opts.path);
    if (opts.domain) cookieString += '; domain=' + encode(opts.domain);
    if (opts.secure) cookieString += '; secure';

    if (typeof this.doc === 'object') {
      this.doc.cookie = cookieString;
    }

    return cookieString;
  };

  /**
   * This method will remove your cookie from the browser with the specified key
   *
   * @param {string} key - The cookie string used to uniquely identify the cookie in the browser
   *
   * @example
   * cookie.remove("session_value")
   */
  remove = (key: string): void => {
    let cookieString = encode(key) + '=';
    cookieString += '; expires=' + new Date(0);
    if (typeof this.doc === 'object') {
      this.doc.cookie = cookieString;
    }
  };
}

// const cookie = new Cookie(global?.window?.document);
// export const Cookies = Cookie;
// export default cookie;
