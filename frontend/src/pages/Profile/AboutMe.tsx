import { useEffect, useState } from "react";

import SectionHeading from "../../components/SectionHeading";
import EditButton from "../../components/EditButton";
import { useAppSelector, useAppDispatch } from "../../hooks/useReduxHooks";
import { userUpdate } from "../../state/features/login/userThunks";

type Props = {};

const AboutMe = (props: Props) => {
  const { aboutMe, accessToken } = useAppSelector((state) => state.login);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMeText, setAboutMeText] = useState(aboutMe ?? "");

  useEffect(() => {
    setAboutMeText(aboutMe ?? "");
  }, [aboutMe]);

  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    if (isEditing && aboutMeText && accessToken) {
      dispatch(
        userUpdate({
          attrs: { aboutMe: aboutMeText },
          accessToken: accessToken,
        })
      );
    }
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>About Me</SectionHeading>
        <EditButton
          onClick={handleEditClick}
          label={isEditing ? "Save" : "Edit"}
        />
      </div>
      <input
        className="m-3 w-full rounded-md bg-gray-100 p-6"
        onChange={(e) => setAboutMeText(e.target.value)}
        value={aboutMeText}
        disabled={!isEditing}
      />
    </div>
  );
};

export default AboutMe;
