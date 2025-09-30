import { FaYinYang } from "react-icons/fa6";

function Spinner() {
  return (
    <>
      <div role="status" className="min-h-screen w-full flex flex-col justify-center items-center">
        <FaYinYang size={36} className="animate-spin" />
        <p>Please wait...</p>
      </div>
    </>
  );
}

export default Spinner;
