import SectionHeading from "../../components/SectionHeading";
import EditButton from "../../components/EditButton";

type Props = {};

const Password = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>Password & security</SectionHeading>
        <EditButton label="Change" />
      </div>
      <input
        type="password"
        className="my-2 w-full rounded-md bg-white p-3"
        placeholder="*****************"
        disabled
      />
    </div>
  );
};

export default Password;
