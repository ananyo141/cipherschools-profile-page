import { MdModeEdit } from "react-icons/md";

import logo from "../../assets/logo.png";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="bg-[url('assets/profile_bg.png')] bg-cover bg-center">
      <div className="bg-gradient-to-r from-white to-transparent p-6">
        <div className="relative flex gap-8">
          <img src={logo} className="h-32 w-32" alt="logo" />
          <MdModeEdit
            color="white"
            className="absolute -bottom-4 left-12 h-9 w-9 rounded-full bg-[#222831] p-1 text-2xl text-white"
          />
          <div>
            <p className="text-xl">Hello,</p>
            <p className="text-3xl font-bold">CipherSchools</p>
            <p className="text-lg italic">*******@cipherschools.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;