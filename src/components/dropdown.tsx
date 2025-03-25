import { useState, useEffect, useRef, JSX } from "react";
import { MoreVertical } from "lucide-react";

// Define the type for dropdown options
export type DropdownOption = {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
};

// Define the type for the dropdown menu component props
interface DropdownMenuProps {
  options: DropdownOption[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Three-dot button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && options.length > 0 && (
        <div className="absolute right-0 mt-2 w-44 bg-white  rounded-lg shadow-lg">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.onClick();
                setIsOpen(false); // Close menu after clicking an option
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
