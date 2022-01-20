import { FC } from 'react';

const CACoins: FC = (props) => (
	<svg
		width={29}
		height={63}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			opacity={0.405}
			d='m28.028 77.522 9.746-5.577L78 .742H26.345l-6.671 71.203 8.354 5.577Z'
			fill='url(#a)'
		/>
		<path
			opacity={0.405}
			d='M19.673 72.017.181 5.965h37.592L23.85 80.275l-4.177-8.258Z'
			fill='url(#b)'
		/>
		<path
			d='M9.739 44.5c-2.332-1.52-3.973-1.685-4.974-.98l-1.58.825.37.532c-1.207 3.606 1.91 11.828 8.454 15.737 1.377.823 2.508 1.236 3.41 1.32l.343.493 1.14-.728c3.454-1.768.186-12.405-7.163-17.198Z'
			fill='#D7911D'
		/>
		<path
			d='M7.838 45.28c9.568 6.265 12.724 22.4 2.559 16.303C.23 55.486-1.73 39.015 7.838 45.28Z'
			fill='url(#c)'
		/>
		<path
			opacity={0.4}
			d='M8.349 47.754c6.85 4.633 8.976 16.215 1.696 11.706-7.279-4.51-8.547-16.339-1.696-11.706Z'
			stroke='#D7911D'
			strokeWidth={0.574}
		/>
		<path
			d='M15.435 21.805c.008-1.903-.522-2.868-1.321-3.123l-1.092-.52-.174.422c-2.595.834-6.267 5.943-6.077 11.135.04 1.093.227 1.882.523 2.41l-.161.39.866.322c2.367 1.154 7.41-5.038 7.436-11.036Z'
			fill='#D7911D'
		/>
		<path
			d='M14.333 21.21c-.049 7.82-8.388 16.228-8.667 8.151-.28-8.077 8.715-15.97 8.667-8.15Z'
			fill='url(#d)'
		/>
		<path
			opacity={0.3}
			d='M13.374 22.117c-.037 6.08-6.52 12.617-6.738 6.337-.218-6.28 6.776-12.416 6.738-6.337Z'
			stroke='#D7911D'
			strokeWidth={0.574}
		/>
		<defs>
			<linearGradient
				id='a'
				x1={63.333}
				y1={8.931}
				x2={63.333}
				y2={109.53}
				gradientUnits='userSpaceOnUse'
			>
				<stop stopColor='#FDF27D' stopOpacity={0.01} />
				<stop offset={0.494} stopColor='#FCF17B' stopOpacity={0.24} />
				<stop offset={1} stopColor='#FBF079' />
			</linearGradient>
			<linearGradient
				id='b'
				x1={44.988}
				y1={14.281}
				x2={44.988}
				y2={86.407}
				gradientUnits='userSpaceOnUse'
			>
				<stop stopColor='#FDF27D' stopOpacity={0.01} />
				<stop offset={0.494} stopColor='#FCF17B' stopOpacity={0.24} />
				<stop offset={1} stopColor='#FBF079' />
			</linearGradient>
			<linearGradient
				id='c'
				x1={18.982}
				y1={40.528}
				x2={27.142}
				y2={64.46}
				gradientUnits='userSpaceOnUse'
			>
				<stop stopColor='#FFF585' />
				<stop offset={1} stopColor='#DCC613' />
			</linearGradient>
			<linearGradient
				id='d'
				x1={21.405}
				y1={25.327}
				x2={11.095}
				y2={40.202}
				gradientUnits='userSpaceOnUse'
			>
				<stop stopColor='#FFF585' />
				<stop offset={1} stopColor='#DCC613' />
			</linearGradient>
		</defs>
	</svg>
);

export default CACoins;
