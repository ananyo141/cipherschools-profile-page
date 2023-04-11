import SectionHeading from "../../components/SectionHeading";
import EditButton from "../../components/EditButton";
import InterestTile from "../../components/InterestTile";
import { useAppSelector } from "../../hooks/useReduxHooks";

type Props = {};

const Interests = (props: Props) => {
  const { interests } = useAppSelector((state) => state.login);
  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>Interests</SectionHeading>
        <EditButton label="Edit" />
      </div>
      <div className="flex flex-wrap gap-4">
        {interests?.map((interest: string) => (
          <InterestTile category={interest} />
        ))}
      </div>
    </div>
  );
};

export default Interests;
