type Props = {
  children: React.ReactNode;
};

const SectionHeading = ({ children }: Props) => {
  return <h2 className="my-6 text-lg font-bold uppercase">{children}</h2>;
};

export default SectionHeading;
