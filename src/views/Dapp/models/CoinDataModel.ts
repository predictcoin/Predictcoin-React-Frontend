export enum Status {
	UP = 'up',
	DOWN = 'down',
}

interface CoinTabDataModel {
	id: string;
	coinName: string;
	data: { id: string; color: string; data: { x: string; y: number }[] }[];
}

export default CoinTabDataModel;
