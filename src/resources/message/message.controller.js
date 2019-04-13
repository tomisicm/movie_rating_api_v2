import { Message } from './message.model'
// import { User } from './../user/user.model'

const getAllMessages = async (req, res) => {
  /* 
  user1 = User.
  */

  try {
    const docs = await Message.find({
      recievers: {
        $in: ['5c92cf7f89134046ad41fa81']
      }
    })
      .sort({ updatedAt: -1 })
      .limit(20)

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = async (req, res) => {
  const createdBy = req.user._id

  try {
    const doc = await Message.create({ ...req.body, sender: createdBy })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
}

export default {
  getAllMessages: getAllMessages,
  createOne: createOne
}
