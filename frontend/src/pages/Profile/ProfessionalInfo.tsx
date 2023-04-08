type Props = {};

const ProfessionalInfo = (props: Props) => {
  return (
    <div>
      <h2 className="my-6 font-bold uppercase">Professional Information</h2>
      <div className="flex gap-4">
        <div className="w-1/2">
          <h3 className="text-lg">Highest Education</h3>
          <select className="my-2 w-full rounded-md p-3">
            <option value="none">None</option>
            <option value="highschool">High School</option>
            <option value="bachelors" selected>
              Bachelors
            </option>
            <option value="masters">Masters</option>
            <option value="phd">PhD</option>
          </select>
        </div>
        <div className="w-1/2">
          <h3 className="text-lg">What do you do currently?</h3>
          <select className="my-2 w-full rounded-md p-3">
            <option value="schooling">Schooling</option>
            <option value="college" selected>
              College student
            </option>
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
