import AboutMe from "./AboutMe";
import Header from "./Header";
import CipherMap from "./CipherMap";

type Props = {};

const ProfilePage = (props: Props) => {
  return (
    <section>
      <Header />
      <div className="mx-auto space-y-9 divide-y-2 bg-gray-300 p-5">
        <AboutMe />
        <CipherMap />
      </div>
    </section>
  );
};

export default ProfilePage;
