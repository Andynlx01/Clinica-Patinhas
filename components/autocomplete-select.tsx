"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"

interface AutocompleteSelectProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function AutocompleteSelect({
  options,
  value,
  onChange,
  placeholder = "Digite ou selecione",
}: AutocompleteSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState(value)
  const [filteredOptions, setFilteredOptions] = useState(options)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = options.filter((option) => option.toLowerCase().includes(search.toLowerCase()))
    setFilteredOptions(filtered)
  }, [search, options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option: string) => {
    onChange(option)
    setSearch(option)
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange("")
    setSearch("")
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-foreground/10 rounded transition-colors"
            >
              <X size={18} className="text-foreground/50" />
            </button>
          )}
          <ChevronDown size={18} className={`text-foreground/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors border-b border-border/50 last:border-b-0 ${
                value === option ? "bg-primary/20 text-primary font-medium" : "text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {isOpen && search && filteredOptions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-4 text-center text-foreground/60">
          Nenhuma opção encontrada
        </div>
      )}
    </div>
  )
}
