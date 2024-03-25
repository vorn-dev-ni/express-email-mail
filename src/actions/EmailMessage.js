import Message from "../model/UserMessage.js";


export const messageEmailExist = async (email) => {
  const result = await Message.findOne({ email: email });

  if (result?.email) {
    return result;
  }

  return false;
};
