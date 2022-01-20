import React from 'react';

//@ts-ignore
import { Chart } from 'react-charts';

const Line = ({
	dataset,
	_7dChange,
}: {
	dataset: string[];
	_7dChange: number;
}) => {
	const resultDataSet = dataset.map((data, index) => [index, data]);

	let prices = [];

	prices.push([dataset.map((data) => parseInt(data)), _7dChange]);

	const colorChange = prices.map((price) => (price[1] < 0 ? 'red' : 'green'));

	const data = React.useMemo(
		() => [
			{
				label: 'Series 1',
				data: resultDataSet,
				color: `${colorChange[0]}`,
			},
		],
		[colorChange, resultDataSet]
	);

	const axes = React.useMemo(
		() => [
			{
				primary: true,
				position: 'bottom',
				type: 'time',
				show: false,
			},
			{ position: 'left', type: 'linear', show: false },
		],
		[]
	);

	return (
		<div
			style={{
				width: '250px',
				height: '50px',
			}}
		>
			<Chart data={data} axes={axes} />
		</div>
	);
};

export default Line;
