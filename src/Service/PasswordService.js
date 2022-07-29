const generateString = () => {
  let characters = "abcdefghijklmnopqrstuvwxyz";
  let result = generateChars(characters);
  return randomIntFromInterval(1, 2) === 1 ? result.toUpperCase() : result;
};

const generateNumber = () => {
  const numbers = "0123456789";
  return generateChars(numbers);
};

const generateSpecialChars = () => {
  const specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  return generateChars(specialChars);
};

const generateChars = (chars) => {
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatePassword = (length) => {
  let result = "";

  //length cannot be less than 5
  if (length < 5) throw Object.assign(new Error("Too little"), { code: 500 });
  if (length > 40) throw Object.assign(new Error("Too big"), { code: 500 });

  for (let i = 0; i < length; i++) {
    let passwordCharacter = "";
    switch (randomIntFromInterval(1, 3)) {
      case 1:
        passwordCharacter = generateString();
        break;
      case 2:
        passwordCharacter = generateNumber();
        break;
      case 3:
        passwordCharacter = generateSpecialChars();
        break;
      default:
        break;
    }
    result += passwordCharacter;
  }
  return result;
};

export default generatePassword;
