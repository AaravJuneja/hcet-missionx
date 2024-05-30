let messages = [];

export const getMessages = (req, res) => {
    res.json(messages);
};

export const sendMessage = (req, res) => {
    const { message, sender } = req.body;
    const newMessage = {
        id: messages.length + 1,
        message,
        sender,
        timestamp: new Date()
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
};