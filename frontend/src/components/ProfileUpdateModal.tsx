import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

import CustomModal from "./CustomModal";
import EditButton from "./EditButton";
import { userUpdate } from "../state/features/login/userThunks";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks";

type Props = {
  title: string;
  onChange?: CallableFunction;
};

const InputField = ({ title, onChange }: Props) => {
  return (
    <div className="flex w-[500px] flex-col gap-2">
      <h1 className="text-lg font-medium tracking-wide">{title}</h1>
      <div className="flex flex-row justify-between rounded-lg bg-gray-200 pl-2 pr-5 hover:bg-blue-200">
        <input
          type="text"
          placeholder={title}
          onChange={(e) => (onChange ? onChange(e.target.value) : null)}
          className="w-full rounded-md bg-inherit p-2 text-lg focus:outline-none"
        />
      </div>
    </div>
  );
};

const ProfileUpdateModal = ({ modalId }: { modalId: string }) => {
  const { accessToken } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [responseInfo, setResponseInfo] = React.useState<string | null>(null);

  const handleSubmit = () => {
    if (accessToken) {
      dispatch(
        userUpdate({
          accessToken,
          attrs: {
            name: firstName + lastName,
            email: email,
          },
        })
      )
        .then(() => {
          setResponseInfo("Successfully updated profile");
        })
        .catch((err) => {
          setResponseInfo(`Failed to update profile ${err}`);
        });
    }
  };

  return (
    <CustomModal modalId={modalId}>
      <div className="space-y-3 rounded-xl bg-white p-8">
        <InputField title="First Name" onChange={setFirstName} />
        <InputField title="Last Name" onChange={setLastName} />
        <InputField title="Email" onChange={setEmail} />
        {responseInfo && (
          <p className="text-sm text-red-600">
            <HiOutlineInformationCircle className="mr-3 inline scale-125" />
            {responseInfo ? responseInfo : null}
          </p>
        )}
        <div className="flex justify-end gap-4">
          <label
            htmlFor={modalId}
            className="my-6 w-28 cursor-pointer rounded-md bg-slate-900 px-2 py-1 text-center text-white"
          >
            Cancel
          </label>
          <EditButton onClick={handleSubmit} label="Save" />
        </div>
      </div>
    </CustomModal>
  );
};

export default ProfileUpdateModal;
