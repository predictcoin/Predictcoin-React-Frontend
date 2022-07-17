import { ChangeEvent, FC, useEffect, useState } from "react";

import CustomModal from "..";
import CustomCheckbox from "../../CustomCheckbox";
import NFTCard from "../../NFTCard";
import "./stakenftmodal.styles.scss";

interface StakeNFTModalProps {
    closeModal: (open: boolean) => void;
    userNFTs: {
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    };
    stake: (
        tokenIds: number[],
        pId: number,
        callbacks?:
            | {
                  [key: string]: () => void;
              }
            | undefined
    ) => void;
    pId: number;
}

const StakeNFTModal: FC<StakeNFTModalProps> = ({
    closeModal,
    userNFTs,
    stake,
    pId
}) => {
    const [nftsToStake, setNFTsToStake] = useState<number[]>([]);

    const toggleNFTStake = (evt: ChangeEvent<HTMLInputElement>, id: number) => {
        let newNftsToStake = [...nftsToStake];
        if (evt.target.checked) {
            newNftsToStake.push(id);
        } else {
            newNftsToStake = newNftsToStake.filter((tokenId) => tokenId !== id);
        }

        setNFTsToStake(newNftsToStake);
    };

    const closeModalFunc = (e: any) => {
        if (e.target?.id === "custom__modal") closeModal(false);
    };

    useEffect(() => {
        window.addEventListener("click", (e) => closeModalFunc(e));

        return () => {
            window.removeEventListener("click", (e) => closeModalFunc(e));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="stake__nft__modal">
            <CustomModal>
                <h4>Stake PRED NFTs</h4>

                <div className="nft__cards__container">
                    {Object.values(userNFTs)?.map((NFT) => (
                        <div className="nft__card__container" key={NFT.tokenId}>
                            <div className="checkbox__container">
                                <CustomCheckbox
                                    id={`remove-${NFT.tokenId}`}
                                    name={`remove-${NFT.tokenId}`}
                                    color="#2d173f"
                                    size="20px"
                                    strokeColor="transparent"
                                    checkedColor="transparent"
                                    checkedStrokeColor="#2d173f"
                                    checked={nftsToStake.includes(NFT.tokenId)}
                                    onChange={(evt) =>
                                        toggleNFTStake(evt, NFT.tokenId)
                                    }
                                />
                            </div>
                            <NFTCard nftDetails={NFT} />
                        </div>
                    ))}
                </div>

                <div className="buttons">
                    <button
                        className="cancel"
                        onClick={() => setNFTsToStake([])}
                    >
                        Cancel
                    </button>
                    &nbsp;&nbsp;
                    <button
                        className={"confirm active"}
                        onClick={() => stake(nftsToStake, pId)}
                    >
                        Stake
                    </button>
                </div>
            </CustomModal>
        </div>
    );
};

export default StakeNFTModal;
