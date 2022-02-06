import { FC } from 'react';
import { ResponsiveLine, SliceTooltip } from '@nivo/line';
import { format } from 'date-fns';

interface PredictionGraphProps {
	min: number;
	max: number;
	data: {
		id: string;
		data: {
			x: string;
			y: number;
		}[];
	}[];
}

const PredictionGraph: FC<PredictionGraphProps> = ({ min, max, data }) => {
	const mergedDates: number[] = [];

	const LineTooltip: SliceTooltip = (props) => {
		return (
			<p>x:3, y:there {props.axis}</p>
		);
	};

	return (
		<ResponsiveLine
			data={data}
			yScale={{
				type: 'linear',
				min: min,
				max: max,
				stacked: true,
				reverse: false,
			}}
			yFormat={value => `$${Number(value).toFixed(2)}`}
			curve='natural'
			lineWidth={3}
			pointSize={0}
			pointColor='#ffffff'
			pointBorderWidth={3}
			pointBorderColor='#fb49c0'
			enableGridX={false}
			enableGridY={false}
			axisTop={null}
			sliceTooltip={LineTooltip}
			xFormat={(value) => {
				const year = new Date(Number(value)).getFullYear();
				const month = new Date(Number(value)).getMonth();
				const day = new Date(Number(value)).getDay();
				return format(new Date(year, month, day), 'dd MMM Y');
			}}
			axisBottom={{
				tickValues: 'every 1 month',
				tickSize: 0,
				tickPadding: 26,
				tickRotation: 90,
				legend: '',
				legendPosition: 'middle',
				legendOffset: 32,
				format: (value) => {
					const year = new Date(Number(value)).getFullYear();
					const month = new Date(Number(value)).getMonth();
					const day = new Date(Number(value)).getDay();
					// if (mergedDates.includes(month)) {
					// 	return '';
					// } else {
					// 	mergedDates.push(month);
					// }
					return format(new Date(year, month, day), 'MMM');
				},
			}}
			axisLeft={{
				tickSize: 0,
				tickPadding: 34,
				tickRotation: 0,
				legend: '',
				legendPosition: 'middle',
				legendOffset: -60,
				format: (value) => `$${value}`,
			}}
			margin={{ top: 40, right: 40, bottom: 123, left: 75 }}
			axisRight={null}
			useMesh={true}
		/>
	);
};

export default PredictionGraph;
