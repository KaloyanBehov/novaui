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
    <div ref={ref} className="max-w-2xl mx-auto rounded-xl border border-border bg-card shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
        <Terminal className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">Terminal</span>
      </div>
      <div className="p-5 font-mono text-sm space-y-1.5 min-h-[120px]">
        {/* Completed lines */}
        {completedLines.map((idx) => (
          <div key={`done-${idx}`}>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground">{LINES[idx].text}</span>
            </div>
            {LINES[idx].output && (
              <div className="flex items-center gap-2 ml-4 mt-0.5">
                <span className="text-green-500 text-xs">{LINES[idx].output}</span>
              </div>
            )}
          </div>
        ))}

        {/* Currently typing line */}
        {started && lineIndex < LINES.length && (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground">
                {LINES[lineIndex].text.slice(0, charIndex)}
              </span>
              <span className="inline-block w-[7px] h-[18px] bg-foreground animate-pulse rounded-[1px]" />
            </div>
            {showOutput && LINES[lineIndex].output && (
              <div className="flex items-center gap-2 ml-4 mt-0.5">
                <span className="text-green-500 text-xs">{LINES[lineIndex].output}</span>
              </div>
            )}
          </div>
        )}

        {/* Idle cursor after all lines are done */}
        {lineIndex >= LINES.length && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground select-none">$</span>
            <span className="inline-block w-[7px] h-[18px] bg-foreground animate-pulse rounded-[1px]" />
          </div>
        )}
      </div>
    </div>
  )
}
