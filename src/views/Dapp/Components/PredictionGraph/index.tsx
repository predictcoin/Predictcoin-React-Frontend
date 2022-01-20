import { FC } from 'react';
import { ResponsiveLine } from '@nivo/line';

interface PredictionGraphProps {
	data: {
		id: string;
		data: {
			x: string;
			y: number;
		}[];
	}[];
}

const PredictionGraph: FC<PredictionGraphProps> = ({ data }) => {
	return (
		<ResponsiveLine
			data={data}
			yScale={{
				type: 'linear',
				min: 2000,
				max: 6500,
				stacked: true,
				reverse: false,
			}}
			yFormat=' >-.2f'
			curve='natural'
			lineWidth={3}
			pointSize={0}
			pointColor='#ffffff'
			pointBorderWidth={3}
			pointBorderColor='#fb49c0'
			enableGridX={false}
			enableGridY={false}
			axisTop={null}
			axisBottom={{
				tickSize: 0,
				tickPadding: 26,
				tickRotation: 0,
				legend: '',
				legendPosition: 'middle',
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 0,
				tickPadding: 34,
				tickRotation: 0,
				legend: '',
				legendPosition: 'middle',
				legendOffset: -60,
				tickValues: [
					'2000',
					'2500',
					'3000',
					'3500',
					'4000',
					'4500',
					'5000',
					'5500',
					'6000',
					'6500',
				],
			}}
			margin={{ top: 40, right: 40, bottom: 123, left: 70 }}
			axisRight={null}
			useMesh={true}
		/>
	);
};

export default PredictionGraph;
