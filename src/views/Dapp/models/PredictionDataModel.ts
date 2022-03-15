interface PredictionDataModel {
    myPrediction?: 'DOWN' | 'UP' | 'STAY';
    coinPredicted?: string;
    coinPredictedIcon: string;
    lockedPrice: number;
    closingPrice: number;
    statistics: string[];
    status: 'Won' | 'Lost' | 'Unsuccessful';
    earn?: string
};

export default PredictionDataModel;