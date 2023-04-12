import SectionHeading from "../../components/SectionHeading";
import EditButton from "../../components/EditButton";
import PasswordModal from "../../components/PasswordModal";

type Props = {};

const Password = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading>Password & security</SectionHeading>
        <label htmlFor="passwordModal">
          <EditButton label="Change" />
        </label>
      </div>
      <PasswordModal modalId="passwordModal" />
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
