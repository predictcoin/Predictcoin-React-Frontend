import { FC, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
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

let count = 0;

const PredictionGraph: FC<PredictionGraphProps> = ({ min, max, data }) => {
	const [mergedDates, setMergedDates] = useState<number[]>([]);

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
			yFormat={(value) => `$${Number(value).toFixed(2)}`}
			curve='natural'
			lineWidth={3}
			pointSize={0}
			pointColor='#ffffff'
			pointBorderWidth={3}
			pointBorderColor='#fb49c0'
			enableGridX={false}
			enableGridY={false}
			axisTop={null}
			xFormat={(value) => {
				const date = new Date(value);
				const year = date.getFullYear();
				const month = date.getMonth();
				const day = date.getDay();
				return format(new Date(year, month, day), 'dd MMM Y');
			}}
			tooltip={(value) => {
				return (
					<div
						style={{
							padding: '12px 24px',
							color: '#000',
							background: '#fff',
						}}
					>
						<br />
						<span>
							Data: &nbsp;<b>{value.point.data.xFormatted}</b>
						</span>
						<br />
						<span>
							Price: &nbsp;<b>{value.point.data.yFormatted}</b>
						</span>
					</div>
				);
			}}
			axisBottom={{
				tickValues: 'every 1 month',
				tickSize: 0,
				tickPadding: 26,
				tickRotation: 0,
				legend: '',
				legendPosition: 'middle',
				legendOffset: 32,
				format: (value: string) => {
					const date = new Date(value);
					const year = date.getFullYear();
					const month = date.getMonth();
					const day = date.getDay();
					// if(idx === 0){
					// 	return format(new Date(year, month, day), 'MMM');
					// } else {
					// 	return
					// }
					count += 1;
					console.log(count);
					if (count === 1 || count === 32 || count === 62) {
						return format(new Date(year, month, day), 'MMM');
					} else {
						return '';
					}
					// if (mergedDates.includes(month)) {
					// 	return;
					// } else {
					// 	setMergedDates([...mergedDates, month]);
					// 	return format(new Date(year, month, day), 'MMM');
					// }
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
