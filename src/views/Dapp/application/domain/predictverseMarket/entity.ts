import { BigNumber } from "ethers";

export interface BorrowedNFT {
    tokenId: number;
    imgUrl: string;
    collateral?: BigNumber;
}
