import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  'ship': 'We ship packages from the USA to Ghana safely and efficiently. You can track your shipment in real-time on our Tracking page. Would you like to get a quote?',
  'usa': 'Yes, we specialize in shipping from the USA to Ghana. Our cargo and freight forwarding services ensure your packages arrive safely.',
  'ghana': 'We are based in Ghana at C22/U/26 Community 22, Tema. We ship packages from the USA to Ghana and provide local delivery services.',
  'location': 'Our office is located at C22/U/26 Community 22, Tema, Ghana. You can also reach us at +233 54 675 7801.',
  'address': 'Our office is located at C22/U/26 Community 22, Tema, Ghana.',
  'electronics': 'Yes, we sell electronic gadgets and accessories! Visit our Shop page to browse our selection of phones, laptops, tablets, and more.',
  'shop': 'You can buy electronics from our online shop. We have phones, laptops, tablets, smartwatches, and accessories. Check out the Shop page!',
  'track': 'You can track your shipment by entering your tracking number on our Tracking page. You\'ll see real-time updates on your package location.',
  'tracking': 'To track your shipment, go to the Tracking page and enter your tracking number. We provide live updates at every stage.',
  'price': 'Our pricing depends on the size, weight, and destination of your package. Contact us for a free quote!',
  'cost': 'Shipping costs vary based on package details. Please contact us or use our quote request form for accurate pricing.',
  'contact': 'You can reach us at +233 54 675 7801 or email us at billwealth1@gmail.com. Our office is at C22/U/26 Community 22, Tema.',
  'phone': 'You can reach us at +233 54 675 7801. We\'re available 24/7 for your logistics needs.',
  'email': 'You can email us at billwealth1@gmail.com. We typically respond within 24 hours.',
  'time': 'Delivery time depends on the shipping method. Air freight typically takes 5-10 business days, while sea freight takes 4-8 weeks.',
  'delivery': 'We offer door-to-door delivery services in Ghana. Your package will be delivered directly to your specified address.',
  'packaging': 'We provide professional packaging supplies and services to ensure your items are protected during transit.',
  'customs': 'Yes, we handle customs documentation and clearance for all international shipments to ensure smooth delivery.',
  'hello': 'Hello! Welcome to Bill Express Logistics. How can I help you today? I can assist with shipping from USA to Ghana, tracking, electronics, and more.',
  'hi': 'Hi there! How can I help you with your logistics needs today?',
  'help': 'I can help you with:\n- Shipping from USA to Ghana\n- Tracking your shipments\n- Buying electronics\n- Getting quotes\n- Contact information\nWhat would you like to know?',
};

const defaultResponse = "I'm not sure about that. I can help you with shipping from USA to Ghana, tracking shipments, buying electronics, or providing our contact information. What would you like to know?";

function getBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [keyword, response] of Object.entries(botResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return defaultResponse;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Hello! Welcome to Bill Express Logistics. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#D7263D] text-white rounded-full shadow-lg hover:bg-[#b51d32] hover:scale-110 transition-all duration-300"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#D7263D] text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Bill Express AI</h3>
                <p className="text-xs text-white/70">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                    message.sender === 'user'
                      ? 'bg-[#D7263D] text-white rounded-br-md'
                      : 'bg-white text-[#111111] rounded-bl-md shadow-sm border border-gray-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#D7263D] focus:bg-white transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2.5 bg-[#D7263D] text-white rounded-xl hover:bg-[#b51d32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
