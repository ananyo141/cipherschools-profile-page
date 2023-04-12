import AboutMe from "./AboutMe";
import Header from "./Header";
import CipherMap from "./CipherMap";
import OnTheWeb from "./OnTheWeb";
import ProfessionalInfo from "./ProfessionalInfo";
import Password from "./Password";
import Interests from "./Interests";

type Props = {};

const ProfilePage = (props: Props) => {
  return (
    <section>
      <div className="relative z-30 h-44">
        <Header className="fixed w-full bg-white shadow-md" />
      </div>
      <div className="mx-auto mt-3 space-y-9 divide-y-2 bg-gray-300 p-5">
        <AboutMe />
        <CipherMap />
        <OnTheWeb />
        <ProfessionalInfo />
        <Password />
        <Interests />
      </div>
    </section>
  );
};

export default ProfilePage;
