import { FC } from 'react';

import PredictionGraph from '../../Components/PredictionGraph';
import PredictionDetails, { RoundStatus } from '../../Components/PredictionDetails';

const data: {
	id: string;
	color: string;
	data: {
		x: string;
		y: number;
	}[];
}[] = [
	{
		id: 'Prediction Graph',
		color: '#fb49c0',
		data: [
			{
				x: '10:59PM',
				y: 3000,
			},
			{
				x: '11:59PM',
				y: 3500,
			},
			{
				x: '12:59PM',
				y: 3700,
			},
			{
				x: '1:59PM',
				y: 3500,
			},
			{
				x: '2:59PM',
				y: 3300,
			},
			{
				x: '3:59PM',
				y: 4000,
			},
			{
				x: '4:59PM',
				y: 4200,
			},
		],
	},
];

const PricePredictionOngoing: FC = () => {
	return (
		<div className='price__prediction__ongoing'>
			<div className='prediction__graph'>
				<PredictionGraph data={data} />
			</div>
			<div className='prediction__details'>
				<PredictionDetails status={RoundStatus.Ongoing} />
			</div>
		</div>
	);
};

export default PricePredictionOngoing;
