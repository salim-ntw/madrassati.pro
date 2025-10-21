import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { messageAPI } from '../../../api/messages';
import { io } from 'socket.io-client';

export default function Messages() {
  const { teacherId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessageContent, setNewMessageContent] = useState('');
  
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    socket.current = io('http://localhost:4000');
    
    socket.current.on('connect', () => {
      console.log('🔌 Connected to server');
      socket.current.emit('join', teacherId);
    });

    socket.current.on('disconnect', () => {
      console.log('🔌 Disconnected from server');
    });

    socket.current.on('connect_error', (error) => {
      console.error('🔌 Connection error:', error);
    });

    socket.current.on('newMessage', (data) => {
      console.log('📨 New message received:', data);
      
      // Add message to current conversation if it matches
      if (selectedConversation && data.conversationId === selectedConversation.conversationId) {
        setCurrentMessages(prev => {
          // Check if message already exists to prevent duplicates
          const messageExists = prev.some(msg => msg._id === data.message._id);
          if (messageExists) return prev;
          return [...prev, data.message];
        });
      }
      
      // Update conversations list
      setConversations(prev => prev.map(conv => {
        if (conv.conversationId === data.conversationId) {
          return {
            ...conv,
            lastMessage: data.message.content,
            lastMessageTime: formatTime(data.message.timestamp),
            unreadCount: conv.otherUserId === data.message.receiverId.toString() ? conv.unreadCount + 1 : conv.unreadCount
          };
        }
        return conv;
      }));
      
      // If this is a new conversation, reload the conversations list
      const conversationExists = conversations.some(conv => conv.conversationId === data.conversationId);
      if (!conversationExists) {
        loadData();
      }
    });

    socket.current.on('typing', (data) => {
      if (data.senderId === selectedConversation?.otherUserId) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [teacherId, selectedConversation]);

  // Load conversations and contacts on mount
  useEffect(() => {
    // Scroll to top on page load to prevent auto-scroll down
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    loadData();
  }, [teacherId]);

  // Auto-scroll to bottom when new messages arrive (but not on initial load)
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    if (hasInitiallyLoaded && currentMessages.length > 0 && !isInitialLoad) {
      scrollToBottom();
    }
  }, [currentMessages, hasInitiallyLoaded, isInitialLoad]);
  
  useEffect(() => {
    if (currentMessages.length > 0 && !hasInitiallyLoaded) {
      setHasInitiallyLoaded(true);
      // Set initial load to false after a delay to allow proper scroll behavior
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 1000);
    }
  }, [currentMessages, hasInitiallyLoaded]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load conversations and contacts in parallel
      const [conversationsRes, contactsRes] = await Promise.all([
        messageAPI.getConversations(teacherId),
        messageAPI.getContacts(teacherId)
      ]);

      setConversations(conversationsRes.data.data || []);
      setContacts(contactsRes.data.data || []);
      
      console.log('📬 Conversations loaded:', conversationsRes.data.data);
      console.log('👥 Contacts loaded:', contactsRes.data.data);
    } catch (error) {
      console.error('❌ Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (conversation) => {
    try {
      console.log('📖 Selecting conversation:', conversation);
      setSelectedConversation(conversation);
      
      // Reset scroll states when selecting a new conversation
      setIsInitialLoad(true);
      setHasInitiallyLoaded(false);
      
      // Load conversation history
      const response = await messageAPI.getConversationHistory(
        teacherId,
        conversation.otherUserId,
        conversation.childId
      );
      
      console.log('📖 Conversation history loaded:', response.data);
      setCurrentMessages(response.data.data?.messages || []);
      
      // Allow scrolling after a delay
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 500);
    } catch (error) {
      console.error('❌ Error loading conversation history:', error);
      // Set empty messages array on error to prevent white screen
      setCurrentMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const messageData = {
        senderId: teacherId,
        receiverId: selectedConversation.otherUserId,
        childId: selectedConversation.childId,
        content: newMessage.trim()
      };

      // Optimistic update
      const tempMessage = {
        _id: `temp-${Date.now()}`,
        senderId: { _id: teacherId },
        receiverId: { _id: selectedConversation.otherUserId },
        childId: { _id: selectedConversation.childId },
        content: newMessage.trim(),
        timestamp: new Date(),
        read: false
      };

      setCurrentMessages(prev => [...prev, tempMessage]);
      setNewMessage('');

      // Send message
      const response = await messageAPI.sendMessage(messageData);
      
      // Replace temp message with real one
      setCurrentMessages(prev => prev.map(msg => 
        msg._id === tempMessage._id ? response.data.data : msg
      ));

      // Emit socket event for real-time update
      if (socket.current) {
        socket.current.emit('sendMessage', {
          ...messageData,
          message: response.data.data
        });
      }

      // Update conversations list
    setConversations(prev => prev.map(conv => 
        conv.conversationId === selectedConversation.conversationId
        ? { 
            ...conv, 
              lastMessage: newMessage.trim(),
              lastMessageTime: 'Just now',
              unreadCount: 0
          }
        : conv
      ));

    } catch (error) {
      console.error('❌ Error sending message:', error);
      // Remove temp message on error
      setCurrentMessages(prev => prev.filter(msg => msg._id !== `temp-${Date.now()}`));
    }
  };

  const startNewConversation = async () => {
    if (!selectedContact || !newMessageContent.trim()) return;

    try {
      const messageData = {
        senderId: teacherId,
        receiverId: selectedContact.userId,
        childId: selectedContact.childId,
        content: newMessageContent.trim()
      };

      // Send new conversation
      const response = await messageAPI.startConversation(messageData);
      
      // Close modal and reset
      setShowNewMessageModal(false);
      setSelectedContact(null);
      setNewMessageContent('');
      
      // Reload conversations to show the new one
      await loadData();

      // Emit socket event for real-time update
      if (socket.current) {
        socket.current.emit('sendMessage', {
          ...messageData,
          message: response.data.data
        });
      }

    } catch (error) {
      console.error('❌ Error starting conversation:', error);
    }
  };

  const handleTyping = (isTyping) => {
    if (socket.current && selectedConversation) {
      socket.current.emit('typing', {
        senderId: teacherId,
        receiverId: selectedConversation.otherUserId,
        isTyping
      });
    }
    setTyping(isTyping);
  };

  const scrollToBottom = () => {
    if (!isInitialLoad) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now - date) / (1000 * 60);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)} min ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className='p-6 h-full animate-fadeIn flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-6 h-full animate-fadeIn'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-4'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 animate-slideInDown'>Messages</h1>
        <button
          onClick={() => setShowNewMessageModal(true)}
          className='mobile-btn px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 touch-target'
        >
          <span>+</span>
          <span className='hidden sm:inline'>New Message</span>
          <span className='sm:hidden'>New</span>
        </button>
      </div>

      <div className='flex flex-col md:flex-row h-[calc(100vh-180px)] md:h-[calc(100vh-200px)] bg-white rounded-xl shadow-lg overflow-hidden mobile-chat-container'>
        {/* Conversations List */}
        <div className='w-full md:w-1/3 border-r border-gray-200 flex flex-col mobile-conversation-list md:mobile-conversation-list-none'>
          <div className='p-3 md:p-4 border-b border-gray-200 bg-gray-50'>
            <h2 className='text-base md:text-lg font-semibold text-gray-800'>Conversations</h2>
            <p className='text-xs md:text-sm text-gray-600'>{conversations.length} conversations</p>
          </div>
          
          <div className='flex-1 overflow-y-auto hide-scrollbar'>
            {conversations.length === 0 ? (
              <div className='p-4 text-center text-gray-500'>
                <div className='text-4xl mb-2'>💬</div>
                <p>No conversations yet</p>
                <p className='text-sm'>Start messaging parents of your students</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.conversationId}
                  onClick={() => selectConversation(conversation)}
                className={`p-3 md:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors touch-target ${
                    selectedConversation?.conversationId === conversation.conversationId ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold text-gray-800 text-sm md:text-base truncate'>{conversation.otherUserName}</h3>
                      <p className='text-xs md:text-sm text-gray-600 truncate'>Parent of {conversation.childName}</p>
                      <p className='text-xs text-gray-500'>{conversation.childClass}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className='bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0'>
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <p className='text-xs md:text-sm text-gray-600 truncate mb-1'>{conversation.lastMessage}</p>
                <p className='text-xs text-gray-500'>{conversation.lastMessageTime}</p>
              </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className='flex-1 flex flex-col mobile-chat-area'>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className='p-3 md:p-4 border-b border-gray-200 bg-gray-50'>
                <div className='flex items-center justify-between'>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-gray-800 text-sm md:text-base truncate'>{selectedConversation.otherUserName}</h3>
                    <p className='text-xs md:text-sm text-gray-600 truncate'>Parent of {selectedConversation.childName} ({selectedConversation.childClass})</p>
                  </div>
                  <div className='flex items-center gap-2 flex-shrink-0'>
                    <div className='w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full'></div>
                    <span className='text-xs md:text-sm text-gray-600 hidden sm:inline'>Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className='flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 hide-scrollbar'>
                {currentMessages.length === 0 ? (
                  <div className='text-center text-gray-500 mt-8'>
                    <p>No messages yet</p>
                    <p className='text-sm'>Start the conversation below</p>
                  </div>
                ) : (
                  currentMessages.map((message) => {
                    console.log('📨 Rendering message:', message);
                    return (
                      <div
                        key={message._id}
                        className={`flex ${message.senderId?._id?.toString() === teacherId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`mobile-message max-w-xs sm:max-w-sm lg:max-w-md px-3 md:px-4 py-2 rounded-lg ${
                            message.senderId?._id?.toString() === teacherId
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className='text-xs md:text-sm break-words'>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                            message.senderId?._id?.toString() === teacherId ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                            {formatMessageTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                    );
                  })
                )}
                
                {isTyping && (
                  <div className='flex justify-start'>
                    <div className='bg-gray-200 text-gray-800 px-4 py-2 rounded-lg'>
                      <div className='flex space-x-1'>
                        <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce'></div>
                        <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                        <div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className='p-3 md:p-4 border-t border-gray-200'>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    onFocus={() => handleTyping(true)}
                    onBlur={() => handleTyping(false)}
                    placeholder='Type your message...'
                    className='mobile-input flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base'
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className='mobile-btn px-3 md:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target text-sm md:text-base'
                  >
                    <span className='hidden sm:inline'>Send</span>
                    <span className='sm:hidden'>📤</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className='flex-1 flex items-center justify-center'>
              <div className='text-center'>
                <div className='text-6xl mb-4'>💬</div>
                <h3 className='text-xl font-semibold text-gray-600 mb-2'>Select a conversation</h3>
                <p className='text-gray-500'>Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl p-4 md:p-6 w-full max-w-md mobile-modal'>
            <h3 className='text-lg md:text-xl font-semibold mb-4'>Start New Conversation</h3>
            
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Send to:
              </label>
              <select
                value={selectedContact?.userId || ''}
                onChange={(e) => {
                  const contact = contacts.find(c => c.userId === e.target.value);
                  setSelectedContact(contact);
                }}
                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>Select a parent...</option>
                {contacts.map((contact) => (
                  <option key={contact.userId} value={contact.userId}>
                    {contact.name} - Parent of {contact.childName}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Message:
              </label>
              <textarea
                value={newMessageContent}
                onChange={(e) => setNewMessageContent(e.target.value)}
                placeholder='Type your message...'
                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none'
              />
            </div>

            <div className='flex gap-2 justify-end'>
              <button
                onClick={() => setShowNewMessageModal(false)}
                className='px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={startNewConversation}
                disabled={!selectedContact || !newMessageContent.trim()}
                className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}