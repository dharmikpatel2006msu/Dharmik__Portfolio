import { useState, useEffect } from "react";

export function useScrollSpy(ids, options = { rootMargin: "-40% 0px -50% 0px" }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [ids, options]);

  return activeId;
}
