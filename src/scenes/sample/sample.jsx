
import React from 'react';

const inputClasses = "border border-zinc-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-white";

const sample = () => {
  return (
    <input
      type="text"
      className={inputClasses}
      placeholder="Enter your text..."
    />
  );
};

export default sample;