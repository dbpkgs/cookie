import cookie from '../index';
import Cookie, { encode, decode, errorsSchema } from '../Cookie';

describe('"encode"', () => {
  it('should be a properly defined encode function', () => {
    expect(encode).toBeDefined();
    expect(typeof encode).toBe('function');
  });

  it('should return a proper encoded string', () => {
    expect(encode('/ ? : @ & = + $')).toBe('%2F%20%3F%20%3A%20%40%20%26%20%3D%20%2B%20%24');
  });
});

describe('"decode"', () => {
  it('should be a properly defined decode function', () => {
    expect(decode).toBeDefined();
    expect(typeof decode).toBe('function');
  });

  it('should return correct decoded value from an encoded string', () => {
    const encodedValue = encode('https://example.com');
    const decodedValue = decode(encodedValue);
    expect(decodedValue).toBe('https://example.com');
  });
});

describe('"Cookie"', () => {
  it('should be properly defined', () => {
    const cookieNull = new Cookie();

    expect(Cookie).toBeDefined();
    expect(cookieNull).toBeInstanceOf(Cookie);
  });

  it('should return proper cookie results even if no document is available', () => {
    const cookieNull = new Cookie();

    expect(cookieNull.set('Hello', 'Hello')).toBe('Hello=Hello');
    expect(cookieNull.get('Hello')).toBe('Hello');
  });

  it('should return proper results even if no valid document object was provided', () => {
    const cookieNull = new Cookie('Hello');

    expect(cookieNull.set('Hello', 'Hello')).toBe('Hello=Hello');
    expect(cookieNull.get('Hello')).toBe('Hello');
  });
});

describe('"cookie.get"', () => {
  it('should be a properly defined cookie.get function', () => {
    expect(cookie.get).toBeDefined();
    expect(typeof cookie.get).toBe('function');
  });

  it('should return null when getting a cookie that does not exists in cookie storage', () => {
    expect(cookie.get('MY_COOKIE')).toBeNull();
  });

  it('should return a valid cookie when getting a cookie already set in cookie storage', () => {
    expect(cookie.get).toBeDefined();
    expect(cookie.set).toBeDefined();
    expect(cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5')).toBe(
      'test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5',
    );
    expect(cookie.get('test_session')).toBe('Ab7MNgGyql89hpPalIdgql01gTjkaGb5');
  });

  it('should set a cookie to cookie storage and return null when getting a cookie with the wrong key', () => {
    const sessionCookie = cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5');

    expect(cookie.set).toBeDefined();
    expect(sessionCookie).toBe('test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5');
    expect(cookie.get('test-sessions')).toBeNull();
  });

  it('should get the decoded cookie and return a proper cookie string when a cookie was set with options', () => {
    const sessionCookie = cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5', {
      expires: new Date('Fri Apr 15 2022 '),
      path: '/',
      secure: true,
      domain: 'https://example.com',
    });

    expect(cookie.set).toBeDefined();
    expect(sessionCookie).toBe(
      `test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5; expires=${new Date(
        'Fri Apr 15 2022',
      )}; path=%2F; domain=https%3A%2F%2Fexample.com; secure`,
    );

    expect(cookie.get).toBeDefined();
    expect(cookie.get('test_session')).toBe('Ab7MNgGyql89hpPalIdgql01gTjkaGb5');
  });

  it('should throw an error when getting a cookie value with a non-string key', () => {
    expect(() => {
      // Explicitly force use of non-string key when getting a token
      //@ts-expect-error (2345) :argument of type 'number' is not assignable to parameter of type 'string'.
      cookie.get(1);
    }).toThrowError(errorsSchema.key);
  });
});

