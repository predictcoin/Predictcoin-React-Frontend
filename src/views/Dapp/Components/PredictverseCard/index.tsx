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
import { PREDICTVERSE_ADDRESSES } from "../../constants/addresses";
import StakeNFTModal from "../CustomModal/PredictverseModals/StakeNFTModal";
import ViewStakedNFTModal from "../CustomModal/PredictverseModals/ViewStakedNFTModal";
import "./predictversecard.styles.scss";
import usePredictverseViewModel from "../../application/controllers/predictverseViewModel";
import useERC721 from "../../hooks/predictverse/useERC721";
import PredictverseCardModel from "../../models/PredictverseCardModel";

const contractAddress =
    PREDICTVERSE_ADDRESSES[
        process.env.REACT_APP_ENVIRONMENT as keyof typeof PREDICTVERSE_ADDRESSES
    ];

const PredictverseCard: FC<PredictverseCardModel> = ({
    id,
    apr,
    earned,
    stakedNFTs,
    totalNFTStaked,
    contractUrl,
    USDStaked,
    walletUnlockStatus,
    USDEarned,
    staked,
    NFTAddress
}) => {
    const { active } = useWalletViewModel();
    const { stake, harvest, withdraw } = usePredictverseViewModel();
    const { balance, allowed, approve, getAllowed, getBalance } =
        useERC721(NFTAddress);
    const [walletModal, setWalletModal] = useState<boolean>(false);
    const [showViewStakedNFTModal, setShowViewStakedNFTModal] = useState<{
        open: boolean;
        title: string;
    }>({ open: false, title: "" });
    const [showStakeNFTModal, setShowStakeNFTModal] = useState<{
        open: boolean;
        title: string;
    }>({ open: false, title: "" });
    const [amount, setAmount] = useState<string>("");

    const closeViewStakedNFTModal = (open: boolean) => {
        setShowViewStakedNFTModal({ open, title: "" });
    };

    const closeStakedNFTModal = (open: boolean) => {
        setShowStakeNFTModal({ open, title: "" });
    };

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
        <button
            className={`action harvest ${+earned === 0 && "inactive"}`}
            onClick={() => harvest(+id)}
        >
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

    const approveButton = (
        <button
            className={`action`}
            onClick={() => approve(contractAddress, true)}
        >
            Approve
        </button>
    );

    console.log(allowed);

    let mainButton = !active ? (
        unlockButton
    ) : allowed ? (
        <>
            {harvestButton}
            {depositButton}
        </>
    ) : (
        approveButton
    );

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
                                {active && allowed && (
                                    <>
                                        <div>
                                            <span className="light">
                                                EARNINGS
                                            </span>
                                            <span className="normal">
                                                0.0{" "}
                                                <span className="dollar">
                                                    {" "}
                                                    ~$0.0
                                                </span>
                                            </span>
                                        </div>
                                        <div>
                                            <span className="light">
                                                NFTs STAKED
                                            </span>
                                            <span className="normal">
                                                {staked}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {active && allowed && (
                            <div className="user__connected">
                                <button
                                    className={`view__staked__nfts`}
                                    onClick={() => {
                                        setShowViewStakedNFTModal({
                                            open: true,
                                            title: ""
                                        });
                                    }}
                                >
                                    View staked NFTs
                                </button>
                            </div>
                        )}

                        {!active && !allowed && (
                            <div className="unlock__text">
                                <p>unlock wallet to begin staking</p>
                                <HiOutlineArrowDown />
                            </div>
                        )}

                        <div
                            className={`action__container ${
                                active && allowed ? "two" : ""
                            }`}
                        >
                            {mainButton}
                        </div>
                    </div>

                    <div className="stake__details">
                        <p>Total NFT staked: {totalNFTStaked}</p>
                        <a href={contractUrl} target="_true">
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
