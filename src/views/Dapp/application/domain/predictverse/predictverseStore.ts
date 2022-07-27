import { Pool } from "./entity";

export const predictversePools = [0];

export interface PredictverseStore {
    predictverseAddress: string;
    predictverseAvailable: boolean;
    isLoadingPredictverse: boolean;
    pools: { [key: number]: Pool };
}
