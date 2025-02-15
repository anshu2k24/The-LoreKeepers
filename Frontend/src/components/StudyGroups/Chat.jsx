import React, { useState, useEffect } from "react";
import { db, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, updateDoc, arrayUnion } from "../../firebase/firebase";
import { FcLike, FcDislike } from "react-icons/fc";
import Picker from "emoji-picker-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [user, setUser] = useState(null);

  // Get the current user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Load messages from Firestore in real-time
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        reactions: doc.data().reactions || [], // Ensure reactions array exists
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [user]);

  // Track online users
  useEffect(() => {
    if (!user) return;

    const userStatusRef = doc(db, "status", user.uid);
    const updateStatus = async (status) => {
      await updateDoc(userStatusRef, {
        status,
        lastChanged: serverTimestamp(),
      });
    };

    updateStatus("online");
    const unsubscribe = onSnapshot(collection(db, "status"), (snapshot) => {
      const users = snapshot.docs
        .filter((doc) => doc.data().status === "online")
        .map((doc) => doc.id);
      setOnlineUsers(users);
    });

    return () => {
      updateStatus("offline");
      unsubscribe();
    };
  }, [user]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !user) return;
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      user: user.displayName || user.email,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
      reactions: [], // Initialize reactions as an empty array
    });
    setNewMessage("");
    setIsTyping(false);
  };

  // Handle adding a reaction to a message
  const handleAddReaction = async (messageId, reaction) => {
    const messageRef = doc(db, "messages", messageId);
    await updateDoc(messageRef, {
      reactions: arrayUnion(reaction), // Add the reaction to the array
    });
  };

  // Handle emoji selection
  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-[600px] bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-sm">
      {/* Online Users */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Online Users:</h3>
        <div className="flex gap-2 mt-1">
          {onlineUsers.map((uid) => (
            <div key={uid} className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">{uid}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 mb-2 ${
              msg.user === user.displayName || msg.user === user.email
                ? "justify-end" // Your messages on the right
                : "justify-start" // Others' messages on the left
            }`}
          >
            {/* Profile Picture (only for others' messages) */}
            {msg.user !== user.displayName && msg.user !== user.email && (
              <img
                src={msg.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
            {/* Message Bubble */}
            <div
              className={`p-3 rounded-lg shadow-sm max-w-[70%] ${
                msg.user === user.displayName || msg.user === user.email
                  ? "bg-blue-500 text-white" // Your message color
                  : "bg-gray-200 text-gray-800" // Others' message color
              }`}
            >
              <strong>{msg.user}:</strong> {msg.text}
              <span className="text-xs text-gray-400 ml-2">
                {msg.timestamp?.toDate().toLocaleTimeString()}
              </span>
              {/* Message Reactions */}
              {msg.reactions?.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {msg.reactions.map((reaction, index) => (
                    <span key={index} className="text-sm">
                      {reaction === "like" ? <FcLike /> : <FcDislike />}
                    </span>
                  ))}
                </div>
              )}
              {/* Reaction Buttons */}
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleAddReaction(msg.id, "like")}
                  className="text-sm text-gray-400 hover:text-blue-500"
                >
                  👍
                </button>
                <button
                  onClick={() => handleAddReaction(msg.id, "dislike")}
                  className="text-sm text-gray-400 hover:text-red-500"
                >
                  👎
                </button>
              </div>
            </div>
            {/* Profile Picture (only for your messages) */}
            {msg.user === user.displayName || msg.user === user.email && (
              <img
                src={msg.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="text-sm text-gray-500 mb-2">
          {user.displayName} is typing...
        </div>
      )}

      {/* Message Input */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          😊
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-16">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            setIsTyping(e.target.value.trim() !== "");
          }}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 p-2 border rounded-lg bg-white text-gray-800"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;