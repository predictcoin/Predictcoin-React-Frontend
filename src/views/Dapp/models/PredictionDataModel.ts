export enum Position {
    BULL,
    BEAR,
    STAY
}

export enum Status {
    WON = "Won",
    LOST = "Lost",
    UNSUCCESSFUL = "Unsuccessful",
    PENDING= "Pending"
}

interface PredictionUserDataModel {
    myPrediction?: Position;
    coinPredicted?: string;
    coinPredictedIcon: string;
    lockedPrice: string;
    closingPrice: string;
    statistics: string[];
    status: Status;
    earn?: string;
    round: string;
};

export default PredictionUserDataModel;