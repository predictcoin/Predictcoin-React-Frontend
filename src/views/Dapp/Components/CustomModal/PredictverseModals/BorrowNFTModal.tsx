import { BigNumber, constants, ethers } from "ethers";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

import CustomModal from "..";
import { displayDecimals } from "../../../lib/utils/number";
import CustomCheckbox from "../../CustomCheckbox";
import NFTCard from "../../NFTCard";
import "./borrownftmodal.styles.scss";

interface BorrowNFTModalProps {
    closeModal: (open: boolean) => void;
    predNFTsToBorrow: {
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    };
    borrow: (
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
    justView: boolean;
    approved: {
        [key: string]: BigNumber;
    };
    approveBorrow: (
        spender: string,
        amount: string | BigNumber
    ) => Promise<void>;
    contractAddress: string;
    singleNFTCollateral: BigNumber;
    decimals: number;
}

const BorrowNFTModal: FC<BorrowNFTModalProps> = ({
    closeModal,
    predNFTsToBorrow,
    borrow,
    nameSymbol,
    justView,
    approved,
    approveBorrow,
    contractAddress,
    singleNFTCollateral,
    decimals
}) => {
    const [nftsToBorrow, setNFTsToBorrow] = useState<number[]>([]);
    const [borrowCollateral, setBorrowCollateral] = useState<BigNumber>(
        BigNumber.from(0)
    );

    const toggleNFTBorrrow = (
        evt: ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        let newNftsToBorrow = [...nftsToBorrow];
        if (evt.target.checked) {
            newNftsToBorrow.push(id);
        } else {
            newNftsToBorrow = newNftsToBorrow.filter(
                (tokenId) => tokenId !== id
            );
        }

        setNFTsToBorrow(newNftsToBorrow);
    };

    const closeModalFunc = (e: any) => {
        if (e.target?.id === "custom__modal") closeModal(false);
    };

    const BorrowNFTs = async () => {
        await borrow(nftsToBorrow);
        setNFTsToBorrow([]);
        closeModal(false);
    };

    useEffect(() => {
        window.addEventListener("click", (e) => closeModalFunc(e));

        return () => {
            window.removeEventListener("click", (e) => closeModalFunc(e));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setBorrowCollateral(singleNFTCollateral.mul(nftsToBorrow.length));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nftsToBorrow]);

    return (
        <div id="borrow__nft__modal">
            <CustomModal>
                <div className="close" onClick={() => closeModal(false)}>
                    <AiOutlineClose />
                </div>

                <h4>Borrow {`${nameSymbol.symbol}`} NFTs</h4>

                {!justView &&
                    Boolean(Object.values(predNFTsToBorrow).length > 0) && (
                        <p className="pred__collateral__amount">
                            <div className="pred__tooltip">
                                <AiOutlineInfoCircle
                                    size={18}
                                    color={"white"}
                                />
                                <span className="tooltiptext">
                                    PRED collateral needed to borrow select NFTs
                                </span>
                            </div>
                            <span>
                                PRED Collateral:{" "}
                                {displayDecimals(
                                    ethers.utils.formatUnits(
                                        borrowCollateral,
                                        decimals
                                    ),
                                    5
                                )}
                            </span>
                        </p>
                    )}

                <div
                    className={`nft__cards__container ${
                        Boolean(Object.values(predNFTsToBorrow).length)
                            ? "content"
                            : ""
                    } `}
                >
                    {Object.values(predNFTsToBorrow)?.map((NFT) => (
                        <div className="nft__card__container" key={NFT.tokenId}>
                            {!justView && (
                                <div className="checkbox__container">
                                    <CustomCheckbox
                                        id={`remove-${NFT.tokenId}`}
                                        name={`remove-${NFT.tokenId}`}
                                        color="#2d173f"
                                        size="20px"
                                        strokeColor="transparent"
                                        checkedColor="transparent"
                                        checkedStrokeColor="#2d173f"
                                        checked={nftsToBorrow.includes(
                                            NFT.tokenId
                                        )}
                                        onChange={(evt) =>
                                            toggleNFTBorrrow(evt, NFT.tokenId)
                                        }
                                    />
                                </div>
                            )}
                            <NFTCard nftDetails={NFT} nameSymbol={nameSymbol} />
                        </div>
                    ))}
                </div>

                {!Boolean(Object.values(predNFTsToBorrow).length) && (
                    <div className="no__nft">
                        <p>
                            No NFTs to borrow currently! Check back some other
                            time
                        </p>
                    </div>
                )}

                {!justView &&
                    Boolean(Object.values(predNFTsToBorrow).length > 0) && (
                        <div className="buttons">
                            <button
                                className="cancel"
                                onClick={() => setNFTsToBorrow([])}
                                disabled={!Boolean(nftsToBorrow.length)}
                            >
                                Cancel
                            </button>
                            {approved?.[contractAddress]?.gt(
                                borrowCollateral
                            ) ? (
                                <button
                                    className={"confirm active"}
                                    onClick={BorrowNFTs}
                                    disabled={!Boolean(nftsToBorrow.length)}
                                >
                                    Borrow
                                </button>
                            ) : (
                                <button
                                    className={"confirm active"}
                                    onClick={() =>
                                        approveBorrow(
                                            contractAddress,
                                            constants.MaxUint256
                                        )
                                    }
                                    disabled={!Boolean(nftsToBorrow.length)}
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

export default BorrowNFTModal;
