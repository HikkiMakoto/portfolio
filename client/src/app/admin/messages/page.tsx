"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { EnvelopeIcon, TrashIcon, EyeIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [showArchived]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredMessages = showArchived
        ? response.data.filter((msg: Contact) => msg.archived)
        : response.data.filter((msg: Contact) => !msg.archived);
      setMessages(filteredMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/contacts/${id}`,
        { read: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update local state
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === id ? { ...msg, read: true } : msg
        )
      );
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
      alert("Failed to mark message as read");
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/contacts/${id}`,
        { archived: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update local state
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== id)
      );
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error archiving message:", error);
      alert("Failed to archive message");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update local state
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== id)
      );
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage contact messages from your portfolio visitors
          </p>
        </div>
        <button
          onClick={() => setShowArchived(!showArchived)}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
            showArchived
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {showArchived ? "View Active Messages" : "View Archived"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {showArchived ? "Archived Messages" : "Messages"}
            </h2>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {messages.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No messages found.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {messages.map((message) => (
                  <li
                    key={message._id}
                    className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      selectedMessage?._id === message._id
                        ? "bg-indigo-50 dark:bg-indigo-900/20"
                        : ""
                    } ${!message.read ? "font-semibold" : ""}`}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (!message.read) {
                        handleMarkAsRead(message._id);
                      }
                    }}
                  >
                    <div className="px-4 py-4">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {message.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {message.subject || "No subject"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                        {message.message}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedMessage ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {selectedMessage.subject || "No subject"}
                </h2>
                <div className="flex space-x-2">
                  {!showArchived && (
                    <button
                      onClick={() => handleArchive(selectedMessage._id)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      title="Archive"
                    >
                      <ArchiveBoxIcon className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      From: {selectedMessage.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email: {selectedMessage.email}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date: {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 flex justify-end">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${
                    selectedMessage.subject || "Your message"
                  }`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full flex items-center justify-center p-8">
              <div className="text-center">
                <EyeIcon className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No message selected
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Select a message from the list to view its contents.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}