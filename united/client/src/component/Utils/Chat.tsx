import { ConnectWithoutContact, WhatsApp } from '@mui/icons-material';
import { Dialog } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messageContainerRef = useRef(null);
  const [opendailog,setOpneDailog]=useState(false)
  const handleopen=()=>{
      setOpneDailog(!opendailog)
  }
  useEffect(() => {
    // Simulate receiving messages from the server
    const receiveMessagesFromServer = () => {
       
      const receivedMessages = ['Hello!', 'How can I help you?', 'Sure, I can assist you with that.'];
      setMessages(receivedMessages);
    };

    // Simulate receiving new messages periodically
    const interval = setInterval(receiveMessagesFromServer, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the message container when new messages are added
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setNewMessage('');

      // Simulate sending the message to the server
      // Replace with your own implementation to send messages to the server
      // For WhatsApp integration, you'll need to make API requests to the WhatsApp Business API
      // to send messages to WhatsApp users
      console.log('Sending message to the server:', newMessage);
    }
  };

  const handleConnectWhatsApp = () => {
    // Logic to connect to WhatsApp
    // Replace with your own implementation
    window.open('https://api.whatsapp.com/send?phone=633434348', '_blank');
  };

  return (
    <div className="messenger">

      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <button
        className="connect-whatsapp-btn p-2 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none"
        onClick={handleopen}
      >
        <WhatsApp />
      </button>
      <Dialog open={opendailog} onClose={handleopen}>
      <div className="message-list" ref={messageContainerRef}>
        {messages.map((message, index) => (
          <div className="message" key={index}>
            {message}
          </div>
        ))}
      </div>
      <ConnectWithoutContact/>
      </Dialog>
    </div>
  );
};

export default Messenger;