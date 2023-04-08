import AboutMe from "./AboutMe";
import Header from "./Header";
import CipherMap from "./CipherMap";
import OnTheWeb from "./OnTheWeb";
import ProfessionalInfo from "./ProfessionalInfo";

type Props = {};

const ProfilePage = (props: Props) => {
  return (
    <section>
      <div className="relative h-44">
        <Header className="fixed w-full bg-white shadow-md" />
      </div>
      <div className="mx-auto mt-3 space-y-9 divide-y-2 bg-gray-300 p-5">
        <AboutMe />
        <CipherMap />
        <ProfessionalInfo />
        <OnTheWeb />
      </div>
    </section>
  );
};

export default ProfilePage;
