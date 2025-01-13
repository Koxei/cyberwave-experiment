import React from 'react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  onSubmit,
  isLoading,
}) => {
  return (
    <form 
      onSubmit={onSubmit}
      className="p-4 bg-black/50 backdrop-blur-sm border-t border-userMessage"
    >
      <div className="max-w-3xl mx-auto flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Write something c:"
          className="flex-1 bg-container p-2 rounded border border-userMessage text-white font-arcade"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-container border border-userMessage text-userMessage rounded font-arcade hover:opacity-80 transition-opacity disabled:opacity-50"
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;