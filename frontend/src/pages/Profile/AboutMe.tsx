import SectionHeading from "../../components/SectionHeading";
import EditButton from "../../components/EditButton";
import { useAppSelector } from "../../hooks/useReduxHooks";

type Props = {};

const AboutMe = (props: Props) => {
  const { aboutMe } = useAppSelector((state) => state.login);
  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>About Me</SectionHeading>
        <EditButton />
      </div>
      <div className="m-3 rounded-md bg-gray-100 p-6">{aboutMe}</div>
    </div>
  );
};

export default AboutMe;
