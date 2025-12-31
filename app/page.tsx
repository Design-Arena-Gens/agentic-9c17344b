'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Message {
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: '👋 স্বাগতম! Welcome to MD Siam Islam! আমি আপনাকে কিভাবে সাহায্য করতে পারি?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [showMenu, setShowMenu] = useState(true)
  const [inputValue, setInputValue] = useState('')

  const faqData: { [key: string]: string } = {
    'delivery': '📦 ডেলিভারি সাধারণত ৩-৫ কার্যদিবসের মধ্যে হয়ে থাকে। Delivery usually takes 3-5 business days.',
    'payment': '💳 আমরা ক্যাশ অন ডেলিভারি, বিকাশ, নগদ এবং রকেট গ্রহণ করি। We accept Cash on Delivery, bKash, Nagad & Rocket.',
    'return': '🔄 ১৪ দিনের মধ্যে রিটার্ন করা যাবে। You can return within 14 days.',
    'contact': '📞 যোগাযোগ: +880 1XXX-XXXXXX | Email: contact@mdsiam.com',
    'hours': '🕐 সেবার সময়: সকাল ৯টা - রাত ৯টা | Service hours: 9 AM - 9 PM'
  }

  const products = [
    '👕 Men\'s Clothing - পুরুষদের পোশাক',
    '👗 Women\'s Clothing - মহিলাদের পোশাক',
    '👟 Footwear - জুতা',
    '💼 Accessories - এক্সেসরিজ'
  ]

  const handleButtonClick = (action: string) => {
    const userMessage: Message = {
      text: action,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    setTimeout(() => {
      let botResponse = ''

      if (action === 'View Products' || action === 'পণ্য দেখুন') {
        botResponse = '🛍️ আমাদের পণ্য তালিকা | Our Products:\n\n' + products.join('\n\n') + '\n\n📱 আরো জানতে আমাদের ওয়েবসাইট ভিজিট করুন!'
      } else if (action === 'Talk to Admin' || action === 'এডমিনের সাথে কথা বলুন') {
        botResponse = '👤 অনুগ্রহ করে একটু অপেক্ষা করুন, আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে। Please wait, our team will contact you shortly. \n\n📞 জরুরী যোগাযোগ: +880 1XXX-XXXXXX'
      } else if (action === 'FAQ' || action === 'প্রশ্ন ও উত্তর') {
        botResponse = '❓ সচরাচর জিজ্ঞাসিত প্রশ্ন | Frequently Asked Questions:\n\n1️⃣ ডেলিভারি সময় | Delivery Time\n2️⃣ পেমেন্ট পদ্ধতি | Payment Methods\n3️⃣ রিটার্ন নীতি | Return Policy\n4️⃣ যোগাযোগ | Contact Info\n5️⃣ সেবার সময় | Service Hours\n\nকোন প্রশ্ন টাইপ করুন বা নম্বর পাঠান!'
      }

      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setShowMenu(true)
    }, 800)
  }

  const handleQuickReply = (question: string) => {
    const userMessage: Message = {
      text: question,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    setTimeout(() => {
      let botResponse = faqData[question.toLowerCase()] || '🤔 দুঃখিত, আমি বুঝতে পারিনি। Sorry, I didn\'t understand. অনুগ্রহ করে মেনু থেকে নির্বাচন করুন।'

      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 600)
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    const userMessage: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    const lowerInput = inputValue.toLowerCase()
    setTimeout(() => {
      let botResponse = ''

      if (lowerInput.includes('delivery') || lowerInput.includes('ডেলিভারি')) {
        botResponse = faqData['delivery']
      } else if (lowerInput.includes('payment') || lowerInput.includes('পেমেন্ট') || lowerInput.includes('বিকাশ')) {
        botResponse = faqData['payment']
      } else if (lowerInput.includes('return') || lowerInput.includes('রিটার্ন')) {
        botResponse = faqData['return']
      } else if (lowerInput.includes('contact') || lowerInput.includes('যোগাযোগ') || lowerInput.includes('ফোন')) {
        botResponse = faqData['contact']
      } else if (lowerInput.includes('hours') || lowerInput.includes('সময়') || lowerInput.includes('time')) {
        botResponse = faqData['hours']
      } else if (lowerInput.includes('product') || lowerInput.includes('পণ্য') || lowerInput.includes('কি আছে')) {
        botResponse = '🛍️ আমাদের পণ্য তালিকা | Our Products:\n\n' + products.join('\n\n')
      } else if (lowerInput.includes('price') || lowerInput.includes('দাম') || lowerInput.includes('কত')) {
        botResponse = '💰 দামের জন্য অনুগ্রহ করে নির্দিষ্ট পণ্যের নাম বলুন অথবা আমাদের এডমিনের সাথে যোগাযোগ করুন। For pricing, please specify the product or contact our admin.'
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('হাই') || lowerInput.includes('হ্যালো')) {
        botResponse = '👋 হ্যালো! Hello! আমি কিভাবে সাহায্য করতে পারি? How can I help you?'
      } else {
        botResponse = '🤖 ধন্যবাদ আপনার বার্তার জন্য! Thanks for your message! আমাদের টিম শীঘ্রই রিপ্লাই করবে। Our team will reply soon. এদিকে মেনু থেকে অপশন সিলেক্ট করতে পারেন। Meanwhile, you can select from the menu.'
      }

      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 600)

    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.avatar}>MS</div>
          <div className={styles.headerText}>
            <h1>MD Siam Islam</h1>
            <p className={styles.status}>
              <span className={styles.onlineDot}></span> সবসময় সক্রিয় | Always Active
            </p>
          </div>
        </div>
      </div>

      <div className={styles.chatContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === 'user' ? styles.userMessage : styles.botMessage
            }`}
          >
            <div className={styles.messageContent}>
              {msg.text.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
            <div className={styles.timestamp}>
              {msg.timestamp.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}
      </div>

      {showMenu && (
        <div className={styles.menuContainer}>
          <div className={styles.menuButtons}>
            <button
              className={styles.menuButton}
              onClick={() => handleButtonClick('View Products')}
            >
              🛍️ পণ্য দেখুন<br />View Products
            </button>
            <button
              className={styles.menuButton}
              onClick={() => handleButtonClick('Talk to Admin')}
            >
              👤 এডমিনের সাথে<br />Talk to Admin
            </button>
            <button
              className={styles.menuButton}
              onClick={() => handleButtonClick('FAQ')}
            >
              ❓ প্রশ্ন ও উত্তর<br />FAQ
            </button>
          </div>
          <div className={styles.quickReplies}>
            <button
              className={styles.quickReply}
              onClick={() => handleQuickReply('delivery')}
            >
              📦 ডেলিভারি
            </button>
            <button
              className={styles.quickReply}
              onClick={() => handleQuickReply('payment')}
            >
              💳 পেমেন্ট
            </button>
            <button
              className={styles.quickReply}
              onClick={() => handleQuickReply('return')}
            >
              🔄 রিটার্ন
            </button>
          </div>
        </div>
      )}

      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="টাইপ করুন... Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className={styles.sendButton} onClick={handleSendMessage}>
          ➤
        </button>
      </div>
    </div>
  )
}
