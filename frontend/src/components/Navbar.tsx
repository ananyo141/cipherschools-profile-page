import { AiOutlineCompass, AiOutlineDown } from "react-icons/ai";
import { BsSearch, BsBell } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import { FaCopyright } from "react-icons/fa";

import logo from "../assets/logo.png";

type Props = {
  className?: string;
};

const Navbar = (props: Props) => {
  return (
    <nav className={props.className}>
      <div className="mt-2 flex justify-between px-4">
        {/* left side */}
        <div className="flex items-center gap-2">
          <img src={logo} className="h-12 w-12" alt="logo" />
          <h1>CipherSchools</h1>
          <AiOutlineCompass className="ml-5" />
          <h2>Browse</h2>
          <AiOutlineDown className="cursor-pointer" />
        </div>
        {/* right side */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-4 rounded-full bg-gray-100 p-2">
            <BsSearch className="scale-125" />
            <input
              type="text"
              placeholder="Search and learn"
              className="h-full w-full bg-inherit outline-none"
            />
            <GoSettings className="scale-150" />
          </div>
          <button className="btn-ghost btn-circle btn">
            <div className="indicator">
              <BsBell className="m-1 scale-150" />
              <span className="badge-primary badge badge-xs indicator-item bg-yellow-500"></span>
            </div>
          </button>
          <img src={logo} className="mx-4 h-7 w-7" alt="logo" />
          <FaCopyright color="lime" className="scale-150" />
          <p>234</p>
          <div className="form-control">
            <input
              type="checkbox"
              className="toggle-secondary toggle bg-yellow-500"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
