import Cookie from './Cookie';
const cookie = new Cookie(global?.window?.document || global?.document);
export default cookie;
