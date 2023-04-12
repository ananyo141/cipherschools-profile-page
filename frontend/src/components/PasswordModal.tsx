import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";

import CustomModal from "./CustomModal";
import EditButton from "./EditButton";
import { userUpdatePassword } from "../state/features/login/userThunks";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks";

type Props = {
  title: string;
  onChange?: CallableFunction;
};

export const PasswordField = ({ title, onChange }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="flex w-[500px] flex-col gap-2">
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
  const { accessToken } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordInfo, setPasswordInfo] = React.useState<string | null>(null);

  React.useEffect(() => {
    setPasswordInfo(null);
  }, [newPassword, confirmPassword]);

  return (
    <CustomModal modalId={modalId}>
      <div className="space-y-3 rounded-xl bg-white p-8">
        <PasswordField title="Current Password" onChange={setOldPassword} />
        <PasswordField title="New Password" onChange={setNewPassword} />
        <PasswordField title="Confirm Password" onChange={setConfirmPassword} />
        {passwordInfo && (
          <p className="text-sm text-red-600">
            <HiOutlineInformationCircle className="mr-3 inline scale-125" />
            {passwordInfo ? passwordInfo : null}
          </p>
        )}
        <div className="flex justify-end gap-4">
          <label
            htmlFor={modalId}
            className="my-6 w-28 cursor-pointer rounded-md bg-slate-900 px-2 py-1 text-center text-white"
          >
            Cancel
          </label>
          <EditButton
            onClick={() => {
              if (newPassword !== confirmPassword) {
                setPasswordInfo("Passwords do not match");
              } else if (newPassword.length < 6) {
                setPasswordInfo("Password should be atleast 6 characters");
              } else if (newPassword === confirmPassword && accessToken) {
                setPasswordInfo(null);
                dispatch(
                  userUpdatePassword({ oldPassword, newPassword, accessToken })
                )
                  .unwrap()
                  .then(() => {
                    setPasswordInfo("Successfully changed password");
                  })
                  .catch((err) => {
                    setPasswordInfo(err);
                  });
              }
            }}
            label="Save"
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default PasswordModal;
