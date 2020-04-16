import { useState } from "react";
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);

  function transition(initialMode) {
    return setMode(initialMode);
  }

  return { mode, transition };
}
