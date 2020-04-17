import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace) {
    if (!replace) {
      setHistory(prev => [...prev, newMode]);
    }
    return setMode(newMode);
  }

  function back() {
    if (history.length !== 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    }
  }

  return { mode, transition, back };
}
