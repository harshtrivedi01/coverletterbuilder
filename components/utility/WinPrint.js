import { MdPictureAsPdf } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";

const WinPrint = () => {

const print = () => {
    window.print();
  };

  return (
    <button
      aria-label="Print Resume"
      className="font-bold flex"
      onClick={print}
    >
    <IoIosPrint />
    Print
    </button>
  );
};

export default WinPrint;
