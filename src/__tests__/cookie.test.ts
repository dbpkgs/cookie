import cookie from '../index';

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
