import { useState } from 'react'

export default function useVisualMode (newMode) {
  const [mode, setMode] = useState(newMode)
  const [history, setHistory] = useState([newMode])

  function transition(newMode, replace = false) { 
    if(!replace) {
      setMode(newMode)
      setHistory(prevHistory => [...prevHistory, newMode])
    } else {
      setHistory(prevHistory => [
        ...prevHistory.slice(0, prevHistory.length - 1),
        newMode
      ])
      setMode(newMode)
    }
  }

  function back() {
    if (history.length < 2) {
      return
    } else {
      setHistory(prevHistory => prevHistory.slice(0, prevHistory.length -1))
      const lastMode = history.slice(0, history.length -1)[history.length -2]
      setMode(lastMode)
    }
  }
  return { mode, transition, back }
}
