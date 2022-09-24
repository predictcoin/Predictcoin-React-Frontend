import { ChangeEvent, FC, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import CustomModal from "..";
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
        pId: number,
        callbacks?:
            | {
                  [key: string]: () => void;
              }
            | undefined
    ) => void;
    pId: number;
    nameSymbol: {
        name: string;
        symbol: string;
    };
}

const BorrowNFTModal: FC<BorrowNFTModalProps> = ({
    closeModal,
    predNFTsToBorrow,
    borrow,
    pId,
    nameSymbol
}) => {
    const [nftsToBorrow, setNFTsToBorrow] = useState<number[]>([]);

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
        await borrow(nftsToBorrow, pId);
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

    return (
        <div id="borrow__nft__modal">
            <CustomModal>
                <div className="close" onClick={() => closeModal(false)}>
                    <AiOutlineClose />
                </div>

                <h4>borrow {`${nameSymbol.symbol}`} NFTs</h4>

                <div
                    className={`nft__cards__container ${
                        Boolean(Object.values(predNFTsToBorrow).length)
                            ? "content"
                            : ""
                    } `}
                >
                    {Object.values(predNFTsToBorrow)?.map((NFT) => (
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
                                    checked={nftsToBorrow.includes(NFT.tokenId)}
                                    onChange={(evt) =>
                                        toggleNFTBorrrow(evt, NFT.tokenId)
                                    }
                                />
                            </div>
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

                <div className="buttons">
                    <button
                        className="cancel"
                        onClick={() => setNFTsToBorrow([])}
                        disabled={!Boolean(nftsToBorrow.length)}
                    >
                        Cancel
                    </button>
                    <button
                        className={"confirm active"}
                        onClick={BorrowNFTs}
                        disabled={!Boolean(nftsToBorrow.length)}
                    >
                        Borrow
                    </button>
                </div>
            </CustomModal>
        </div>
    );
};

export default BorrowNFTModal;
