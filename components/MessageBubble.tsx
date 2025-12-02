import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Role } from '../types';
import { LogoIcon, GlobeIcon, LinkIcon } from './Icons';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 group animate-fade-in-up`}>
      <div className={`flex max-w-[90%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-xl overflow-hidden flex items-center justify-center mt-1 shadow-lg ring-1 ring-white/10">
          {isUser ? (
             <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <LogoIcon className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`
            px-5 py-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-lg relative overflow-hidden
            ${isUser 
              ? 'bg-white text-black rounded-tr-sm font-medium' 
              : 'glass-panel text-gray-100 rounded-tl-sm border border-white/10'}
          `}>
             {/* Subtle Gradient Overlay for AI */}
             {!isUser && <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>}

             <div className="relative z-10 markdown-content">
                <ReactMarkdown 
                    components={{
                        h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-3 mt-1 text-white" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2 mt-4 text-white" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-2 mt-3 text-white uppercase tracking-wider" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-4 space-y-1 text-gray-300" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-4 space-y-1 text-gray-300" {...props} />,
                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                        p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                        a: ({node, ...props}) => <a className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 decoration-indigo-400/30 transition-colors" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                        code: ({node, ...props}) => {
                            // @ts-ignore
                            const isBlock = props.className?.includes('language-');
                            return isBlock ? (
                                <code className="block bg-black/50 border border-white/10 rounded-lg p-3 my-3 text-xs md:text-sm font-mono text-gray-200 overflow-x-auto" {...props} />
                            ) : (
                                <code className="bg-white/10 rounded px-1.5 py-0.5 text-xs font-mono text-indigo-200" {...props} />
                            );
                        },
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-500/50 pl-4 py-1 my-3 bg-white/5 rounded-r-lg italic text-gray-400" {...props} />,
                    }}
                >
                    {message.text}
                </ReactMarkdown>
             </div>
             
             {/* Streaming Indicator */}
             {message.isStreaming && (
               <div className="mt-2 flex gap-1">
                   <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce animation-delay-2000"></span>
                   <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce animation-delay-4000"></span>
               </div>
             )}

             {/* Web Search Sources */}
             {message.sources && message.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
                    <p className="text-[10px] uppercase font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                        <GlobeIcon className="w-3 h-3" />
                        Sources
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {message.sources.map((source, idx) => (
                            <a 
                                key={idx} 
                                href={source.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-2 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs text-indigo-300 transition-colors max-w-full"
                            >
                                <LinkIcon className="w-3 h-3 shrink-0" />
                                <span className="truncate max-w-[150px]">{source.title || source.uri}</span>
                            </a>
                        ))}
                    </div>
                </div>
             )}
          </div>
          
          <span className="text-[10px] md:text-xs font-mono text-gray-600 mt-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

      </div>
    </div>
  );
};

export default MessageBubble;