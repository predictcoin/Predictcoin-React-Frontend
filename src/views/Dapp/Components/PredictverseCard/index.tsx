import { FC, useEffect, useState } from "react";
import { HiOutlineArrowDown } from "react-icons/hi";
import BigNumber from "bignumber.js";
import { constants, utils } from "ethers";

import ExportIcon from "../../../../assets/appSvgs/ExportIcon";
import {
    displayDecimals,
    displayTokenValue,
    toNumberLib
} from "../../lib/utils/number";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import ConnectModal from "../CustomModal/ModalConnect";
import { STAKING_ADDRESSES } from "../../constants/addresses";
import StakeNFTModal from "../CustomModal/PredictverseModals/StakeNFTModal";
import ViewStakedNFTModal from "../CustomModal/PredictverseModals/ViewStakedNFTModal";
import "./predictversecard.styles.scss";

interface Props {
    id: number;
}

const contractAddress =
    STAKING_ADDRESSES[
        process.env.REACT_APP_ENVIRONMENT as keyof typeof STAKING_ADDRESSES
    ];

const PredictverseCard: FC<Props> = ({ id }) => {
    const { active, address } = useWalletViewModel();

    const [walletModal, setWalletModal] = useState<boolean>(false);
    const [showViewStakedNFTModal, setShowViewStakedNFTModal] = useState<{
        open: boolean;
        title: string;
    }>({ open: false, title: "" });
    const [showStakeNFTModal, setShowStakeNFTModal] = useState<{
        open: boolean;
        title: string;
    }>({ open: false, title: "" });
    const [amount, setAmount] = useState<string>();

    const closeViewStakedNFTModal = (open: boolean) => {
        setShowViewStakedNFTModal({ open, title: "" });
    };

    const closeStakedNFTModal = (open: boolean) => {
        setShowStakeNFTModal({ open, title: "" });
    };

    const allowed = true;
    // buttons
    const unlockButton = (
        <button
            className={`action unlock`}
            onClick={() => setWalletModal(true)}
        >
            Unlock Wallet
        </button>
    );
    const harvestButton = (
        <button className={`action harvest`} onClick={() => null}>
            Harvest
        </button>
    );
    const depositButton = (
        <button
            className={`action`}
            onClick={() => {
                setShowStakeNFTModal({ open: true, title: "hello" });
            }}
        >
            Deposit
        </button>
    );

    let mainButton = active ? (
        unlockButton
    ) : allowed ? (
        <>
            {harvestButton}
            {depositButton}
        </>
    ) : null;

    return (
        <>
            {showStakeNFTModal.open && (
                <StakeNFTModal closeModal={closeStakedNFTModal} />
            )}
            {showViewStakedNFTModal.open && (
                <ViewStakedNFTModal closeModal={closeViewStakedNFTModal} />
            )}
            {walletModal && <ConnectModal closeModal={setWalletModal} />}

            <div className="predictverse__card">
                <div className="predictverse__card__top">
                    <div className="token__images">
                        <img
                            src="/assets/img/predcoin_logo.png"
                            alt="predict-coin-logo"
                        />
                    </div>

                    <div className="token__title">
                        <p className="name">PREDNFTs</p>
                        <p className="multiple">6x</p>
                    </div>
                </div>

                <div className="predictverse__card__content">
                    <div className="price__stake">
                        <div className="price">
                            <div className="section">
                                <div>
                                    <span className="light">APR</span>
                                    <span className="normal">100%</span>
                                </div>
                                <div>
                                    <span className="light">STAKE/EARN</span>
                                    <span className="normal">
                                        PRED NFT/PRED
                                    </span>
                                </div>
                                <div>
                                    <span className="light">EARNINGS</span>
                                    <span className="normal">
                                        0.0{" "}
                                        <span className="dollar"> ~$0.0</span>
                                    </span>
                                </div>
                                <div>
                                    <span className="light">NFTs STAKED</span>
                                    <span className="normal">0</span>
                                </div>
                            </div>
                        </div>

                        {true ? (
                            <div className="user__connected">
                                <button
                                    className={`view__staked__nfts`}
                                    onClick={() => {
                                        setShowViewStakedNFTModal({
                                            open: true,
                                            title: "hello"
                                        });
                                    }}
                                >
                                    View staked NFTs
                                </button>
                            </div>
                        ) : (
                            <div className="unlock__text">
                                <p>unlock wallet to begin staking</p>
                                <HiOutlineArrowDown />
                            </div>
                        )}

                        <div
                            className={`action__container ${
                                !active && allowed ? "two" : ""
                            }`}
                        >
                            {mainButton}
                        </div>
                    </div>

                    <div className="stake__details">
                        <p>Total NFT staked: {21802}</p>
                        <a href={"#"} target="_true">
                            <span>View Contract</span>
                            <ExportIcon />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PredictverseCard;
