import { FC, useEffect, useState } from "react";
import { HiOutlineArrowDown } from "react-icons/hi";

import ExportIcon from "../../../../assets/appSvgs/ExportIcon";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import ConnectModal from "../CustomModal/ModalConnect";
import {
    PREDICTVERSE_MARKET_ADDRESSES,
    TOKENS
} from "../../constants/addresses";
import BorrowNFTModal from "../CustomModal/PredictverseModals/BorrowNFTModal";
import ViewBorrowedNFTModal from "../CustomModal/PredictverseModals/ViewBorrowedNFTModal";
import useERC721 from "../../hooks/predictverse/useERC721";
import "./predictverseborrowcard.styles.scss";
import usePredictverseMarketViewModel from "../../application/controllers/predictverseMarketViewModel";
import PredictverseBorrowCardModel from "../../models/PredictverseBorrowCardModel";
import useToken from "../../hooks/useToken";
import { ethers } from "ethers";
import { displayDecimals } from "../../lib/utils/number";

const contractAddress =
    PREDICTVERSE_MARKET_ADDRESSES[
        process.env
            .REACT_APP_ENVIRONMENT as keyof typeof PREDICTVERSE_MARKET_ADDRESSES
    ];

const PredictverseBorrowCard: FC<PredictverseBorrowCardModel> = ({
    borrowedNFTs,
    contractUrl,
    walletUnlockStatus,
    availableNFTs,
    noOfAvailableNFTs,
    noOfBorrowedNFTs,
    NFTAddress,
    userPREDCollateral,
    singleNFTCollateral
}) => {
    const { active, chainId } = useWalletViewModel();
    const { balance, getAddressBalance } = useToken(TOKENS[chainId].PRED);
    const { borrow, payback } = usePredictverseMarketViewModel();
    const {
        allowed: paybackAllowed,
        approve: approvePayback,
        nameSymbol
    } = useERC721(NFTAddress, contractAddress);
    const {
        allowances: borrowAllowed,
        getAllowance,
        approve: approveBorrow,
        decimals
    } = useToken(TOKENS[chainId].PRED);
    const [walletModal, setWalletModal] = useState<boolean>(false);
    const [totalPREDCollateral, setTotalPREDCollateral] = useState<string>("0");
    const [showViewBorrowedNFTModal, setShowViewBorrowedNFTModal] = useState<{
        open: boolean;
        title: string;
    }>({ open: false, title: "" });
    const [showBorrowNFTModal, setShowBorrowNFTModal] = useState<{
        open: boolean;
        title: string;
        justView: boolean;
    }>({ open: false, title: "", justView: true });

    const closeViewBorrowedNFTModal = (open: boolean) => {
        setShowViewBorrowedNFTModal({ open, title: "" });
    };

    const closeBorrowedNFTModal = (open: boolean) => {
        setShowBorrowNFTModal({ open, title: "", justView: true });
    };

    const getTotalPREDCollateral = async () => {
        const newTotalPREDCollateral = await getAddressBalance(contractAddress);
        setTotalPREDCollateral(newTotalPREDCollateral.toString());
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

    const paybackButton = (
        <button
            className={`action harvest ${noOfBorrowedNFTs === 0 && "inactive"}`}
            onClick={() => {
                setShowViewBorrowedNFTModal({ open: true, title: "" });
            }}
        >
            Payback
        </button>
    );

    const borrowButton = (
        <button
            className={`action`}
            onClick={() => {
                setShowBorrowNFTModal({
                    open: true,
                    title: "",
                    justView: false
                });
            }}
        >
            Borrow
        </button>
    );

    let mainButton = !active ? (
        unlockButton
    ) : (
        <>
            {paybackButton}
            {borrowButton}
        </>
    );

    useEffect(() => {
        if(active) getAllowance(contractAddress);
        getTotalPREDCollateral();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [balance]);

    return (
        <>
            {showBorrowNFTModal.open && (
                <BorrowNFTModal
                    closeModal={closeBorrowedNFTModal}
                    predNFTsToBorrow={availableNFTs}
                    borrow={borrow}
                    nameSymbol={nameSymbol}
                    justView={showBorrowNFTModal.justView}
                    approved={borrowAllowed}
                    approveBorrow={approveBorrow}
                    contractAddress={contractAddress}
                    singleNFTCollateral={singleNFTCollateral}
                    decimals={decimals}
                />
            )}
            {showViewBorrowedNFTModal.open && (
                <ViewBorrowedNFTModal
                    closeModal={closeViewBorrowedNFTModal}
                    borrowedNFTs={borrowedNFTs}
                    payback={payback}
                    nameSymbol={nameSymbol}
                    approved={paybackAllowed}
                    approvePayback={approvePayback}
                    contractAddress={contractAddress}
                    decimals={decimals}
                />
            )}
            {walletModal && <ConnectModal closeModal={setWalletModal} />}

            <div className="predictverse__borrow__card">
                <div className="predictverse__borrow__card__top">
                    <div className="token__images">
                        <img
                            src="/assets/img/predcoin_logo.png"
                            alt="predict-coin-logo"
                        />
                    </div>

                    <div className="token__title">
                        <p className="name">PREDNFTs</p>
                    </div>
                </div>

                <div className="predictverse__borrow__card__content">
                    <div className="price__borrow">
                        <div className="price">
                            <div className="section">
                                <div>
                                    <span className="light">
                                        NFTs Available
                                    </span>
                                    <span className="normal">
                                        {noOfAvailableNFTs}
                                    </span>
                                </div>
                                {active && (
                                    <>
                                        <div>
                                            <span className="light">
                                                NFTs Borrowed
                                            </span>
                                            <span className="normal">
                                                {noOfBorrowedNFTs}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="light">
                                                PRED Deposited (collateral)
                                            </span>
                                            <span className="normal">
                                                {displayDecimals(
                                                    ethers.utils.formatUnits(
                                                        userPREDCollateral,
                                                        decimals
                                                    ),
                                                    5
                                                )}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {active && (
                            <div className="user__connected">
                                <button
                                    className={`view__borrowed__nfts`}
                                    onClick={() => {
                                        setShowViewBorrowedNFTModal({
                                            open: true,
                                            title: ""
                                        });
                                    }}
                                >
                                    View borrowed NFTs
                                </button>
                            </div>
                        )}

                        {!active && (
                            <>
                                <div className="user__connected">
                                    <button
                                        className={`view__borrowed__nfts`}
                                        onClick={() => {
                                            setShowBorrowNFTModal({
                                                open: true,
                                                title: "",
                                                justView: true
                                            });
                                        }}
                                    >
                                        View available NFTs
                                    </button>
                                </div>
                                <div className="unlock__text">
                                    <p>unlock wallet to begin borrowing</p>
                                    <HiOutlineArrowDown />
                                </div>
                            </>
                        )}

                        <div
                            className={`action__container ${
                                active ? "two" : ""
                            }`}
                        >
                            {mainButton}
                        </div>
                    </div>

                    <div className="borrow__details">
                        <p>
                            Total PRED Collateral:{" "}
                            {displayDecimals(
                                ethers.utils.formatUnits(
                                    totalPREDCollateral,
                                    decimals
                                ),
                                5
                            )}
                        </p>
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

export default PredictverseBorrowCard;
