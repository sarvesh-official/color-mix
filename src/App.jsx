import { LockIcon, UnlockIcon } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PALETTE_SIZE = 5;

const ColorPlate = ({ color, lockstatus, onIconClick, index }) => {
  const handleCopy = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    toast.success("Copied to clipboard");
  };
  let colorValue = color.replace("#", "");
  return (
    <div
      style={{ backgroundColor: color }}
      className="flex items-center text-xl justify-center font-medium pt-48"
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <p
          className="hover:cursor-pointer p-2 font-bold text-2xl tracking-wide"
          onClick={handleCopy}
        >
          {colorValue.toUpperCase()}
        </p>
        <p
          className="cursor-pointer"
          onClick={() => {
            onIconClick(index);
          }}
        >
          {lockstatus ? <LockIcon /> : <UnlockIcon />}
        </p>
      </div>
    </div>
  );
};

const generateRandomColor = () => {
  let colorCode = "#";
  for (let i = 0; i < 3; i++) {
    let colorInt = Math.random() * 256;
    colorCode = colorCode + parseInt(colorInt).toString(16).padStart(2, "0");
  }
  return colorCode;
};

function App() {
  const [lockStatusArray, setLockStatusArray] = useState(
    Array.from({ length: PALETTE_SIZE }, () => {
      return false;
    })
  );
  const [colors, setColors] = useState(
    Array.from({ length: PALETTE_SIZE }, generateRandomColor)
  );

  document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space") {
      generateNewColorPalette();
    }
  };

  const generateNewColorPalette = () => {
    let newColors = [];

    for (let i = 0; i < PALETTE_SIZE; i++) {
      if (lockStatusArray[i]) {
        newColors[i] = colors[i];
      } else {
        newColors[i] = generateRandomColor();
      }
    }
    setColors(newColors);
  };

  const toggleLock = (index) => {
    const newLockArray = [...lockStatusArray];
    newLockArray[index] = !newLockArray[index];
    setLockStatusArray(newLockArray);
  };

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer position="bottom-center" />
      <div className="h-24 flex items-center justify-between px-6 md:px-8 lg:px-12">
        <h1 className="text-4xl font-bold text-amber-500">Color Mix</h1>
        <button className="bg-amber-500 px-3 py-2 rounded hover:bg-amber-600">
          Download
        </button>
      </div>
      <div className="grow grid grid-cols-1 md:grid-cols-5">
        {colors.map((color, index) => {
          return (
            <ColorPlate
              color={color}
              key={index}
              lockstatus={lockStatusArray[index]}
              onIconClick={toggleLock}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
