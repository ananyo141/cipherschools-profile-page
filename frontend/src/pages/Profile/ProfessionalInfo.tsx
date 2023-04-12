import { useEffect, useState } from "react";
import SectionHeading from "../../components/SectionHeading";
import EditButton from "../../components/EditButton";
import { useAppSelector, useAppDispatch } from "../../hooks/useReduxHooks";
import { userUpdate } from "../../state/features/login/userThunks";

type Props = {};

const ProfessionalInfo = (props: Props) => {
  const { highestEducation, currentWork, accessToken } = useAppSelector(
    (state) => state.login
  );
  const [isEditing, setIsEditing] = useState(false);
  const [highestEducationText, setHighestEducationText] = useState(
    highestEducation ?? ""
  );
  const [currentWorkText, setCurrentWorkText] = useState(currentWork ?? "");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setHighestEducationText(highestEducation ?? "");
    setCurrentWorkText(currentWork ?? "");
  }, [highestEducation, currentWork]);

  const handleEditClick = () => {
    if (isEditing && accessToken) {
      dispatch(
        userUpdate({
          attrs: {
            highestEducation: highestEducationText,
            currentWork: currentWorkText,
          },
          accessToken: accessToken,
        })
      );
    }
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>Professional Information</SectionHeading>
        <EditButton
          onClick={handleEditClick}
          label={isEditing ? "Save" : "Edit"}
        />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <h3 className="text-lg">Highest Education</h3>
          <select
            className="my-2 w-full rounded-md p-3"
            defaultValue={highestEducation?.toString()}
            onChange={(e) => setHighestEducationText(e.target.value)}
            disabled={!isEditing}
          >
            <option value="none">None</option>
            <option value="highschool">High School</option>
            <option value="bachelors">Bachelors</option>
            <option value="masters">Masters</option>
            <option value="phd">PhD</option>
          </select>
        </div>
        <div className="w-1/2">
          <h3 className="text-lg">What do you do currently?</h3>
          <select
            className="my-2 w-full rounded-md p-3"
            defaultValue={currentWork?.toString()}
            onChange={(e) => setCurrentWorkText(e.target.value)}
            disabled={!isEditing}
          >
            <option value="schooling">Schooling</option>
            <option value="college">College student</option>
            <option value="teaching">Teaching</option>
            <option value="freelancing">Freelancing</option>
            <option value="job">Job</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo;
