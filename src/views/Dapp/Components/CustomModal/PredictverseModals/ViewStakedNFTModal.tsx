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
    nameSymbol: {
        name: string;
        symbol: string;
    };
}

const ViewStakedNFTModal: FC<ViewStakedNFTModalProps> = ({
    closeModal,
    stakedNFTs,
    withdraw,
    pId,
    nameSymbol
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
        await withdraw(nFtsToWithdraw, pId);
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
        <div id="view__staked__nft__modal">
            <CustomModal>
                <h4>
                    Staked {`${nameSymbol.symbol}`} NFTs
                </h4>

                <div
                    className={`nft__cards__container ${
                        Boolean(Object.values(stakedNFTs).length)
                            ? "content"
                            : ""
                    } `}
                >
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
                            <NFTCard nftDetails={NFT} nameSymbol={nameSymbol} />
                        </div>
                    ))}
                </div>

                {!Boolean(Object.values(stakedNFTs).length) && (
                    <div className="no__nft">
                        <p>You currently do not have any staked NFTs</p>
                    </div>
                )}

                <div className="buttons">
                    <button
                        className={"confirm active"}
                        onClick={withdrawNFTs}
                        disabled={!Boolean(nFtsToWithdraw.length)}
                    >
                        Withdraw
                    </button>
                </div>
            </CustomModal>
        </div>
    );
};

export default ViewStakedNFTModal;
