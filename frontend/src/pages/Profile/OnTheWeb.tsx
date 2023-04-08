import SectionHeading from "../../components/SectionHeading";
import EditButton from "../../components/EditButton";
import SocialLink from "../../components/SocialLink";
import {
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const links = [
  {
    title: "Facebook",
    icon: <FaFacebook />,
  },
  {
    title: "Twitter",
    icon: <FaTwitter />,
  },
  {
    title: "Instagram",
    icon: <FaInstagram />,
  },
  {
    title: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    title: "Github",
    icon: <FaGithub />,
  },
  {
    title: "Website",
    icon: <FaGlobe />,
  },
];

type Props = {};

const OnTheWeb = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>On The Web</SectionHeading>
        <EditButton />
      </div>
      <div className="container ml-5">
        <div className="grid grid-cols-2 gap-x-14 gap-y-5 lg:grid-cols-3">
          {links.map((link) => (
            <SocialLink title={link.title} icon={link.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnTheWeb;
