// import { useState } from "react";

// export default function NumberComponent({number}) {
//   const startValue=0
//   const [display, setDisplay] = useState(startValue)
//   return <span>{number || 0}</span>;
// }
import React, { useState, useEffect, useRef } from "react";

const NumberComponent = ({ number }) => {
  const startValue = 0;
  const [display, setDisplay] = useState(startValue);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useEffect(() => {
    const targetValue = number || 0;
    let currentValue = startValue;

    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;

        if (currentValue < targetValue) {
          const increment = Math.ceil((targetValue - currentValue) / 30); // Adjust the animation speed by changing the denominator
          currentValue = Math.min(
            currentValue + (increment * deltaTime) / 20,
            targetValue
          ); // Adjust the division factor to control animation speed

          setDisplay(parseInt(currentValue));
        } else {
          cancelAnimationFrame(requestRef.current);
        }
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [number]);

  return <span>{display}</span>;
};

export default NumberComponent;
