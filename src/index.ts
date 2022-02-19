type Options = {
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
};

const encode = window.encodeURI || window.encodeURIComponent;
const decode = window.decodeURI || window.decodeURIComponent;

module Cookie {
  let doc: Partial<Document> = {};

  if (typeof document !== 'undefined') {
    doc = document;
  }

  if (!doc) doc = {};
  if (typeof doc !== 'object') doc = { cookie: '' };
  if (typeof doc.cookie !== 'string') doc.cookie = '';

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
  export const get = (key: string): string | null => {
    if (doc.cookie) {
      const splittedCookie = doc.cookie.split(/;\cookieString*/);
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
  export const set = (key: string, value: string, options?: Options): string | undefined => {
    let opts: Options | undefined = options;

    if (!opts) opts = {};
    let cookieString = encode(key) + '=' + encode(value);
    if (opts.expires) cookieString += '; expires=' + opts.expires;
    if (opts.path) cookieString += '; path=' + encode(opts.path);
    if (opts.domain) cookieString += '; domain=' + encode(opts.domain);
    if (opts.secure) cookieString += '; secure';
    doc.cookie = cookieString;
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
  export const remove = (key: string): void => {
    let cookieString = encode(key) + '=';
    cookieString += '; expires=' + new Date(0);
    doc.cookie = cookieString;
  };
}

const cookie = Cookie;
export default cookie;
