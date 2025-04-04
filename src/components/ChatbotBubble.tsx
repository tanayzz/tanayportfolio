
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatbotBubbleProps {
  chatbotUrl: string;
}

const ChatbotBubble = ({ chatbotUrl }: ChatbotBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const { toast } = useToast();
  
  // Close chatbot on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  // Handle easter egg
  const handleBotClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickCount === 4) { // After 5 clicks (0-indexed)
      setShowEasterEgg(true);
      toast({
        title: "Chatbot Easter Egg Found!",
        description: "You've activated the AI assistant's special mode! 🤖✨",
      });
      
      setTimeout(() => {
        setShowEasterEgg(false);
        setClickCount(0);
      }, 5000);
    }
  };
  
  return (
    <>
      {/* Bubble button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <button 
          className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500' : 'bg-blue-600 hover:bg-blue-700'} shine-effect`}
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
          onClick={handleBotClick}
        >
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <div className="relative">
              <MessageCircle size={28} className="text-white" />
              {showEasterEgg && (
                <motion.div 
                  className="absolute -top-1 -right-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <Sparkles size={14} className="text-yellow-300" />
                </motion.div>
              )}
            </div>
          )}
        </button>
        
        {/* Pulsating circle when closed */}
        {!isOpen && (
          <motion.div 
            className="absolute inset-0 rounded-full bg-blue-400"
            initial={{ scale: 0.85, opacity: 0.5 }}
            animate={{ 
              scale: [0.85, 1.1, 0.85], 
              opacity: [0.5, 0.2, 0.5] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
        )}
      </motion.div>

      {/* Chatbot iframe with animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, backdropFilter: 'blur(0px)' }}
            animate={{ 
              opacity: 1, 
              y: 0,
              backdropFilter: 'blur(8px)',
              transition: { type: 'spring', stiffness: 300, damping: 25 } 
            }}
            exit={{ 
              opacity: 0, 
              y: 20, 
              backdropFilter: 'blur(0px)',
              transition: { duration: 0.2 } 
            }}
            className="fixed bottom-24 right-6 z-40 w-[350px] sm:w-[400px] h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
          >
            {/* Glass effect header */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-white/80 backdrop-blur-md z-10 flex items-center justify-between px-4 border-b border-gray-100">
              <div className="flex items-center">
                <Bot size={20} className={`mr-2 ${showEasterEgg ? 'text-blue-500 animate-pulse' : 'text-blue-700'}`} />
                <span className="font-medium text-gray-800">Tanay's Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>
            
            {/* Iframe container */}
            <div className="h-full pt-12 bg-white/95 backdrop-blur-sm">
              <iframe
                src={chatbotUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Tanay's Chatbot"
                className="bg-transparent"
              />
            </div>
            
            {/* Easter egg animation */}
            {showEasterEgg && (
              <motion.div 
                className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-full h-full absolute"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.2, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: 2,
                    repeatType: "reverse" 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl" />
                </motion.div>
                <Sparkles size={40} className="text-blue-500 animate-pulse absolute top-12 right-8" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotBubble;
