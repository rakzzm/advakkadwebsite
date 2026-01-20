'use client';

import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  gradient?: boolean;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export default function TypewriterText({ 
  text, 
  className = '', 
  gradient = true,
  style = {},
  as: Component = 'h2'
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  // Gradient style definition
  const gradientStyle: React.CSSProperties = gradient ? {
    background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)', // Indigo to Pink gradient
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block'
  } : {};

  // Intersection Observer to start typing when in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typing effect logic
  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex++;
      setDisplayText(text.slice(0, currentIndex));
      
      if (currentIndex >= text.length) {
        clearInterval(intervalId);
      }
    }, 50); // Typing speed in ms

    return () => clearInterval(intervalId);
  }, [isVisible, text]);

  const isTypingComplete = displayText.length === text.length;

  return (
    <Component 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={elementRef as any}
      className={className}
      style={{ ...gradientStyle, ...style }}
    >
      {displayText}
      <span className="cursor" style={{ opacity: isTypingComplete ? 0 : 1 }}>|</span>
      <style jsx>{`
        .cursor {
          animation: blink 1s step-end infinite;
          color: #ec4899;
          margin-left: 2px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </Component>
  );
}
