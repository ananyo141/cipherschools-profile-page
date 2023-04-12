import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import CustomModal from "./CustomModal";
import EditButton from "./EditButton";

type Props = {
  title: string;
  onChange?: CallableFunction;
};

export const PasswordField = ({ title, onChange }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="flex max-w-xl flex-col gap-2">
      <h1 className="text-lg font-medium tracking-wide">{title}</h1>
      <div className="flex flex-row justify-between rounded-lg bg-gray-200 pl-2 pr-5 hover:bg-blue-200">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={title}
          onChange={(e) => (onChange ? onChange(e.target.value) : null)}
          className="w-full rounded-md bg-inherit p-2 text-lg focus:outline-none"
        />
        <button onClick={() => setShowPassword(!showPassword)} className="">
          {showPassword ? (
            <AiOutlineEyeInvisible className="scale-125" />
          ) : (
            <AiOutlineEye className="scale-125" />
          )}
        </button>
      </div>
    </div>
  );
};

const PasswordModal = ({ modalId }: { modalId: string }) => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  return (
    <>
      <CustomModal modalId={modalId} className="w-1/2">
        {/* <label htmlFor="pass">Open</label> */}
        {/* <CustomModal modalId="pass" className="w-96"> */}
        <div className="space-y-3 rounded-xl bg-white p-8">
          <PasswordField title="Current Password" />
          <PasswordField title="New Password" />
          <PasswordField title="Confirm Password" />
          <div className="flex justify-end gap-4">
            <label
              htmlFor={modalId}
              className="my-6 w-28 cursor-pointer rounded-md bg-slate-900 px-2 py-1 text-center text-white"
            >
              Cancel
            </label>
            <EditButton
              onClick={() => {
                if (password !== confirmPassword) {
                  setPasswordError(true);
                  setConfirmPasswordError(true);
                } else {
                  setPasswordError(false);
                  setConfirmPasswordError(false);
                }
              }}
              label="Save"
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default PasswordModal;
