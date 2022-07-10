import { FC } from "react";

import "./nftcard.styles.scss";

interface NFTCardProps {
    nftDetails: any;
}

const NFTCard: FC<NFTCardProps> = ({ nftDetails }) => {
    return (
        <div className="nft__card">
            <div className="nft__card__image__container">
                <figure>
                    <img
                        src={"/assets/img/partners/desert-big.png"}
                        alt={"Shitty preview"}
                    />
                </figure>
            </div>
            <section className="nft__card__details">
                <p className="w-full truncate text-[20px] text-main-500 hover:underline">
                    My BoredApe
                </p>
                <p>20PRED</p>
            </section>
        </div>
    );
};

export default NFTCard;
