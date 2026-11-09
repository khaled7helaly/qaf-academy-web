/**
 * hooks/useMediaQuery.js
 * Subscribes to a CSS media query and re-renders when it changes.
 * Used to swap entrance animations that would otherwise overflow on mobile.
 */

import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);

    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
