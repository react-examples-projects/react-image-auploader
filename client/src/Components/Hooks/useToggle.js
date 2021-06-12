import { useState, useCallback, useEffect } from "react";

export default function useToggle() {
  const [isActive, _setActive] = useState(false);
  const setActive = useCallback(() => _setActive((a) => !a), []);
 
  useEffect(() => {
    const fn = (e) => e.keyCode === 27 && isActive && setActive();
    window.addEventListener("keyup", fn);
    return () => window.removeEventListener("keyup", fn);
  }, [isActive, setActive]);

  return [isActive, setActive];
}
