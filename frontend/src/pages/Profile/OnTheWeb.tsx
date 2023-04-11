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
import { useAppSelector } from "../../hooks/useReduxHooks";

type Props = {};

const OnTheWeb = (props: Props) => {
  const { facebookId, twitterId, instagramId, linkedinId, githubId, website } =
    useAppSelector((state) => state.login);

  const links = [
    {
      title: "Facebook",
      icon: <FaFacebook />,
      link: facebookId,
    },
    {
      title: "Twitter",
      icon: <FaTwitter />,
      link: twitterId,
    },
    {
      title: "Instagram",
      icon: <FaInstagram />,
      link: instagramId,
    },
    {
      title: "LinkedIn",
      icon: <FaLinkedin />,
      link: linkedinId,
    },
    {
      title: "Github",
      icon: <FaGithub />,
      link: githubId,
    },
    {
      title: "Website",
      icon: <FaGlobe />,
      link: website,
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>On The Web</SectionHeading>
        <EditButton />
      </div>
      <div className="container ml-5">
        <div className="grid grid-cols-2 gap-x-14 gap-y-5 lg:grid-cols-3">
          {links.map((link) => (
            <SocialLink title={link.title} icon={link.icon} link={link.link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnTheWeb;
