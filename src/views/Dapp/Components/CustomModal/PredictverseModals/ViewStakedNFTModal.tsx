import { FC, useEffect } from "react";

import CustomModal from "..";
import CustomCheckbox from "../../CustomCheckbox";
import NFTCard from "../../NFTCard";
import './viewstakednftmodal.styles.scss';

interface ViewStakedNFTModalProps {
    closeModal: (open: boolean) => void;
}

const ViewStakedNFTModal: FC<ViewStakedNFTModalProps> = ({ closeModal }) => {
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
                    <div className="nft__card__container">
                        <div className="checkbox__container">
                            <CustomCheckbox
                                id={`remove-me`}
                                name={`remove-me`}
                                color="#2d173f"
                                size="20px"
                                strokeColor="transparent"
                                checkedColor="transparent"
                                checkedStrokeColor="#2d173f"
                                // onChange={(evt) =>
                                //     toggleNFTStake(evt, asset.asset_id)
                                // }
                            />
                        </div>
                        <NFTCard nftDetails={{}} />
                    </div>
                    <div className="nft__card__container">
                        <div className="checkbox__container">
                            <CustomCheckbox
                                id={`remove-me1`}
                                name={`remove-me1`}
                                color="#2d173f"
                                size="20px"
                                strokeColor="transparent"
                                checkedColor="transparent"
                                checkedStrokeColor="#2d173f"
                                // onChange={(evt) =>
                                //     toggleNFTStake(evt, asset.asset_id)
                                // }
                            />
                        </div>
                        <NFTCard nftDetails={{}} />
                    </div>
                    <div className="nft__card__container">
                        <div className="checkbox__container">
                            <CustomCheckbox
                                id={`remove-me2`}
                                name={`remove-me2`}
                                color="#2d173f"
                                size="20px"
                                strokeColor="transparent"
                                checkedColor="transparent"
                                checkedStrokeColor="#2d173f"
                                // onChange={(evt) =>
                                //     toggleNFTStake(evt, asset.asset_id)
                                // }
                            />
                        </div>
                        <NFTCard nftDetails={{}} />
                    </div>
                </div>

                <div className="buttons">
                    <button className={"confirm active"}>Withdraw</button>
                </div>
            </CustomModal>
        </div>
    );
};

export default ViewStakedNFTModal;
