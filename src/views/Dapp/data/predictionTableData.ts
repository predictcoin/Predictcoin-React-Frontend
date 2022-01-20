import predictionDataModel from '../models/PredictionDataModel';
import BitcoinPred from '../../../assets/pics/BitcoinPred.png';
import DogePred from '../../../assets/pics/DogePred.png';
import ADAPred from '../../../assets/pics/ADAPred.png';
import ETHPred from '../../../assets/pics/ETHPred.png';
import BNBPred from '../../../assets/pics/BNBPred.png';
import DotPred from '../../../assets/pics/DotPred.png';

const predictionTableData: predictionDataModel[] = [
	{
		myPrediction: 'DOWN',
		coinPredicted: 'BTC',
		coinPredictedIcon: BitcoinPred,
		lockedPrice: 60000,
		closingPrice: 50060,
		statistics: ['90', '10'],
		status: 'Won',
	},
	{
		myPrediction: 'UP',
		coinPredicted: 'ETH',
		coinPredictedIcon: ETHPred,
		lockedPrice: 60000,
		closingPrice: 50060,
		statistics: ['90', '10'],
		status: 'Won',
	},
	{
		myPrediction: 'UP',
		coinPredicted: 'DOGE',
		coinPredictedIcon: DogePred,
		lockedPrice: 60000,
		closingPrice: 50060,
		statistics: ['90', '10'],
		status: 'Lost',
	},
	{
		myPrediction: 'STAY',
		coinPredicted: 'DOT',
		coinPredictedIcon: DotPred,
		lockedPrice: 60000,
		closingPrice: 50060,
		statistics: ['90', '10'],
		status: 'Unsuccessful',
	},
	{
		myPrediction: 'STAY',
		coinPredicted: 'ADA',
		coinPredictedIcon: ADAPred,
		lockedPrice: 60000,
		closingPrice: 50060,
		statistics: ['90', '10'],
		status: 'Lost',
	},
	{
		myPrediction: 'STAY',
		coinPredicted: 'BSC',
		coinPredictedIcon: BNBPred,
		lockedPrice: 60000,
		closingPrice: 50060,
		statistics: ['90', '10'],
		status: 'Won',
	},
	{
		myPrediction: 'DOWN',
		coinPredicted: 'BTC',
		coinPredictedIcon: BitcoinPred,
		lockedPrice: 60000,
		closingPrice: 50060,
		statistics: ['90', '10'],
		status: 'Won',
	},
    {
		myPrediction: 'DOWN',
		coinPredicted: 'BTC',
		coinPredictedIcon: BitcoinPred,
		lockedPrice: 60000,
		closingPrice: 50060,
		statistics: ['90', '10'],
		status: 'Won',
	},
];

export default predictionTableData;
