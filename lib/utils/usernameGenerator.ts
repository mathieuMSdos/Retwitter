import { customAlphabet } from "nanoid";


export const userNameGenerator = async (user) => {
  const number = "0123456789";
  const name = user.user.name.slice(0, 6);
  const uniqueNumbers = customAlphabet(number, 5)();

  // console.log(`@${name}_${uniqueNumbers}`);

  return `@${name}_${uniqueNumbers}`
};