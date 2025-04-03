import {
  useState,
} from "react";

export const  TextInputWithDropDown = ({
  name,
  type,
  placeholder,
  options,
  inputValue,
  setInputValue,
  className
}) => {

  const [suggestions, setSuggestions] = useState(options);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const showDropDown = isDropDownVisible && suggestions.length > 0;

  const handleChange = (e) => {

    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter((option) => 
      option.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const onSelect = (suggestion) => {

    setInputValue(suggestion);
    setIsDropDownVisible(false);
  };

  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        onFocus={() => setIsDropDownVisible(true)}
        onBlur={() => setIsDropDownVisible(false)}
        value={inputValue}
        className={className ? className : 'border border-gray-400 rounded p-2'}
        onChange={handleChange}
        type={type}
      />

      { showDropDown && 
      
        (
          <ul className={'absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10'}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => onSelect(suggestion)}
                className={'px-4 py-2 text-sm cursor-pointer hover:bg-blue-100'}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}