import React from 'react';

const Input = ({ type, name, inputText, setInputText }) => {
  return (
    <div className="relative  w-[90%] mt-6">
      <input
        type={type}
        id={name}
        placeholder=" "
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="peer p-4 pt-6 w-full outline-none 
                   placeholder-transparent border-gray-400 
                   text-gray-200 rounded-md border-[0.5px] 
                   bg-transparent transition-all duration-200 
                   focus:border-white focus:ring-1 focus:ring-white 
                   sm:text-base text-sm"
      />
      <label
        htmlFor={name}
        className={`absolute left-4 text-gray-300 transition-all duration-200
                    top-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-md
                    peer-focus:top-2 peer-focus:text-xs 
                    ${inputText?.length > 0 ? 'top-2 text-xs' : 'top-5 text-md'}`}
      >
        {name}
      </label>
    </div>
  );
};

export default Input;
