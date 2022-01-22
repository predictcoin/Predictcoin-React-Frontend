import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import CoinGecko from 'coingecko-api';
import { RiArrowRightDownFill, RiArrowRightUpFill } from 'react-icons/ri';
import { IoLogoBitcoin } from 'react-icons/io';
import { FaEthereum } from 'react-icons/fa';
import { SiLitecoin, SiDogecoin } from 'react-icons/si';
import { ResponsiveLine } from '@nivo/line';

import CoinTabDataModel from '../../models/CoinDataModel';
import './cointab.styles.scss';
import numFormatter from '../../helpers/numFormatter';

interface CoinTabProps extends CoinTabDataModel {
	active: boolean;
	setActive: Dispatch<SetStateAction<string>>;
}

const CoinTab: FC<CoinTabProps> = ({
	id,
	data,
	coinName,
	active,
	setActive,
}) => {
	const [loadingDetails, setLoadingDetails] = useState<boolean>(true);
	const [loadingChart, setLoadingChart] = useState<boolean>(true);
	const [coinImage, setCoinImage] = useState<string>('');
	const [coinDetails, setCoinDetails] = useState<any>();
	const client = new CoinGecko();

	const searchCoin = async () => {
		setLoadingDetails(true);
		try {
			const coin = await client.coins.fetch(id, {});
			console.log(coin);
			const coinData = coin.data;
			setCoinImage(coinData.image.small);
			setCoinDetails(coinData.market_data);
		} catch (error) {
			console.log(error);
		}
		setLoadingDetails(false);
	};

	const searchCoinChart = async () => {
		setLoadingChart(true);
		try {
			const coin = await client.coins.fetchMarketChartRange(id, {
				vs_currency: 'usd',
				from: Date.now() - 330000000,
				to: Date.now(),
			});
			const coinData = coin.data;
			console.log(coinData);
		} catch (error) {
			console.log(error);
		}
		setLoadingChart(false);
	};

	useEffect(() => {
		searchCoin();
		searchCoinChart();
	}, []);

	return (
		<div
			className={`coin__tab ${id} ${active ? 'active' : ''}`}
			onClick={() => setActive(id)}
		>
			<div className='coin__logo'>
				{coinName === 'BTC' && <IoLogoBitcoin />}
				{coinName === 'ETH' && <FaEthereum />}
				{coinName === 'LTC' && <SiLitecoin />}
				{coinName === 'DOGE' && <SiDogecoin />}
				{coinName === 'CRO' && coinImage && <img src={coinImage} alt='CRO' />}
			</div>
			<div className='coin__details'>
				<div className='value__name'>
					<p className='value'>
						{loadingDetails
							? '...'
							: numFormatter(coinDetails!.current_price?.usd)}
					</p>
					<p className='name'>{coinName}</p>
				</div>
				<div className='chart__rise__fall'>
					<div
						className={`chart ${
							Math.sign(coinDetails?.price_change_percentage_24h) === 1
								? 'up'
								: 'down'
						}`}
					>
						{!loadingDetails && (
							<ResponsiveLine
								data={data}
								margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
								xScale={{ type: 'linear' }}
								yScale={{
									type: 'linear',
									min: 'auto',
									max: 'auto',
									stacked: true,
									reverse: false,
								}}
								yFormat=' >-.2f'
								axisTop={null}
								axisRight={null}
								axisBottom={null}
								axisLeft={null}
								enableGridX={false}
								enableGridY={false}
								pointColor={{ theme: 'background' }}
								pointBorderWidth={0}
								pointBorderColor={{ from: 'serieColor' }}
								pointLabelYOffset={-12}
								useMesh={true}
							/>
						)}
					</div>
					<p className='rise__fall'>
						{loadingDetails ? (
							'...'
						) : Math.sign(coinDetails!.price_change_percentage_24h) === 1 ? (
							<span className='up'>
								<RiArrowRightUpFill />
								<span>
									{numFormatter(coinDetails!.price_change_percentage_24h)}%
								</span>
							</span>
						) : (
							<span className='down'>
								<RiArrowRightDownFill />
								<span>
									{numFormatter(coinDetails!.price_change_percentage_24h)}%
								</span>
							</span>
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CoinTab;
