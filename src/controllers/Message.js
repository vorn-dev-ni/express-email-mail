import { sendEmail } from "../middleware/NodeMailer.js";
import Message from "../model/UserMessage.js";

const getAllMessage = async (req, res, next) => {
  const { email } = req.query;
  console.log("query", req.query);

  if (email) {
    const query = await Message.find({ email: { $regex: req.query.email } })
      .sort({ id: "asc" })
      .select("-__v");

    if (query.length <= 0) {
      return next("Email is not found");
    }

    return res.status(200).json({
      data: query,
      query: req.query,
    });
  }

  const query = await Message.find({}).sort({ id: 1 });

  return res.status(200).json({
    data: query,
    query: req.query,
  });
};

const postMessage = async (req, res, next) => {
  const { email } = req.body;
  try {
    const result = await Message.create({ email });
    console.log(result);
    await sendEmail({email})
    return res.status(200).json({
      data: email,
      message: "successful",
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  } 
};
const deleteSingleMessage = async (req, res, next) => {
  try {
    const result = await Message.findByIdAndDelete(req.params.messageId);
    console.log(result);

    return res.status(200).json({
      data: result.email,
      message: "Message has been delete",
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};
export default { getAllMessage, postMessage, deleteSingleMessage };
