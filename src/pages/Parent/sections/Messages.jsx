import React from 'react'

export default function Messages({ child }) {
  const [conversations, setConversations] = React.useState([
    {
      id: 'T001',
      teacherName: 'Mr. Ahmed',
      lastMessage: 'Please check the math homework',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      messages: [
        { id: 'M001', sender: 'teacher', content: 'Please check the math homework', timestamp: '2025-01-22 10:30', read: false },
        { id: 'M002', sender: 'parent', content: 'Thanks, we will.', timestamp: '2025-01-22 11:00', read: true }
      ]
    },
    {
      id: 'T002',
      teacherName: 'Ms. Sophia',
      lastMessage: 'The science project is due next week',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      messages: [
        { id: 'M003', sender: 'teacher', content: 'The science project is due next week', timestamp: '2025-01-21 14:00', read: true }
      ]
    }
  ])

  const [selectedConversation, setSelectedConversation] = React.useState(null)
  const [newMessage, setNewMessage] = React.useState('')

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message = {
      id: 'M' + String(Math.floor(Math.random()*10000)).padStart(3,'0'),
      sender: 'parent',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    }

    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { 
            ...conv, 
            messages: [...conv.messages, message],
            lastMessage: newMessage,
            lastMessageTime: 'Just now'
          }
        : conv
    ))

    setNewMessage('')
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  return (
    <div className='p-6 h-full animate-fadeIn'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 animate-slideInDown'>Messages · {child?.name}</h1>

      <div className='flex h-[calc(100vh-200px)] bg-white rounded-xl shadow-lg overflow-hidden'>
        {/* Conversations List */}
        <div className='w-1/3 border-r border-gray-200 flex flex-col'>
          <div className='p-4 border-b border-gray-200 bg-gray-50'>
            <h2 className='text-lg font-semibold text-gray-800'>Teachers</h2>
          </div>
          <div className='flex-1 overflow-y-auto'>
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-gray-800'>{conversation.teacherName}</h3>
                    <p className='text-sm text-gray-600'>{child?.name}'s Teacher</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className='bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center'>
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <p className='text-sm text-gray-600 truncate mb-1'>{conversation.lastMessage}</p>
                <p className='text-xs text-gray-500'>{conversation.lastMessageTime}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className='flex-1 flex flex-col'>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className='p-4 border-b border-gray-200 bg-gray-50'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='font-semibold text-gray-800'>{selectedConversation.teacherName}</h3>
                    <p className='text-sm text-gray-600'>Teacher · {child?.name}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600'>Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'parent'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className='text-sm'>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'parent' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className='p-4 border-t border-gray-200'>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={`Message to ${selectedConversation.teacherName}...`}
                    className='flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <button
                    onClick={sendMessage}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className='flex-1 flex items-center justify-center'>
              <div className='text-center'>
                <div className='text-6xl mb-4'>💬</div>
                <h3 className='text-xl font-semibold text-gray-600 mb-2'>Select a teacher</h3>
                <p className='text-gray-500'>Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



