import { FC, useState } from "react";
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
    NFTAddress
}) => {
    const { active, chainId } = useWalletViewModel();
    const { balance: totalPREDCollateral } = useToken(TOKENS[chainId].PRED);
    const { borrow, withdraw } = usePredictverseMarketViewModel();
    const {
        allowed: withdrawAllowed,
        approve: approveWithdraw,
        nameSymbol
    } = useERC721(NFTAddress);
    const { allowed: borrowAllowed, approve: approveBorrow } =
        useERC721(NFTAddress);
    const [walletModal, setWalletModal] = useState<boolean>(false);
    const [showViewBorrowedNFTModal, setShowViewBorrowedNFTModal] = useState<{
        open: boolean;
        title: string;
    }>({ open: false, title: "" });
    const [showBorrowNFTModal, setShowBorrowNFTModal] = useState<{
        open: boolean;
        title: string;
    }>({ open: false, title: "" });

    const closeViewBorrowedNFTModal = (open: boolean) => {
        setShowViewBorrowedNFTModal({ open, title: "" });
    };

    const closeBorrowedNFTModal = (open: boolean) => {
        setShowBorrowNFTModal({ open, title: "" });
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

    const withdrawButton = (
        <button
            className={`action harvest ${noOfBorrowedNFTs === 0 && "inactive"}`}
            onClick={() => {
                setShowViewBorrowedNFTModal({ open: true, title: "" });
            }}
        >
            Withdraw
        </button>
    );

    const borrowButton = (
        <button
            className={`action`}
            onClick={() => {
                setShowBorrowNFTModal({ open: true, title: "" });
            }}
        >
            Borrow
        </button>
    );

    const approveWithdrawButton = (
        <button
            className={`action`}
            onClick={() => approveWithdraw(contractAddress, true)}
        >
            Approve
        </button>
    );

    const approveBorrowButton = (
        <button
            className={`action`}
            onClick={() => approveBorrow(contractAddress, true)}
        >
            Approve
        </button>
    );

    let mainButton = !active ? (
        unlockButton
    ) : (
        <>
            {withdrawButton}
            {borrowButton}
        </>
    );

    return (
        <>
            {showBorrowNFTModal.open && (
                <BorrowNFTModal
                    closeModal={closeBorrowedNFTModal}
                    predNFTsToBorrow={availableNFTs}
                    borrow={borrow}
                    nameSymbol={nameSymbol}
                />
            )}
            {showViewBorrowedNFTModal.open && (
                <ViewBorrowedNFTModal
                    closeModal={closeViewBorrowedNFTModal}
                    borrowedNFTs={borrowedNFTs}
                    withdraw={withdraw}
                    nameSymbol={nameSymbol}
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
                        <p className="multiple">6x</p>
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
                                                PRED NFT/PRED
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
                            <div className="unlock__text">
                                <p>unlock wallet to begin borrowing</p>
                                <HiOutlineArrowDown />
                            </div>
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
                            Total PRED (Collateral):{" "}
                            {totalPREDCollateral.toNumber()}
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
