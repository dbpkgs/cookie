import cookie from '../index';
import Cookie, { encode, decode } from '../Cookie';

test('"encode" is properly defined', () => {
  expect(encode).toBeDefined();
  expect(typeof encode).toBe('function');
});

test('"decode" is properly defined', () => {
  expect(decode).toBeDefined();
});

test('Get cookie function is properly defined', () => {
  expect(cookie.get).toBeDefined();
});

test('Set cookie function is properly defined', () => {
  expect(cookie.set).toBeDefined();
});

test('Remove cookie function to be properly defined', () => {
  expect(cookie.remove).toBeDefined();
});

test('Get Cookie to work properly', () => {
  expect(cookie.get('MY_COOKIE')).toBeNull();
});

test('Set cookie to work properly', () => {
  expect(cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5')).toBe(
    'test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5',
  );
});

test('Set cookie and get cookie to work properly', () => {
  expect(cookie.get).toBeDefined();
  expect(cookie.set).toBeDefined();
  expect(cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5')).toBe(
    'test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5',
  );
  expect(cookie.get('test_session')).toBe('Ab7MNgGyql89hpPalIdgql01gTjkaGb5');
});

test('Set cookie and delete cookie to work properly', () => {
  expect(cookie.set).toBeDefined();
  expect(cookie.remove).toBeDefined();
  expect(cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5')).toBe(
    'test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5',
  );
  expect(cookie.get('test_session')).toBe('Ab7MNgGyql89hpPalIdgql01gTjkaGb5');
  expect(cookie.remove('test_session')).toBeUndefined();
  expect(cookie.get('test_session')).toBeNull();
});

test('Set cookie and get wrong cookie to return null', () => {
  expect(cookie.set).toBeDefined();
  expect(cookie.remove).toBeDefined();
  expect(cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5')).toBe(
    'test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5',
  );
  expect(cookie.get('test-sessions')).toBeNull();
});

test('Set cookie with options to return proper cookie string', () => {
  expect(cookie.set).toBeDefined();
  expect(
    cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5', {
      expires: new Date('Fri Apr 15 2022 '),
      path: '/',
      secure: true,
      domain: 'https://example.com',
    }),
  ).toBe(
    `test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5; expires=${new Date(
      'Fri Apr 15 2022',
    )}; path=%2F; domain=https%3A%2F%2Fexample.com; secure`,
  );
});

test('Set cookie with options and get decorded cookie to return proper cookie string', () => {
  expect(cookie.set).toBeDefined();
  expect(cookie.get).toBeDefined();
  expect(
    cookie.set('test_session', 'Ab7MNgGyql89hpPalIdgql01gTjkaGb5', {
      expires: new Date('Fri Apr 15 2022 '),
      path: '/',
      secure: true,
      domain: 'https://example.com',
    }),
  ).toBe(
    `test_session=Ab7MNgGyql89hpPalIdgql01gTjkaGb5; expires=${new Date(
      'Fri Apr 15 2022',
    )}; path=%2F; domain=https%3A%2F%2Fexample.com; secure`,
  );
  expect(cookie.get('test_session')).toBe('Ab7MNgGyql89hpPalIdgql01gTjkaGb5');
});

test('Expect result even if no jest dom available', () => {
  const cookieNull = new Cookie();

  expect(cookieNull.set('Hello', 'Hello')).toBe('Hello=Hello');
  expect(cookieNull.get('Hello')).toBe('Hello');
});

test('Expect result even if no jest dom provided is not a valid document object', () => {
  const cookieNull = new Cookie('Hello');

  expect(cookieNull.set('Hello', 'Hello')).toBe('Hello=Hello');
  expect(cookieNull.get('Hello')).toBe('Hello');
});

test('"encode" to return  correct type even if window.encodeURI is not defined', () => {
  expect(encode('/ ? : @ & = + $')).toBe('%2F%20%3F%20%3A%20%40%20%26%20%3D%20%2B%20%24');
});

test('"decode" to return  correct value', () => {
  expect(decode('https%3A%2F%2Fexample.com')).toBe('https://example.com');
});
