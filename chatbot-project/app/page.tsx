'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import { User, createNewUser, getUserInfo } from '../services/api';
import { generateCareerResponse } from '../services/gemini';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [conversationState, setConversationState] = useState('awaitingYesNo');
  const [userName, setUserName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSentInitialMessage = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!hasSentInitialMessage.current) {
      setTimeout(() => {
        addBotMessage("新規ユーザーですか？（はい/いいえ）");
      }, 1000);
      hasSentInitialMessage.current = true;
    }
  }, []);

  const addBotMessage = (text: string) => {
    const botMessage: Message = {
      text,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const convertJapaneseNumbers = (input: string): string => {
    const japaneseNumbers: { [key: string]: string } = {
      '０': '0', '１': '1', '２': '2', '３': '3', '４': '4',
      '５': '5', '６': '6', '７': '7', '８': '8', '９': '9'
    };
    return input.split('').map(char => japaneseNumbers[char] || char).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const convertedInput = convertJapaneseNumbers(input.trim());
      const userMessage: Message = {
        text: convertedInput,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      if (conversationState === 'awaitingYesNo') {
        if (convertedInput.toLowerCase() === 'はい') {
          addBotMessage("ようこそ！お名前は何ですか？");
          setConversationState('awaitingName');
        } else if (convertedInput.toLowerCase() === 'いいえ') {
          addBotMessage('お帰りなさい！セッションIDを入力してください。');
          setConversationState('awaitingSessionId');
        } else {
          addBotMessage("「はい」か「いいえ」で答えてください。新規ユーザーですか？");
        }
      } else if (conversationState === 'awaitingName') {
        await handleNewUser(convertedInput);
      } else if (conversationState === 'awaitingSessionId') {
        await handleReturningUser(convertedInput);
      } else if (conversationState === 'chatting') {
        await handleGeminiResponse(convertedInput);
      }
    }
  };

  const handleNewUser = async (name: string) => {
    try {
      const userData = await createNewUser(name);
      setUserName(userData.name);
      setUser(userData);
      setSessionId(userData.id.toString());
      addBotMessage(`はじめまして、${userData.name}さん！あなたのセッションIDは${userData.id}です。今後のログインのために保存しておいてください。どういったご用件でしょうか？`);
      setConversationState('chatting');
    } catch (error) {
      console.error('Error creating new user:', error);
      addBotMessage("申し訳ありませんが、アカウントの作成中にエラーが発生しました。もう一度お試しください。");
      setConversationState('awaitingYesNo');
    }
  };

  const handleReturningUser = async (sessionIdInput: string) => {
    try {
      const userData = await getUserInfo(sessionIdInput);
      setUserName(userData.name);
      setUser(userData);
      setSessionId(userData.id.toString());
      addBotMessage(`お帰りなさい、${userData.name}さん！セッションを取得しました。今日はどのようにお手伝いできますか？`);
      setConversationState('chatting');
    } catch (error) {
      console.error('Error getting user info:', error);
      addBotMessage("申し訳ありませんが、アカウントが見つかりませんでした。正しいセッションIDを入力したか確認してください。");
      addBotMessage("もう一度セッションIDを入力するか、新しいアカウントを作成する場合は「新規」と入力してください。");
      setConversationState('awaitingSessionId');
    }
  };


  const handleGeminiResponse = async (userInput: string) => {
    try {
      addBotMessage("考えています...");
      const response = await generateCareerResponse(userName, userInput);
      addBotMessage(response);
    } catch (error) {
      console.error('Error generating Gemini response:', error);
      addBotMessage("申し訳ありませんが、応答の生成中にエラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <span className={styles.backButton}>{'<'}</span>
        <span className={styles.title}>キャリアボット</span>
        <span className={styles.menuButton}>☰</span>
      </header>

      <div className={styles.chatContainer}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage}`}>
            {!message.isUser && <img src="/images/doglogo.jpg" alt="Dog!" className={styles.botAvatar} />}
            <div className={styles.messageContent}>
              <div className={styles.messageText}>{message.text}</div>
              <div className={styles.messageTime}>{message.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.actionButton}onClick={() => window.location.href="https://choice-career.com/"}>転職をご希望の方</button>
        <button className={styles.actionButton}onClick={() => window.location.href="https://choice-career.com/"}>キャリア相談をご希望の方</button>
      </div>

      <footer className={styles.footer}>
        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力..."
          />
          <button className={styles.sendButton} type="submit">送信</button>
        </form>
      </footer>
    </main>
  );
}