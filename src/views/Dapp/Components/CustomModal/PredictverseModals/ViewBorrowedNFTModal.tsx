import { BigNumber, ethers } from "ethers";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

import CustomModal from "..";
import { BorrowedNFT } from "../../../application/domain/predictverseMarket/entity";
import { displayDecimals } from "../../../lib/utils/number";
import CustomCheckbox from "../../CustomCheckbox";
import NFTCard from "../../NFTCard";
import "./viewborrowednftmodal.styles.scss";

interface ViewBorrowedNFTModalProps {
    closeModal: (open: boolean) => void;
    borrowedNFTs: {
        [tokenId: number]: BorrowedNFT;
    };
    payback: (
        tokenIds: number[],
        callbacks?:
            | {
                  [key: string]: () => void;
              }
            | undefined
    ) => void;
    nameSymbol: {
        name: string;
        symbol: string;
    };
    approved: boolean;
    approvePayback: (operator: string, approved: boolean) => Promise<void>;
    contractAddress: string;
    decimals: number;
}

const ViewBorrowedNFTModal: FC<ViewBorrowedNFTModalProps> = ({
    closeModal,
    borrowedNFTs,
    payback,
    nameSymbol,
    approved,
    approvePayback,
    contractAddress,
    decimals
}) => {
    const [nFtsToPayback, setNFTsToPayback] = useState<number[]>([]);
    const [predPayout, setPredPayout] = useState<BigNumber>(BigNumber.from(0));

    const toggleNFTsToPayback = (
        evt: ChangeEvent<HTMLInputElement>,
        id: number,
        collateral: BigNumber
    ) => {
        let newNFtsToPayback = [...nFtsToPayback];
        let newPredPayout = predPayout;
        if (evt.target.checked) {
            newNFtsToPayback.push(id);
            newPredPayout = newPredPayout.add(collateral);
        } else {
            newNFtsToPayback = newNFtsToPayback.filter(
                (tokenId) => tokenId !== id
            );
            newPredPayout = newPredPayout.sub(collateral);
        }

        setNFTsToPayback(newNFtsToPayback);
        setPredPayout(newPredPayout);
    };

    const closeModalFunc = (e: any) => {
        if (e.target?.id === "custom__modal") closeModal(false);
    };

    const paybackNFTs = async () => {
        await payback(nFtsToPayback);
        setNFTsToPayback([]);
        closeModal(false);
    };

    useEffect(() => {
        window.addEventListener("click", (e) => closeModalFunc(e));

        return () => {
            window.removeEventListener("click", (e) => closeModalFunc(e));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="view__borrowed__nft__modal">
            <CustomModal>
                <div className="close" onClick={() => closeModal(false)}>
                    <AiOutlineClose />
                </div>

                <h4>Borrowed {`${nameSymbol.symbol}`} NFTs</h4>

                {Boolean(Object.values(borrowedNFTs).length > 0) && (
                    <div className="pred__payout__amount">
                        <div className="pred__tooltip">
                            <AiOutlineInfoCircle size={18} color={"white"} />
                            <span className="tooltiptext">
                                PRED amount withdrawn when you payback selected
                                NFTs
                            </span>
                        </div>
                        <span>
                            PRED Payout:{" "}
                            {displayDecimals(
                                ethers.utils.formatUnits(predPayout, decimals),
                                5
                            )}
                        </span>
                    </div>
                )}

                <div
                    className={`nft__cards__container ${
                        Boolean(Object.values(borrowedNFTs).length)
                            ? "content"
                            : ""
                    } `}
                >
                    {Object.values(borrowedNFTs)?.map((NFT) => (
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
                                        toggleNFTsToPayback(
                                            evt,
                                            NFT.tokenId,
                                            NFT.collateral as BigNumber
                                        )
                                    }
                                />
                            </div>
                            <NFTCard nftDetails={NFT} nameSymbol={nameSymbol} />
                        </div>
                    ))}
                </div>

                {!Boolean(Object.values(borrowedNFTs).length) && (
                    <div className="no__nft">
                        <p>You currently do not have any borrowed NFTs.</p>
                    </div>
                )}

                {Boolean(Object.values(borrowedNFTs).length > 0) && (
                    <div className="buttons">
                        <button
                            className="cancel"
                            onClick={() => setNFTsToPayback([])}
                            disabled={!Boolean(nFtsToPayback.length)}
                        >
                            Cancel
                        </button>
                        {approved ? (
                            <button
                                className={"confirm active"}
                                onClick={paybackNFTs}
                                disabled={!Boolean(nFtsToPayback.length)}
                            >
                                Payback
                            </button>
                        ) : (
                            <button
                                className={"confirm active"}
                                onClick={() =>
                                    approvePayback(contractAddress, true)
                                }
                                disabled={!Boolean(nFtsToPayback.length)}
                            >
                                Approve
                            </button>
                        )}
                    </div>
                )}
            </CustomModal>
        </div>
    );
};

export default ViewBorrowedNFTModal;
