// Sample in-memory storage for messages
let messages = [];

// Get all messages
export const getMessages = (req, res) => {
    res.json(messages);
};

// Send a new message
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