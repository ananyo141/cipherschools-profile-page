type Props = {
  category: string;
};

const InterestTile = ({ category }: Props) => {
  return (
    <p className="inline rounded-sm border bg-lemon-100 px-2 py-1 text-xs font-bold text-lemon-400">
      {category}
    </p>
  );
};

export default InterestTile;
