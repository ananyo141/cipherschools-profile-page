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
      <h3 className="py-2 text-lg font-bold">Interests</h3>
      <div className="flex flex-wrap gap-4">
        {interests.map((interest) => (
          <InterestTile category={interest} />
        ))}
      </div>
    </div>
  );
};

export default Interests;
