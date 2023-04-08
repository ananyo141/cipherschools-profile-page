import HeatMap from "@uiw/react-heat-map";

type Props = {};

const value = [
  { date: "2016/01/11", count: 2 },
  { date: "2016/01/12", count: 20 },
  { date: "2016/01/13", count: 10 },
  ...[...Array(17)].map((_, idx) => ({
    date: `2016/02/${idx + 10}`,
    count: idx,
    content: "",
  })),
  { date: "2016/04/11", count: 2 },
  { date: "2016/05/01", count: 5 },
  { date: "2016/05/02", count: 5 },
  { date: "2016/05/04", count: 11 },
];

const CipherMap = (props: Props) => {
  return (
    <div>
      <h2 className="mt-5 text-lg font-bold">Cipher Map</h2>
      <HeatMap
        value={value as any}
        className="h-72 w-full font-bold"
        rectSize={30}
        letterSpacing={1}
        space={5}
        startDate={new Date("2016/01/01")}
      />
    </div>
  );
};

export default CipherMap;
