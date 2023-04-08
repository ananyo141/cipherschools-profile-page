type Props = {};

const Password = (props: Props) => {
  return (
    <div>
      <h3 className="py-2 text-lg font-bold">Password</h3>
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
