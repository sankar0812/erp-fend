import React, { useEffect, useState } from "react";

export const Counterss = ({ target, start, className }) => {
    const [count, setCount] = useState(start || 0);
    const speed = 2000;
  
    useEffect(() => {
      const updateCount = () => {
        const inc = (target - count) / speed; 
  
        if (count < target) {
          setCount((prevCount) => prevCount + inc);
          setTimeout(updateCount, 1);
        } else {
          setCount(target);
        }
      };
  
      updateCount();
  
      return () => clearTimeout();
    }, [count, target]);
  
    return (
      <h1 className={className}>
        {Math.floor(count)} {target === 78 ? "+" : ""}
      </h1>
    );
  };