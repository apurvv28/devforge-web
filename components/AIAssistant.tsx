'use client'

import { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Send, Bot, User, Sparkles,
  Loader2, Trash2, ChevronDown,
} from 'lucide-react'

/* ── Shared open/close context ──────────────────────────── */
interface AIAssistantContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const AIAssistantContext = createContext<AIAssistantContextType>({
  isOpen: false,
  setIsOpen: () => {},
})

export function AIAssistantProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AIAssistantContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AIAssistantContext.Provider>
  )
}

export const useAIAssistant = () => useContext(AIAssistantContext)

/* ── Types ──────────────────────────────────────────────── */
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTIONS = [
  'How do I install DevForge?',
  'What does devforge init do?',
  'How to set up LLM providers?',
  'Explain offline mode',
]

/* ── Component ──────────────────────────────────────────── */
export function AIAssistant() {
  const { isOpen, setIsOpen } = useAIAssistant()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom()
    }
  }, [messages, isOpen, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, setIsOpen])

  const handleScroll = () => {
    const container = messagesContainerRef.current
    if (!container) return
    const { scrollTop, scrollHeight, clientHeight } = container
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100)
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsStreaming(true)

    const assistantId = crypto.randomUUID()
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, assistantMessage])

    try {
      abortRef.current = new AbortController()

      const chatHistory = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
        signal: abortRef.current.signal,
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error || `Request failed (${response.status})`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break

            try {
              const parsed = JSON.parse(data)
              if (parsed.error) throw new Error(parsed.error)
              if (parsed.content) {
                accumulated += parsed.content
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantId ? { ...m, content: accumulated } : m
                  )
                )
              }
            } catch {
              // Skip malformed SSE chunks
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      const errorText = err instanceof Error ? err.message : 'Something went wrong'
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: `⚠️ ${errorText}. Please try again.` }
            : m
        )
      )
    } finally {
      setIsStreaming(false)
      abortRef.current = null
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const clearChat = () => {
    if (isStreaming) {
      abortRef.current?.abort()
    }
    setMessages([])
    setIsStreaming(false)
  }

  /* ── Markdown renderer with table support ───────────────── */
  const renderContent = (text: string) => {
    // Split by code blocks first
    const parts = text.split(/(```[\s\S]*?```)/g)
    return parts.map((part, i) => {
      if (part.startsWith('```')) {
        const lines = part.slice(3, -3).split('\n')
        const lang = lines[0]?.trim() || ''
        const code = lang ? lines.slice(1).join('\n') : lines.join('\n')
        return (
          <div key={i} className="ai-code-block">
            {lang && <div className="ai-code-lang">{lang}</div>}
            <pre><code>{code}</code></pre>
          </div>
        )
      }

      // Process line-based elements (tables, lists, headings)
      const lines = part.split('\n')
      const elements: React.ReactNode[] = []
      let idx = 0

      while (idx < lines.length) {
        const line = lines[idx]

        // Detect markdown table: line with | chars, followed by separator |---|
        if (
          line.includes('|') &&
          idx + 1 < lines.length &&
          /^\s*\|?\s*[-:]+[-|:\s]+\s*\|?\s*$/.test(lines[idx + 1])
        ) {
          const tableRows: string[][] = []
          let tIdx = idx

          // Collect all table rows
          while (tIdx < lines.length && lines[tIdx].includes('|')) {
            const row = lines[tIdx]
              .replace(/^\s*\|/, '')
              .replace(/\|\s*$/, '')
              .split('|')
              .map(cell => cell.trim())
            // Skip separator row
            if (!/^[-:]+$/.test(row.join(''))) {
              tableRows.push(row)
            }
            tIdx++
          }

          if (tableRows.length > 0) {
            const headerRow = tableRows[0]
            const bodyRows = tableRows.slice(1)
            elements.push(
              <div key={`table-${i}-${idx}`} className="ai-table-wrapper">
                <table className="ai-table">
                  <thead>
                    <tr>
                      {headerRow.map((cell, ci) => (
                        <th key={ci}>{renderInlineMarkdown(cell, `th-${i}-${idx}-${ci}`)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>{renderInlineMarkdown(cell, `td-${i}-${idx}-${ri}-${ci}`)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
          idx = tIdx
          continue
        }

        // Normal line — render inline markdown
        if (line.trim()) {
          elements.push(
            <span key={`line-${i}-${idx}`}>
              {renderInlineMarkdown(line, `${i}-${idx}`)}
              {'\n'}
            </span>
          )
        } else {
          elements.push(<span key={`line-${i}-${idx}`}>{'\n'}</span>)
        }
        idx++
      }

      return <span key={i}>{elements}</span>
    })
  }

  const renderInlineMarkdown = (text: string, keyPrefix: string): React.ReactNode => {
    // Handle inline code
    const inlineParts = text.split(/(`[^`]+`)/g)
    return inlineParts.map((ip, j) => {
      if (ip.startsWith('`') && ip.endsWith('`')) {
        return <code key={`${keyPrefix}-${j}`} className="ai-inline-code">{ip.slice(1, -1)}</code>
      }
      // Handle bold
      const boldParts = ip.split(/(\*\*[^*]+\*\*)/g)
      return boldParts.map((bp, k) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${keyPrefix}-${j}-${k}`}>{bp.slice(2, -2)}</strong>
        }
        return <span key={`${keyPrefix}-${j}-${k}`}>{bp}</span>
      })
    })
  }

  return (
    <>
      {/* Backdrop overlay on mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ai-backdrop"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="ai-panel"
            id="ai-assistant-panel"
          >
            {/* Header */}
            <div className="ai-panel-header">
              <div className="ai-panel-header-left">
                <div className="ai-avatar-container">
                  <div className="ai-avatar">
                    <Bot size={18} />
                  </div>
                  <span className="ai-status-dot" />
                </div>
                <div>
                  <h3 className="ai-panel-title">DevForge AI</h3>
                  <p className="ai-panel-subtitle">
                    {isStreaming ? 'Thinking...' : 'Powered by GLM 5.1'}
                  </p>
                </div>
              </div>
              <div className="ai-panel-header-actions">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="ai-header-btn"
                    title="Clear chat"
                    id="ai-clear-chat"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="ai-header-btn"
                  title="Close"
                  id="ai-close-btn"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              className="ai-messages"
              ref={messagesContainerRef}
              onScroll={handleScroll}
            >
              {messages.length === 0 ? (
                <div className="ai-welcome">
                  <div className="ai-welcome-icon">
                    <Sparkles size={28} />
                  </div>
                  <h4 className="ai-welcome-title">How can I help?</h4>
                  <p className="ai-welcome-text">
                    Ask me anything about DevForge — commands, setup, security, deployment, and more.
                  </p>
                  <div className="ai-suggestions">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="ai-suggestion-chip"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`ai-msg ${msg.role === 'user' ? 'ai-msg-user' : 'ai-msg-assistant'}`}
                    >
                      <div className="ai-msg-avatar">
                        {msg.role === 'user' ? (
                          <User size={14} />
                        ) : (
                          <Bot size={14} />
                        )}
                      </div>
                      <div className="ai-msg-bubble">
                        <div className="ai-msg-content">
                          {msg.role === 'assistant' && msg.content === '' && isStreaming ? (
                            <div className="ai-typing">
                              <span /><span /><span />
                            </div>
                          ) : (
                            renderContent(msg.content)
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}

              {/* Scroll to bottom button */}
              <AnimatePresence>
                {showScrollBtn && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={scrollToBottom}
                    className="ai-scroll-btn"
                  >
                    <ChevronDown size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="ai-input-area">
              <div className="ai-input-wrapper">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about DevForge..."
                  className="ai-textarea"
                  rows={1}
                  disabled={isStreaming}
                  id="ai-chat-input"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="ai-send-btn"
                  id="ai-send-btn"
                >
                  {isStreaming ? (
                    <Loader2 size={16} className="ai-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
              <p className="ai-disclaimer">AI responses may not always be accurate. Verify important information.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
