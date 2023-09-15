import { useState, useEffect, useRef } from "react";

export default function TypeWriter({ text }) {
  const index = useRef(0);

  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCurrentText((value) => value + text.charAt(index.current));
      index.current += 1;

      if (index.current === text.length) {
        clearTimeout(timeOut);
      }
    }, 100);

    return () => {
      clearTimeout(timeOut);
    };
  }, [currentText]);

  return <>{currentText}</>;
}
