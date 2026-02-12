interface TestimonioBubbleProps {
  text: string;
  position: 'left' | 'right';
}

export default function TestimonioBubble({ text, position }: TestimonioBubbleProps) {
  return (
    <div className={`max-w-xs p-4 rounded-3xl bg-amber-800/50 text-white text-sm ${position === 'left' ? 'rounded-bl-none' : 'rounded-br-none'}`}>
      {text}
    </div>
  );
}