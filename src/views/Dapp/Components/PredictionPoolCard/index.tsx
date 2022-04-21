import { FC, useEffect, useState } from "react";
import { HiOutlineArrowDown } from "react-icons/hi";
import CRPLogo from "../../../../assets/pics/CRP.png";
import MMFLogo from "../../../../assets/pics/meerkat.png";
// import BUSD from '../../../../assets/pics/BUSD.png';
import ExportIcon from "../../../../assets/appSvgs/ExportIcon";
import "../StakingCard/stakingcard.styles.css";
import "./predictionPoolCard.styles.scss";
import {
    useLoserPredictionPoolViewModel,
    useWinnerPredictionPoolViewModel
} from "../../application/controllers/predictionPoolsViewModel";
import useToken from "../../hooks/useToken";
import { getTokenAddress } from "../../lib/utils/token";
import { constants, utils } from "ethers";
import {
    displayDecimals,
    displayTokenValue,
    toNumberLib
} from "../../lib/utils/number";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import ConnectModal from "../CustomModal/ModalConnect";
import { StakeModal } from "../CustomModal/StakeModal";
import BigNumber from "bignumber.js";
// import QuestionIcon from "../../../../assets/icons/question.svg";

interface Props {
    type: "winner" | "loser";
}

const PredictionPoolCard: FC<Props> = ({ type }) => {
    // const tooltip_message = `To gain access to the Predict Pool, you have to predict on any of the coins on
    //      cropredict.finance/prediction between 13:00 UTC to 14:00 UTC every Monday. 
    //      Predict Pool launches every weekend on cropredict.finance/staking. 
    //      Winners & Losers have 7 days to earn their rewards with the wallet they predicted with.`;

    // const [toolTip, setToolTip] = useState<string>("");
    // const [isClicked, setIsClicked] = useState<boolean>(false);
    const mainHook =
        type === "loser"
            ? useLoserPredictionPoolViewModel
            : useWinnerPredictionPoolViewModel;
    const { active, address } = useWalletViewModel();
    const { stake, unStake, harvest, cardData, contract } = mainHook();
    const contractAddress = contract.address;
    const {
        apr,
        earnToken,

        stakeToken,
        stakeTokenPrice,
        totalStaked,

        contractUrl,
        staked,
        USDStaked,
        earned,
        USDEarned,
        lostRound,
        wonRound,
        round
    } = cardData;

    const [walletModal, setWalletModal] = useState<boolean>(false);
    const { getAllowance, allowances, approve, decimals, balance } = useToken(
        getTokenAddress(stakeToken)
    );
    const { decimals: earnDecimals } = useToken(getTokenAddress(earnToken));
    const [amount, setAmount] = useState<string>();
    const [stakeModal, setStakeModal] = useState<{
        open: boolean;
        title: string;
    }>({ open: false, title: "" });

    useEffect(() => {
        active && getAllowance(contractAddress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    const eligible = type === "loser" ? lostRound : wonRound;

    const closeStakeModal = (open: boolean) => {
        setStakeModal({ open, title: "" });
        _setAmount({ target: { value: "" } });
    };

    const stakeHandler = () => {
        stake(
            earnToken,
            utils.parseUnits(amount || "0", decimals).toString(),
            amount || "0"
        );
        closeStakeModal(false);
    };

    const unstakeHandler = () => {
        unStake(
            stakeToken,
            utils.parseUnits(amount || "0", decimals).toString(),
            amount || "0"
        );
        closeStakeModal(false);
    };

    const _setAmount = ({
        target: { value }
    }: {
        target: { value: string };
    }) => {
        if (isNaN(+value)) {
            setAmount(amount);
        } else {
            setAmount(value);
        }
    };

    const allowed = contractAddress && allowances[contractAddress]?.gte(1);
    // buttons
    const unlockButton = (
        <button
            className={`action unlock`}
            onClick={() => setWalletModal(true)}
        >
            Unlock Wallet
        </button>
    );

    const harvetButton = (
        <button
            className={`action harvest ${+earned === 0 && "inactive"}`}
            onClick={() => harvest(earnToken)}
        >
            Harvest
        </button>
    );

    const approveButton = (
        <button
            className={`action`}
            onClick={() => approve(contractAddress, constants.MaxUint256)}
        >
            Approve
        </button>
    );

    // const handleShowTooltip = (
    //     e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
    // ) => {
    //     e.preventDefault();

    //     setIsClicked(!isClicked);
    //     setToolTip(tooltip_message);
    //     console.log(tooltip_message);
    // };

    let mainButton = !active
        ? unlockButton
        : allowed
        ? harvetButton
        : approveButton;

    return (
        <>
            {stakeModal.open && (
                <StakeModal
                    closeModal={closeStakeModal}
                    tokenName={stakeToken as string}
                    value={amount || ""}
                    usdValue={new BigNumber(stakeTokenPrice)
                        .times(amount || 0)
                        .toFixed()}
                    balance={
                        stakeModal.title === "Stake"
                            ? toNumberLib(balance).toFixed()
                            : staked
                    }
                    type={stakeModal.title}
                    confirm={
                        stakeModal.title === "Stake"
                            ? stakeHandler
                            : unstakeHandler
                    }
                    onChange={_setAmount}
                    decimals={decimals}
                />
            )}

            {walletModal && <ConnectModal closeModal={setWalletModal} />}
            <div className="staking__card">
                <div className="staking__card__top">
                    <div className="token__images">
                        <img
                            src={type === "loser" ? MMFLogo : CRPLogo}
                            alt="predict-coin-logo"
                        />

                        {/*  */}
                        {/* <img
                            // className="tooltip"
                            src={QuestionIcon}
                            alt="predict-coin-logo"
                            style={{ marginLeft: 10, width: 20, height: 20 }}
                            title={tooltip_message}
                        /> */}
                        {/* <p className="tooltip__text">{tooltip_message}</p> */}
                    </div>

                    <div className="token__title">
                        <p className="round">Round #{round}</p>
                    </div>
                </div>

                <div className="staking__card__content">
                    <div className="price__stake">
                        <div className="price">
                            <div className="section">
                                <div>
                                    <span className="light">APR</span>

                                    <span className="normal">
                                        {apr === "Infinity"
                                            ? "100000"
                                            : displayDecimals(apr, 2)}
                                        %
                                    </span>
                                </div>
                                <div>
                                    <span className="light">STAKE/EARN</span>
                                    <span className="normal">
                                        {stakeToken}/{earnToken}
                                    </span>
                                </div>
                                <div>
                                    <span className="light">EARNINGS</span>
                                    <span className="normal">
                                        {displayTokenValue(
                                            earned,
                                            earnDecimals || 18,
                                            5
                                        )}{" "}
                                        <span className="dollar">
                                            {" "}
                                            ~$
                                            {displayTokenValue(
                                                USDEarned,
                                                earnDecimals || decimals,
                                                2
                                            )}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {active ? (
                            <div className="stake">
                                <button
                                    className={`minus ${
                                        eligible && allowed && "active"
                                    }`}
                                    onClick={() =>
                                        setStakeModal({
                                            title: "Unstake",
                                            open: true
                                        })
                                    }
                                >
                                    <span
                                        className={`${
                                            eligible && allowed && "active"
                                        }`}
                                    >
                                        {" "}
                                        -{" "}
                                    </span>
                                </button>
                                <div className="usdt__staked">
                                    <p>CRP Staked</p>
                                    <div>
                                        <span className="amount">
                                            {displayTokenValue(
                                                staked,
                                                decimals,
                                                5
                                            )}
                                        </span>
                                        <span className="dollar">
                                            {" "}
                                            ~$
                                            {displayTokenValue(
                                                USDStaked,
                                                decimals,
                                                2
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className={`add ${
                                        eligible && allowed && "active"
                                    }`}
                                    onClick={() =>
                                        setStakeModal({
                                            title: "Stake",
                                            open: true
                                        })
                                    }
                                >
                                    <span
                                        className={`${
                                            eligible && allowed && "active"
                                        }`}
                                    >
                                        {" "}
                                        +{" "}
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <div className="unlock__text">
                                <p>unlock wallet to begin staking</p>
                                <HiOutlineArrowDown />
                            </div>
                        )}
                        <div className={`action__container`}>{mainButton}</div>
                    </div>

                    <div className="stake__details">
                        <p>
                            Total staked:{" "}
                            {displayTokenValue(totalStaked, decimals, 5)}
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

export default PredictionPoolCard;
