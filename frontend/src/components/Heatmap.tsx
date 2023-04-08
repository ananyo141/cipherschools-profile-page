import { useRef } from "react";
import { format } from "date-fns";

const DAY_INDEXES = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

function formatDayAndHour(chartData: any) {
  return chartData.reduce((dates: any, dateString: any) => {
    const date = new Date(dateString);
    const day = (DAY_INDEXES as any)[date.getDay()];
    const hour = format(date, "haaa");

    (dates[day] = dates[day] || []).push(hour);

    return dates;
  }, {});
}

const generateBackgroundColor = (count: any) => {
  return `hsl(196deg 36% ${count > 0 ? 95 - count * 5 : 95}%)`;
};

function generateLegend(data: any) {
  const deduped = [...new Set(data)];
  const minValue = Math.min(...(deduped as number[]));
  const maxValue = Math.max(...(deduped as number[]));
  const minColor = generateBackgroundColor(minValue);
  const maxColor = generateBackgroundColor(maxValue);

  return (
    <div className="legend">
      <div
        className="cell"
        style={{
          background: `linear-gradient(90deg, ${minColor} 0%, ${maxColor} 100%)`,
        }}
      />
      <div className="labels">
        <span className="label">{minValue}</span>
        <span className="label">{maxValue}</span>
      </div>
    </div>
  );
}

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-heatmap-chart-component
 */
const Heatmap = ({
  data = [],
  xAxisLabels = [],
  yAxisLabels = [],
  orientation = "vertical",
}) => {
  const minMaxCount = useRef([]);
  const formattedData = formatDayAndHour(data);

  const gridCells = xAxisLabels.reduce((days, dayLabel) => {
    const dayAndHour = yAxisLabels.reduce((hours: any, hourLabel) => {
      const count = formattedData[dayLabel]?.reduce((total: any, hour: any) => {
        return hour === hourLabel ? total + 1 : total;
      }, 0);

      minMaxCount.current = [...minMaxCount.current, count] as any;

      return [
        ...hours,
        {
          dayHour: `${dayLabel} ${hourLabel}`,
          count,
        },
      ];
    }, []);

    return {
      ...days,
      [dayLabel]: {
        hours: dayAndHour,
      },
    };
  }, {});

  return (
    <div className="ml-12">
      <div className={`grid items-start gap-1 ${orientation}`}>
        {Object.keys(gridCells).map((day) => (
          <div key={day} className="grid gap-2 text-left">
            {(gridCells as any)[day].hours.map(({ dayHour, count }: any) => (
              <div
                key={dayHour}
                className="relative h-4 w-full bg-[hsl(196deg,36%,95%)] hover:block"
                style={{ backgroundColor: generateBackgroundColor(count) }}
              >
                <div
                  className="absolute left-full top-1/2 z-[1] hidden min-w-[110px] rounded-sm border-2 border-[#ccc] bg-white p-3 text-xl hover:block"
                  role="tooltip"
                >
                  <span className="text-xl">{count}</span>
                  <span>{dayHour}</span>
                </div>
              </div>
            ))}
            <span className="h-4 text-center text-sm">{day}</span>
          </div>
        ))}
        <div className="grid grid-cols-[repeat(25,1fr)] flex-col gap-1">
          {yAxisLabels.map((label, index) => (
            // Only render every other label text
            <span key={label} className="h-4 text-left text-sm">
              {index % 2 === 0 ? label : null}
            </span>
          ))}
        </div>
      </div>
      {generateLegend(minMaxCount.current)}
    </div>
  );
};

export default Heatmap;
