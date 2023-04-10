import SectionHeading from "../../components/SectionHeading";
import EditButton from "../../components/EditButton";

type Props = {};

const ProfessionalInfo = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>Professional Information</SectionHeading>
        <EditButton />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <h3 className="text-lg">Highest Education</h3>
          <select
            className="my-2 w-full rounded-md p-3"
            defaultValue="bachelors"
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
          <select className="my-2 w-full rounded-md p-3" defaultValue="college">
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
