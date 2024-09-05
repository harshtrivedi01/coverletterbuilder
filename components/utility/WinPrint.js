import { MdPictureAsPdf } from "react-icons/md";

const WinPrint = () => {

const print = () => {
    window.print();
  };

  return (
    <button
      aria-label="Print Resume"
      className="exclude-print fixed bottom-5 right-10 font-bold rounded-full bg-white text-yellow-500 shadow-lg border-2 border-white"
      onClick={print}
    >
      <MdPictureAsPdf className="w-10 h-10" title="Print Resume" />
    </button>
  );
};

export default WinPrint;