describe('"cookie.set"', () => {
  it('should be a properly defined cookie.set function', () => {
    expect(cookie.set).toBeDefined();
    expect(typeof cookie.set).toBe('function');
  });

  it('should set the cookie properly in the cookie storage and return the set cookie', () => {
    const sessionCookie = cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5');

    expect(sessionCookie).toBe('test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5');
  });

  it('should return a proper cookie string when getting a cookie set cookie with cookie options', () => {
    const sessionCookie = cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5', {
      expires: new Date('Fri Apr 15 2022 '),
      path: '/',
      secure: true,
      domain: 'https://example.com',
    });

    expect(cookie.set).toBeDefined();
    expect(sessionCookie).toBe(
      `test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5; expires=${new Date(
        'Fri Apr 15 2022',
      )}; path=%2F; domain=https%3A%2F%2Fexample.com; secure`,
    );
  });

  it('should throw an error when setting a cookie with a non-string key', () => {
    expect(() => {
      // Explicitly force use of non-string key when setting a cookie to cookie storage
      //@ts-expect-error (2345) : Argument of type 'number' is not assignable to parameter of type 'string'.
      cookie.set(1, 'Hello');
    }).toThrowError(errorsSchema.key);
  });

  it('should throw an error when setting a cookie with a non-string value', () => {
    expect(() => {
      // Explicitly force use of non-string value when setting a cookie to cookie storage
      //@ts-expect-error (2345) : Argument of type 'number' is not assignable to parameter of type 'string'.
      cookie.set('test', 1);
    }).toThrowError(errorsSchema.value);
  });

  it('should throw an error when setting a cookie with a non-object options', () => {
    expect(() => {
      // Explicitly force use of non-object options when setting a cookie to cookie storage
      // @ts-expect-error (2559) : Type '1' has no properties in common with type 'Options'.
      cookie.set('test', 'test', 1);
    }).toThrowError(errorsSchema.options);
  });

  it('should throw an error when setting a cookie with a non-string domain option in the options object', () => {
    expect(() => {
      cookie.set('test', 'test', {
        // Explicitly force use of non-string value for domain option when setting a cookie to cookie storage
        //@ts-expect-error (2345) : Type 'number' is not assignable to type 'string'.
        domain: 1,
      });
    }).toThrowError(errorsSchema.options_domain);
  });

  it('should throw an error when setting a cookie with a non-date expires (value not a date) option in the options object', () => {
    expect(() => {
      cookie.set('test', 'test', {
        // Explicitly force use of value which is not a date on the expires option when setting a cookie to cookie storage
        //@ts-expect-error (2345) : Type 'number' is not assignable to type 'Date'.
        expires: 1,
      });
    }).toThrowError(errorsSchema.options_expires);
  });

  it('should throw an error when setting a cookie with a non-string path option in the options object', () => {
    expect(() => {
      cookie.set('test', 'test', {
        // Explicitly force use of non-string value for path option when setting a cookie to cookie storage
        //@ts-expect-error (2345) : Type 'number' is not assignable to type 'string'.t
        path: 1,
      });
    }).toThrowError(errorsSchema.options_path);
  });

  it('should throw an error when setting a cookie with a non-boolean secure option in the options object', () => {
    expect(() => {
      cookie.set('test', 'test', {
        // Explicitly force use of non-string value for path option when setting a cookie to cookie storage
        //@ts-expect-error (2345) : Type 'number' is not assignable to type 'boolean | undefined'.
        secure: 1,
      });
    }).toThrowError(errorsSchema.options_secure);
  });
});

describe('"cookie.remove"', () => {
  it('should be a properly defined cookie.remove function', () => {
    expect(cookie.remove).toBeDefined();
    expect(typeof cookie.remove).toBe('function');
  });

  it('should return null when a set cookie is deleted from the cookie storage', () => {
    const sessionCookie = cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5');

    expect(cookie.set).toBeDefined();
    expect(cookie.get).toBeDefined();
    expect(cookie.remove).toBeDefined();
    expect(sessionCookie).toBe('test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5');
    expect(cookie.get('test_session')).toBe('Ab7MNgGyql89hpPalIdgql01gTjkaGb5');

    cookie.remove('test_session');
    expect(cookie.get('test_session')).toBeNull();
  });

  it('should throw an error when removing a cookie value with a non-string key', () => {
    expect(() => {
      // Explicitly force use of non-string key when removing a token
      //@ts-expect-error (2345) :argument of type 'number' is not assignable to parameter of type 'string'.
      cookie.remove(1);
    }).toThrowError(errorsSchema.key);
  });
});
