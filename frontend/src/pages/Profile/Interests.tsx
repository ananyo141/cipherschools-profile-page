import SectionHeading from "../../components/SectionHeading";
import EditButton from "../../components/EditButton";
import InterestTile from "../../components/InterestTile";

type Props = {};

const interests = [
  "Web Development",
  "App Development",
  "Machine Learning",
  "Data Structures",
];

const Interests = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>Interests</SectionHeading>
        <EditButton label="Edit" />
      </div>
      <div className="flex flex-wrap gap-4">
        {interests.map((interest) => (
          <InterestTile category={interest} />
        ))}
      </div>
    </div>
  );
};

export default Interests;
