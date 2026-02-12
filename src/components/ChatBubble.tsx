interface ChatBubbleProps {
  text: string;
  sender: string;  // permite cualquier string por ahora
}

export default function ChatBubble({ text, sender }: ChatBubbleProps) {
  return (
    <div className={`max-w-md p-4 rounded-3xl ${sender === 'user' ? 'bg-amber-800 ml-auto' : 'bg-gray-600'}`}>
      {text}
    </div>
  );
}