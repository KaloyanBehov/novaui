'use client'

import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'lucide-react'

interface Line {
  text: string
  output?: string
}

const LINES: Line[] = [
  { text: 'npx novaui-cli init', output: '✓ Project initialized successfully' },
  { text: 'npx novaui-cli add button', output: '✓ Button component added' },
]

const CHAR_DELAY = 45
const LINE_PAUSE = 600
const OUTPUT_PAUSE = 400

export function TypingTerminal() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showOutput, setShowOutput] = useState(false)
  const [completedLines, setCompletedLines] = useState<number[]>([])
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    if (lineIndex >= LINES.length) return

    const currentLine = LINES[lineIndex]

    if (charIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setCharIndex((c) => c + 1)
      }, CHAR_DELAY)
      return () => clearTimeout(timeout)
    }

    if (!showOutput && currentLine.output) {
      const timeout = setTimeout(() => {
        setShowOutput(true)
      }, OUTPUT_PAUSE)
      return () => clearTimeout(timeout)
    }

    if (showOutput || !currentLine.output) {
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, lineIndex])
        setLineIndex((l) => l + 1)
        setCharIndex(0)
        setShowOutput(false)
      }, LINE_PAUSE)
      return () => clearTimeout(timeout)
    }
  }, [started, lineIndex, charIndex, showOutput])

  return (
    <div ref={ref} className="max-w-3xl mx-auto rounded-2xl border border-border/50 bg-card/50 backdrop-blur-md shadow-2xl overflow-hidden group">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-muted/30">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">NovaUI Shell</span>
          </div>
        </div>
      </div>
      <div className="p-8 font-mono text-sm md:text-base space-y-3 min-h-[160px] bg-linear-to-b from-transparent to-primary/5">
        {/* Completed lines */}
        {completedLines.map((idx) => (
          <div key={`done-${idx}`} className="animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex items-center gap-3">
              <span className="text-primary font-bold select-none">~</span>
              <span className="text-foreground font-medium">{LINES[idx].text}</span>
            </div>
            {LINES[idx].output && (
              <div className="flex items-center gap-3 ml-6 mt-1.5">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-green-500/90 text-sm font-medium">{LINES[idx].output}</span>
              </div>
            )}
          </div>
        ))}

        {/* Currently typing line */}
        {started && lineIndex < LINES.length && (
          <div>
            <div className="flex items-center gap-3">
              <span className="text-primary font-bold select-none">~</span>
              <span className="text-foreground font-medium">
                {LINES[lineIndex].text.slice(0, charIndex)}
              </span>
              <span className="inline-block w-2 h-5 bg-primary animate-pulse rounded-sm" />
            </div>
            {showOutput && LINES[lineIndex].output && (
              <div className="flex items-center gap-3 ml-6 mt-1.5 animate-in zoom-in-95 duration-200">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-green-500/90 text-sm font-medium">{LINES[lineIndex].output}</span>
              </div>
            )}
          </div>
        )}

        {/* Idle cursor after all lines are done */}
        {lineIndex >= LINES.length && (
          <div className="flex items-center gap-3">
            <span className="text-primary font-bold select-none">~</span>
            <span className="inline-block w-2 h-5 bg-primary/40 animate-pulse rounded-sm" />
          </div>
        )}
      </div>
    </div>
  )
}
