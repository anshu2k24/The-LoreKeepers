import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "../components/firebase";
import { FcLike, FcDislike } from "react-icons/fc";
import Picker from "emoji-picker-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const Study = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");

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

  // Load groups from Firestore
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "groups"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groups = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(groups);
    });

    return () => unsubscribe();
  }, [user]);

  // Load messages for the selected group
  useEffect(() => {
    if (!user || !selectedGroup) return;

    const q = query(
      collection(db, "groups", selectedGroup, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        reactions: doc.data().reactions || [],
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [user, selectedGroup]);

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
    if (newMessage.trim() === "" || !user || !selectedGroup) return;
    await addDoc(collection(db, "groups", selectedGroup, "messages"), {
      text: newMessage,
      user: user.displayName || user.email,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
      reactions: [],
    });
    setNewMessage("");
    setIsTyping(false);
  };

  // Handle adding a reaction to a message
  const handleAddReaction = async (messageId, reaction) => {
    if (!selectedGroup) return;
    const messageRef = doc(db, "groups", selectedGroup, "messages", messageId);
    await updateDoc(messageRef, {
      reactions: arrayUnion(reaction),
    });
  };

  // Handle emoji selection
  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Handle creating a new group
  const handleCreateGroup = async () => {
    if (!groupName.trim() || !user) return;
    const newGroup = {
      name: groupName,
      description: groupDesc,
      createdBy: user.uid,
      timestamp: serverTimestamp(),
    };
    await addDoc(collection(db, "groups"), newGroup);
    setGroupName("");
    setGroupDesc("");
  };

  // Handle deleting a group
  const handleDeleteGroup = async (groupId, createdBy) => {
    if (!user || user.uid !== createdBy) {
      alert("You do not have permission to delete this group.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "groups", groupId));
      alert("Group deleted successfully.");
      setSelectedGroup(null);
    } catch (error) {
      console.error("Error deleting group: ", error);
      alert("Failed to delete the group.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="animate-fadeIn p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-5xl font-bold text-neutral-900 mb-8 text-center">
        Study Session
      </h1>

      {/* Group Creation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-6 bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
          Create a New Group
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group Name"
            className="p-2 border rounded-lg flex-1 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={groupDesc}
            onChange={(e) => setGroupDesc(e.target.value)}
            placeholder="Group Description"
            className="p-2 border rounded-lg flex-1 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreateGroup}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Create Group
          </button>
        </div>
      </motion.div>

      {/* Group Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 p-6 bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
          Select a Group
        </h2>
        <div className="flex gap-4 flex-wrap">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedGroup === group.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div onClick={() => setSelectedGroup(group.id)}>
                <h3 className="font-semibold">{group.name}</h3>
                <p className="text-sm">{group.description}</p>
              </div>
              {group.createdBy === user.uid && (
                <button
                  onClick={() => handleDeleteGroup(group.id, group.createdBy)}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Delete Group
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chat Interface */}
      {selectedGroup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col h-[600px] bg-white p-6 border border-gray-300 rounded-xl shadow-lg"
        >
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
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex gap-2 mb-2 ${
                    msg.user === user.displayName || msg.user === user.email
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {msg.user !== user.displayName && msg.user !== user.email && (
                    <img
                      src={msg.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div
                    className={`p-3 rounded-lg shadow-sm max-w-[70%] ${
                      msg.user === user.displayName || msg.user === user.email
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <strong>{msg.user}:</strong> {msg.text}
                    <span className="text-xs text-gray-400 ml-2">
                      {msg.timestamp?.toDate().toLocaleTimeString()}
                    </span>
                    {msg.reactions?.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {msg.reactions.map((reaction, index) => (
                          <span key={index} className="text-sm">
                            {reaction === "like" ? <FcLike /> : <FcDislike />}
                          </span>
                        ))}
                      </div>
                    )}
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
                  {msg.user === user.displayName || msg.user === user.email && (
                    <img
                      src={msg.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Message Input */}
          <div className="flex gap-2 relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
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
              className="flex-1 p-2 border rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Study;