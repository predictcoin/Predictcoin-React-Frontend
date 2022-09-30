import { ChangeEvent, FC, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import CustomModal from "..";
import CustomCheckbox from "../../CustomCheckbox";
import NFTCard from "../../NFTCard";
import "./viewborrowednftmodal.styles.scss";

interface ViewBorrowedNFTModalProps {
    closeModal: (open: boolean) => void;
    borrowedNFTs: {
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    };
    withdraw: (
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
    approveWithdraw: (operator: string, approved: boolean) => Promise<void>;
    contractAddress: string;
}

const ViewBorrowedNFTModal: FC<ViewBorrowedNFTModalProps> = ({
    closeModal,
    borrowedNFTs,
    withdraw,
    nameSymbol,
    approved,
    approveWithdraw,
    contractAddress
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

    const withdrawNFTs = async () => {
        await withdraw(nFtsToWithdraw);
        setNFTsToWithdraw([]);
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
                                        toggleNFTsToWithdraw(evt, NFT.tokenId)
                                    }
                                />
                            </div>
                            <NFTCard nftDetails={NFT} nameSymbol={nameSymbol} />
                        </div>
                    ))}
                </div>

                {!Boolean(Object.values(borrowedNFTs).length) && (
                    <div className="no__nft">
                        <p>
                            You currently do not have any borrowed NFTs, return
                            borrowed NFTs to withdraw PRED
                        </p>
                    </div>
                )}

                {Boolean(Object.values(borrowedNFTs).length > 0) && (
                    <div className="buttons">
                        <button
                            className="cancel"
                            onClick={() => setNFTsToWithdraw([])}
                            disabled={!Boolean(nFtsToWithdraw.length)}
                        >
                            Cancel
                        </button>
                        {approved ? (
                            <button
                                className={"confirm active"}
                                onClick={withdrawNFTs}
                                disabled={!Boolean(nFtsToWithdraw.length)}
                            >
                                Withdraw
                            </button>
                        ) : (
                            <button
                                className={"confirm active"}
                                onClick={() =>
                                    approveWithdraw(contractAddress, true)
                                }
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
