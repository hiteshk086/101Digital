const words = [
  'Got',
  'ability',
  'shop',
  'recall',
  'fruit',
  'easy',
  'dirty',
  'giant',
  'shaking',
  'ground',
  'weather',
  'lesson',
  'almost',
  'square',
  'forward',
  'bend',
  'cold',
  'broken',
  'distant',
  'adjective.',
];
function randomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
export const getRandNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};
export const getRandomWord = () => {
  return words[randomNumber(0, words.length - 1)];
};

export const makeid = (length: number) => {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
