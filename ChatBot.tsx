import React, { useState } from 'react';
import { X, Send, Bot, Minimize2, Maximize2, User, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ChatBot: React.FC = () => {
  const { chatOpen, setChatOpen, currentPage } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant for AMLI TalentEdge. I can help you with candidate management, job postings, analytics, and more. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ["Find top candidates", "Schedule interviews", "Generate reports", "Help with settings"]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const getContextualResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Context-aware responses based on current page
    if (currentPage === 'candidates' && lowerInput.includes('candidate')) {
      return "I can see you're on the candidates page. I can help you filter candidates, schedule interviews, or provide insights about specific candidates. What would you like to do?";
    }
    
    if (currentPage === 'jobs' && lowerInput.includes('job')) {
      return "You're currently viewing job postings. I can help you create new job postings, optimize existing ones, or suggest AI-powered sourcing strategies. What do you need help with?";
    }
    
    if (currentPage === 'dashboard' && lowerInput.includes('report')) {
      return "I can generate various reports for you including hiring analytics, channel performance, and AI insights. Would you like me to create a specific report?";
    }

    // General responses based on keywords
    if (lowerInput.includes('interview')) {
      return "I can help you schedule interviews, generate AI-powered interview questions, or analyze interview performance. I can also help you set up bulk interview scheduling. What specific interview task do you need help with?";
    }
    
    if (lowerInput.includes('candidate') || lowerInput.includes('hire')) {
      return "I can assist with candidate management tasks like filtering by AI scores, scheduling communications, or moving candidates through your hiring pipeline. What would you like to do?";
    }
    
    if (lowerInput.includes('report') || lowerInput.includes('analytics')) {
      return "I can generate comprehensive reports on hiring metrics, AI performance, channel effectiveness, and bias reduction scores. What type of analytics would you like to see?";
    }
    
    if (lowerInput.includes('bias') || lowerInput.includes('fair')) {
      return "I can help you configure bias mitigation settings, review your current bias reduction score (currently 94%), or explain how our AI ensures fair hiring practices. What would you like to know?";
    }
    
    if (lowerInput.includes('ai') || lowerInput.includes('score')) {
      return "Our AI system provides resume scoring, interview analysis, and psychometric assessments. I can explain how these scores are calculated or help you adjust AI sensitivity settings. What would you like to know?";
    }

    // Default helpful response
    return "I'm here to help with all aspects of your talent management. I can assist with candidate screening, interview scheduling, report generation, system configuration, and much more. Could you tell me more about what you're trying to accomplish?";
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        isBot: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsTyping(true);
      
      // Simulate bot response with context awareness
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getContextualResponse(inputText),
          isBot: true,
          timestamp: new Date(),
          suggestions: inputText.toLowerCase().includes('interview') 
            ? ["Schedule interview", "Generate questions", "View calendar"]
            : inputText.toLowerCase().includes('candidate')
            ? ["Filter candidates", "Send communication", "View profiles"]
            : inputText.toLowerCase().includes('report')
            ? ["Hiring analytics", "AI performance", "Channel metrics"]
            : ["Show candidates", "Create job posting", "View analytics", "Help with settings"]
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    sendMessage();
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!chatOpen) return null;

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[32rem]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-navy-blue to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <span className="font-semibold">AI Assistant</span>
            {!isMinimized && (
              <div className="text-xs text-blue-100">Always here to help</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:text-blue-200 transition-colors focus:ring-2 focus:ring-white rounded p-1"
            aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={() => setChatOpen(false)}
            className="text-white hover:text-blue-200 transition-colors focus:ring-2 focus:ring-white rounded p-1"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs ${message.isBot ? 'order-2' : 'order-1'}`}>
                  <div className={`px-4 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                      : 'bg-navy-blue text-white'
                  }`}>
                    {message.text}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${message.isBot ? 'text-left' : 'text-right'}`}>
                    {formatTimestamp(message.timestamp)}
                  </div>
                  
                  {/* Suggestions */}
                  {message.isBot && message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {message.isBot && (
                  <div className="w-6 h-6 bg-gradient-to-r from-navy-blue to-blue-600 rounded-full flex items-center justify-center order-1 mr-2 mt-1 flex-shrink-0">
                    <Bot size={12} className="text-white" />
                  </div>
                )}
                
                {!message.isBot && (
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center order-2 ml-2 mt-1 flex-shrink-0">
                    <User size={12} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-6 h-6 bg-gradient-to-r from-navy-blue to-blue-600 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <Bot size={12} className="text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-200 bg-white">
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => handleSuggestionClick("Show me top candidates")}
                className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200 hover:bg-blue-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                <Zap size={12} />
                Top Candidates
              </button>
              <button
                onClick={() => handleSuggestionClick("Generate hiring report")}
                className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200 hover:bg-green-100 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
              >
                <Zap size={12} />
                Reports
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything about talent management..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-blue focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-navy-blue text-white p-2 rounded-lg hover:bg-navy-blue/90 transition-colors focus:ring-2 focus:ring-navy-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;