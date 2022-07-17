import { ChangeEvent, FC, useEffect, useState } from "react";

import CustomModal from "..";
import CustomCheckbox from "../../CustomCheckbox";
import NFTCard from "../../NFTCard";
import "./viewstakednftmodal.styles.scss";

interface ViewStakedNFTModalProps {
    closeModal: (open: boolean) => void;
    stakedNFTs: {
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    };
    withdraw: (
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

const ViewStakedNFTModal: FC<ViewStakedNFTModalProps> = ({
    closeModal,
    stakedNFTs,
    withdraw,
    pId
}) => {
    const [nFtsToWithdraw, setNFTsToWithdraw] = useState<number[]>([]);

    const toggleNFTsToWithdraw = (
        evt: ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        let newNFtsToWithdraw = [...nFtsToWithdraw];
        if (evt.target.checked) {
            newNFtsToWithdraw.push(id);
        } else {
            newNFtsToWithdraw = newNFtsToWithdraw.filter(
                (tokenId) => tokenId !== id
            );
        }

        setNFTsToWithdraw(newNFtsToWithdraw);
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
        <div id="view__staked__nft__modal">
            <CustomModal>
                <h4>Staked PRED NFTs</h4>

                <div className="nft__cards__container">
                    {Object.values(stakedNFTs)?.map((NFT) => (
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
                                    onChange={(evt) =>
                                        toggleNFTsToWithdraw(evt, NFT.tokenId)
                                    }
                                />
                            </div>
                            <NFTCard nftDetails={NFT} />
                        </div>
                    ))}
                </div>

                <div className="buttons">
                    <button
                        className={"confirm active"}
                        onClick={() => withdraw(nFtsToWithdraw, pId)}
                    >
                        Withdraw
                    </button>
                </div>
            </CustomModal>
        </div>
    );
};

export default ViewStakedNFTModal;
