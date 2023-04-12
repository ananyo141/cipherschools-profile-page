import { AiOutlineCompass, AiOutlineDown } from "react-icons/ai";
import { BsSearch, BsBell } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import { FaCopyright } from "react-icons/fa";

import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useReduxHooks";
import { logout } from "../state/features/login/loginSlice";

type Props = {
  className?: string;
};

const Navbar = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <nav className={props.className}>
      <div className="my-2 flex justify-between px-4">
        {/* left side */}
        <div className="flex items-center gap-2">
          <img src={logo} className="h-12 w-12" alt="logo" />
          <h1>CipherSchools</h1>
          <AiOutlineCompass className="ml-5" />
          <h2>Browse</h2>
          <div className="dropdown dropdown-hover">
            <label tabIndex={0}>
              <AiOutlineDown className="block cursor-pointer" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <li className="cursor-pointer">App Development</li>
              <li className="cursor-pointer">Web Development</li>
              <li className="cursor-pointer">Game Development</li>
              <li className="cursor-pointer">Data Structures</li>
              <li className="cursor-pointer">Programming</li>
              <li className="cursor-pointer">Machine Learning</li>
              <li className="cursor-pointer">Data Science</li>
              <li className="cursor-pointer">Others</li>
            </ul>
          </div>
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
          <div className="tooltip tooltip-bottom" data-tip="Logout Here">
            <div className="dropdown">
              <img
                tabIndex={0}
                src={logo}
                className="mx-4 h-7 w-7 cursor-pointer"
                alt="logo"
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
              >
                <li
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <Link to="/login">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
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
