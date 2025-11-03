import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GlobalFocusManager() {
  const location = useLocation();

  useEffect(() => {
    const focused = document.activeElement;
    if (focused && focused instanceof HTMLElement) {
      focused.blur(); // borra foco para que aria-hidden no bloquee
    }
  }, [location]);

  return null;
}
