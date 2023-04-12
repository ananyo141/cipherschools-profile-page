import { useEffect, useState } from "react";
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
import { useAppSelector, useAppDispatch } from "../../hooks/useReduxHooks";
import { userUpdate } from "../../state/features/login/userThunks";

type Props = {};

const OnTheWeb = (props: Props) => {
  const {
    facebookId,
    twitterId,
    instagramId,
    linkedinId,
    githubId,
    website,
    accessToken,
  } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [facebookIdText, setFacebookIdText] = useState(facebookId ?? "");
  const [twitterIdText, setTwitterIdText] = useState(twitterId ?? "");
  const [instagramIdText, setInstagramIdText] = useState(instagramId ?? "");
  const [linkedinIdText, setLinkedinIdText] = useState(linkedinId ?? "");
  const [githubIdText, setGithubIdText] = useState(githubId ?? "");
  const [websiteText, setWebsiteText] = useState(website ?? "");

  useEffect(() => {
    setFacebookIdText(facebookId ?? "");
    setTwitterIdText(twitterId ?? "");
    setInstagramIdText(instagramId ?? "");
    setLinkedinIdText(linkedinId ?? "");
    setGithubIdText(githubId ?? "");
    setWebsiteText(website ?? "");
  }, [facebookId, twitterId, instagramId, linkedinId, githubId, website]);

  const handleEditClick = () => {
    if (isEditing && accessToken) {
      dispatch(
        userUpdate({
          attrs: {
            facebookId: facebookIdText,
            twitterId: twitterIdText,
            instagramId: instagramIdText,
            linkedinId: linkedinIdText,
            githubId: githubIdText,
            website: websiteText,
          },
          accessToken: accessToken,
        })
      );
    }
    setIsEditing(!isEditing);
  };

  const links = [
    {
      title: "Facebook",
      icon: <FaFacebook />,
      link: facebookIdText,
      handler: setFacebookIdText,
    },
    {
      title: "Twitter",
      icon: <FaTwitter />,
      link: twitterIdText,
      handler: setTwitterIdText,
    },
    {
      title: "Instagram",
      icon: <FaInstagram />,
      link: instagramIdText,
      handler: setInstagramIdText,
    },
    {
      title: "LinkedIn",
      icon: <FaLinkedin />,
      link: linkedinIdText,
      handler: setLinkedinIdText,
    },
    {
      title: "Github",
      icon: <FaGithub />,
      link: githubIdText,
      handler: setGithubIdText,
    },
    {
      title: "Website",
      icon: <FaGlobe />,
      link: websiteText,
      handler: setWebsiteText,
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>On The Web</SectionHeading>
        <EditButton
          onClick={handleEditClick}
          label={isEditing ? "Save" : "Edit"}
        />
      </div>
      <div className="container ml-5">
        <div className="grid grid-cols-2 gap-x-14 gap-y-5 lg:grid-cols-3">
          {links.map((link) => (
            <SocialLink
              title={link.title}
              icon={link.icon}
              link={link.link ?? ""}
              onChange={(e) => link.handler(e.target.value)}
              isDisabled={!isEditing}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnTheWeb;
