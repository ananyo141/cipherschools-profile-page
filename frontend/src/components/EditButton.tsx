type Props = {
  label?: string;
  onClick?: () => void;
};

const EditButton = ({ label = "Edit", onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="my-6 w-24 min-w-fit cursor-pointer rounded-md bg-lemon-400 py-1 text-sm text-white"
    >
      <button className="mx-auto block tracking-tight">{label}</button>
    </div>
  );
};

export default EditButton;
