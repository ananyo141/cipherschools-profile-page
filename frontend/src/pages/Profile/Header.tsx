import { useAppSelector } from "../../hooks/useReduxHooks";
import { MdModeEdit } from "react-icons/md";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
};

const Header = (props: Props) => {
  const { name, email, followers } = useAppSelector((state) => state.login);

  return (
    <div className={props.className}>
      <div className="mt-4 bg-[url('assets/profile_bg.png')] bg-cover bg-center">
        <div className="flex justify-between">
          <div className="bg-gradient-to-r from-white to-transparent p-6">
            <div className="relative flex gap-8">
              <img src={logo} className="h-32 w-32" alt="logo" />
              <MdModeEdit
                color="white"
                className="absolute -bottom-4 left-12 h-9 w-9 cursor-pointer rounded-full bg-[#222831] p-1 text-2xl text-white"
              />
              <div>
                <p className="text-xl">Hello,</p>
                <p className="text-3xl font-bold">{name}</p>
                <p className="text-lg italic">{email}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-gradient-to-r from-transparent to-white px-20 py-6">
            <Link to="/followers" className="text-xl font-medium">
              {followers?.length ?? 0} Followers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
