import { Message } from './message.model'
// import { User } from './../user/user.model'

const getAllMessagesSentByMe = async (req, res) => {
  try {
    const docs = await Message.find({
      sender: req.user._id
    })
      .populate('sender')
      .populate('recipiants')
      .sort({ updatedAt: -1 })
      .limit(20)

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const getAllMessagesSentToMe = async (req, res) => {
  try {
    const docs = await Message.find({
      recipiants: { $in: [req.user._id] }
    })
      .populate('sender')
      .populate('recipiants')
      .sort({ updatedAt: -1 })
      .limit(20)

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const getAllMessagesForConvo = async (req, res) => {
  console.log(req.params.id + ' params ')
  console.log(req.user._id + ' user ')
  try {
    const docs = await Message.find({
      $or: [
        {
          $and: [
            { sender: req.user._id },
            { recipiants: { $in: [req.params.id] } }
          ]
        },
        {
          $and: [
            { sender: req.params.id },
            { recipiants: { $in: [req.user._id] } }
          ]
        }
      ]
    })
      .populate('sender')
      .populate('recipiants')
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
  getAllMessagesSentToMe: getAllMessagesSentToMe,
  getAllMessagesSentByMe: getAllMessagesSentByMe,
  createOne: createOne,
  getAllMessagesForConvo: getAllMessagesForConvo
}
