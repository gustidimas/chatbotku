import { FaYinYang } from "react-icons/fa6";

function Redirecting() {
  return (
    <>
      <div
        role="status"
        className="min-h-screen w-full flex flex-col justify-center items-center"
      >
        <FaYinYang size={36} className="animate-spin" />
        <p>Redirecting...</p>
      </div>
    </>
  );
}

export default Redirecting;
