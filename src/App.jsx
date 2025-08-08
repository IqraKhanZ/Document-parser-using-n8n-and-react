import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your chatbot assistant. How can I help you today?", sender: 'bot' }
  ])
  const [inputText, setInputText] = useState('')
  const [sessionId] = useState(() => 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9))
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (userInput) => {
    try {
      console.log('Sending message with sessionId:', sessionId);
      
      const response = await fetch('https://anythingman.app.n8n.cloud/webhook/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          sessionId: sessionId,
          timestamp: new Date().toISOString()
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        // Try to get error details from response
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Get response text first to check if it's empty
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      if (!responseText.trim()) {
        console.warn('Empty response received from webhook');
        return "I received your message, but the server didn't provide a response.";
      }

      // Check if it looks like JSON
      if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
        try {
          const data = JSON.parse(responseText);
          console.log('Parsed JSON response:', data);
          return data.output || data.reply || data.message || data.response || data.text || "I received your message, but I'm not sure how to respond right now.";
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          return "I received your message, but there was an issue processing the response format.";
        }
      } else {
        // Treat as plain text response
        console.log('Treating response as plain text');
        return responseText.trim();
      }
      
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      if (error.name === 'SyntaxError') {
        return "I received your message, but there was an issue processing the response format.";
      }
      return `Sorry, I'm having trouble connecting right now (${error.message}). Please try again later.`;
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user'
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    const currentInput = inputText;
    setInputText(''); // Clear input box immediately

    // Send message to webhook and get bot response
    const botResponseText = await sendMessage(currentInput);
    
    const botResponse = {
      id: Date.now() + 1,
      text: botResponseText,
      sender: 'bot'
    }
    
    setMessages(prev => [...prev, botResponse])
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h1>Chat Assistant</h1>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="message-input"
        />
        <button 
          onClick={handleSendMessage}
          className="send-button"
          disabled={inputText.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
