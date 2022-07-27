import { FC } from "react";

import "./nftcard.styles.scss";

interface NFTCardProps {
    nftDetails: {
        tokenId: number;
        imgUrl: string;
    };
    nameSymbol: {
        name: string;
        symbol: string;
    };
}

const NFTCard: FC<NFTCardProps> = ({ nftDetails, nameSymbol }) => {
    return (
        <div className="nft__card">
            <div className="nft__card__image__container">
                <figure>
                    <img
                        src={nftDetails.imgUrl}
                        alt={`NFT ${nftDetails.tokenId}'s avatar`}
                    />
                </figure>
            </div>
            <section className="nft__card__details">
                <p className="w-full truncate text-[20px] text-main-500 hover:underline">
                    {`${nameSymbol.name} / ${nameSymbol.symbol}`} &nbsp; {`#${nftDetails.tokenId}`}
                </p>
                {/* <p>20PRED</p> */}
            </section>
        </div>
    );
};

export default NFTCard;
