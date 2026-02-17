'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Mail, Plus, Search, Send, Star } from 'lucide-react'

export function LandingShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
      {/* Payment Method — spans 2 cols */}
      <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-1">Payment Method</h3>
        <p className="text-xs text-muted-foreground mb-5">
          All transactions are secure and encrypted.
        </p>

        <div className="space-y-4">
          <div className="flex gap-3">
            <RadioPill label="Card" checked />
            <RadioPill label="PayPal" />
            <RadioPill label="Apple Pay" />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Name on Card</label>
            <div className="mt-1.5 h-9 w-full rounded-md border border-input bg-background px-3 flex items-center">
              <span className="text-sm text-muted-foreground">John Doe</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground">Card Number</label>
              <div className="mt-1.5 h-9 w-full rounded-md border border-input bg-background px-3 flex items-center">
                <span className="text-sm text-muted-foreground">1234 5678 9012 3456</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">CVV</label>
              <div className="mt-1.5 h-9 w-full rounded-md border border-input bg-background px-3 flex items-center">
                <span className="text-sm text-muted-foreground">123</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground">Month</label>
              <div className="mt-1.5 h-9 w-full rounded-md border border-input bg-background px-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">MM</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Year</label>
              <div className="mt-1.5 h-9 w-full rounded-md border border-input bg-background px-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">YYYY</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="flex -space-x-2 mb-4">
          <div className="h-10 w-10 rounded-full border-2 border-card overflow-hidden">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/20">
              <span className="text-xs font-medium text-primary">NV</span>
            </div>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-card bg-muted flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">KJ</span>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-card bg-muted flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">AB</span>
          </div>
        </div>
        <h3 className="text-base font-semibold mb-1">No Team Members</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Invite your team to collaborate on this project.
        </p>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted/50 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Invite Members
        </button>
      </div>

      {/* Notifications / Settings */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-1">Notifications</h3>
        <p className="text-xs text-muted-foreground mb-5">
          Choose what you want to be notified about.
        </p>
        <div className="space-y-4">
          <SwitchRow label="Push Notifications" description="Send to device" defaultChecked />
          <SwitchRow label="Email Notifications" description="Daily digest email" />
          <SwitchRow label="Marketing Emails" description="Product updates" />
        </div>
      </div>

      {/* Chat / Message Input */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col">
        <h3 className="text-base font-semibold mb-1">Chat</h3>
        <p className="text-xs text-muted-foreground mb-4">Send a message to your team.</p>
        <div className="flex-1 space-y-3 mb-4">
          <div className="flex gap-2">
            <div className="h-7 w-7 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-medium text-primary">
              A
            </div>
            <div className="rounded-lg rounded-tl-none bg-muted px-3 py-2 text-xs">
              Hey! How&apos;s the project going?
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <div className="rounded-lg rounded-tr-none bg-primary px-3 py-2 text-xs text-primary-foreground">
              Almost done! Deploying today.
            </div>
            <div className="h-7 w-7 shrink-0 rounded-full bg-secondary flex items-center justify-center text-[10px] font-medium text-secondary-foreground">
              Y
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-9 rounded-md border border-input bg-background px-3 flex items-center">
            <span className="text-xs text-muted-foreground">Type a message...</span>
          </div>
          <button className="h-9 w-9 rounded-md bg-primary flex items-center justify-center text-primary-foreground shrink-0">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search + Results */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 h-9 rounded-md border border-input bg-background px-3 mb-4">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search components...</span>
        </div>
        <div className="space-y-2">
          <SearchResult name="Button" description="Clickable actions" />
          <SearchResult name="Card" description="Content container" />
          <SearchResult name="Dialog" description="Modal overlay" />
          <SearchResult name="Input" description="Text entry field" />
        </div>
        <p className="text-[11px] text-muted-foreground mt-3 text-center">50+ results</p>
      </div>

      {/* Accordion */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-4">FAQ</h3>
        <AccordionDemo />
      </div>

      {/* Badges + Rating */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-5">
        <div>
          <h3 className="text-base font-semibold mb-3">Status</h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold bg-primary text-primary-foreground">
              Active
            </span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold bg-secondary text-secondary-foreground">
              Pending
            </span>
            <span className="inline-flex items-center rounded-full border border-destructive/50 px-2.5 py-0.5 text-[11px] font-semibold text-destructive">
              Error
            </span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
              Draft
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-3">Rating</h3>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">4.0 / 5</span>
          </div>
        </div>
      </div>

      {/* Skeleton Loading */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-4">Loading...</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-9 w-full animate-pulse rounded-md bg-muted" />
        </div>
      </div>

      {/* Alert Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-3">
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Check your email</p>
              <p className="text-xs text-muted-foreground mt-1">
                We sent a verification link to your email address.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 mt-0.5 shrink-0 text-destructive font-bold text-sm flex items-center justify-center">
              !
            </div>
            <div>
              <p className="text-sm font-medium text-destructive">Something went wrong</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your session has expired. Please log in again.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkbox + Radio */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-4">Preferences</h3>
        <div className="space-y-3">
          <CheckboxRow label="I agree to the terms and conditions" defaultChecked />
          <CheckboxRow label="Send me promotional emails" />
          <CheckboxRow label="Enable two-factor authentication" defaultChecked />
        </div>
        <div className="border-t border-border mt-5 pt-5">
          <p className="text-xs font-medium text-foreground mb-3">How did you hear about us?</p>
          <RadioGroup />
        </div>
      </div>

      {/* Progress / Slider Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-1">Price Range</h3>
        <p className="text-xs text-muted-foreground mb-5">
          Set your budget range ($200 – $800).
        </p>
        <SliderDemo />

        <div className="border-t border-border mt-5 pt-5">
          <h3 className="text-base font-semibold mb-3">Progress</h3>
          <div className="space-y-3">
            <ProgressBar label="Design" value={85} />
            <ProgressBar label="Development" value={62} />
            <ProgressBar label="Testing" value={30} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Mini interactive components ── */

function RadioPill({ label, checked = false }: { label: string; checked?: boolean }) {
  return (
    <div
      className={`flex-1 h-9 rounded-md border text-xs font-medium flex items-center justify-center cursor-default transition-colors ${
        checked
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border bg-background text-muted-foreground'
      }`}
    >
      {label}
    </div>
  )
}

function SwitchRow({
  label,
  description,
  defaultChecked = false,
}: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
          on ? 'bg-primary' : 'bg-input'
        }`}
      >
        <span
          className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${
            on ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

function SearchResult({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted/50 transition-colors cursor-default">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
    </div>
  )
}

function AccordionDemo() {
  const [open, setOpen] = useState<number | null>(0)
  const items = [
    { q: 'Is it accessible?', a: 'Yes. All components follow WAI-ARIA patterns.' },
    { q: 'Is it customizable?', a: 'Absolutely. You own the code and can modify anything.' },
    { q: 'Does it support dark mode?', a: 'Yes, light and dark themes work out of the box.' },
  ]
  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between py-3 text-sm font-medium text-left hover:underline"
          >
            {item.q}
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                open === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              open === i ? 'max-h-24 pb-3' : 'max-h-0'
            }`}
          >
            <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CheckboxRow({
  label,
  defaultChecked = false,
}: {
  label: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`h-4 w-4 shrink-0 rounded border transition-colors flex items-center justify-center ${
          checked ? 'bg-primary border-primary' : 'border-input bg-background'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-2.5 h-2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </button>
      <span className="text-xs text-foreground/80 group-hover:text-foreground transition-colors">
        {label}
      </span>
    </label>
  )
}

function RadioGroup() {
  const [selected, setSelected] = useState('social')
  const options = [
    { value: 'social', label: 'Social Media' },
    { value: 'search', label: 'Search Engine' },
    { value: 'referral', label: 'Referral' },
    { value: 'other', label: 'Other' },
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setSelected(opt.value)}
          className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
            selected === opt.value
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-foreground hover:bg-muted/50'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function SliderDemo() {
  const [value, setValue] = useState(60)
  return (
    <div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-sm"
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-[11px] text-muted-foreground">$200</span>
        <span className="text-[11px] font-medium text-foreground">
          ${200 + Math.round((value / 100) * 600)}
        </span>
        <span className="text-[11px] text-muted-foreground">$800</span>
      </div>
    </div>
  )
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
