import predictionUserDataModel, { Position, Status } from '../models/PredictionDataModel';
import BitcoinPred from '../../../assets/pics/BitcoinPred.png';
import DogePred from '../../../assets/pics/DogePred.png';
import ADAPred from '../../../assets/pics/ADAPred.png';
import ETHPred from '../../../assets/pics/ETHPred.png';
import BNBPred from '../../../assets/pics/BNBPred.png';
import DotPred from '../../../assets/pics/DotPred.png';

const predictionTableData: predictionUserDataModel[] = [
	{
		myPrediction: Position.BEAR,
		coinPredicted: 'BTC',
		coinPredictedIcon: BitcoinPred,
		lockedPrice: "60000",
		closingPrice: "50060",
		statistics: ['90', '10'],
		status: Status.WON,
		round: "1",
	},
	{
		myPrediction: Position.BULL,
		coinPredicted: 'ETH',
		coinPredictedIcon: ETHPred,
		lockedPrice: "60000",
		closingPrice: "50060",
		statistics: ['90', '10'],
		status: Status.WON,
		round: "1",
	},
	{
		myPrediction: Position.BULL,
		coinPredicted: 'DOGE',
		coinPredictedIcon: DogePred,
		lockedPrice: "60000",
		closingPrice: "50060",
		statistics: ['90', '10'],
		status: Status.LOST,
		round: "1",
	},
	{
		myPrediction: Position.STAY,
		coinPredicted: 'DOT',
		coinPredictedIcon: DotPred,
		lockedPrice: "60000",
		closingPrice: "50060",
		statistics: ['90', '10'],
		status: Status.UNSUCCESSFUL,
		round: "1",
	},
	{
		myPrediction: Position.STAY,
		coinPredicted: 'ADA',
		coinPredictedIcon: ADAPred,
		lockedPrice: "60000",
		closingPrice: "50060",
		statistics: ['90', '10'],
		status: Status.LOST,
		round: "1",
	},
	{
		myPrediction: Position.STAY,
		coinPredicted: 'BSC',
		coinPredictedIcon: BNBPred,
		lockedPrice: "60000",
		closingPrice: "50060",
		statistics: ['90', '10'],
		status: Status.WON,
		round: "1",
	},
	{
		myPrediction: Position.BEAR,
		coinPredicted: 'BTC',
		coinPredictedIcon: BitcoinPred,
		lockedPrice: "60000",
		closingPrice: "50060",
		statistics: ['90', '10'],
		status: Status.WON,
		round: "1",
	},
    {
		myPrediction: Position.BEAR,
		coinPredicted: 'BTC',
		coinPredictedIcon: BitcoinPred,
		lockedPrice: "60000",
		closingPrice: "50060",
		statistics: ['90', '10'],
		status: Status.WON,
		round: "1",
	},
];

export default predictionTableData;
