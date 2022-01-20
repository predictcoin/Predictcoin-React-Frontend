import { FC } from 'react';

interface ExportIconProps {
	width?: number;
	height?: number;
}

const ExportIcon: FC<ExportIconProps> = ({ width, height, ...props }) => {
	return (
		<svg
			width={width ?? 16}
			height={height ?? 16}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M8.667 7.833a.494.494 0 0 1-.354-.147.503.503 0 0 1 0-.706l5.467-5.467a.503.503 0 0 1 .707 0 .503.503 0 0 1 0 .707L9.02 7.686c-.1.1-.227.147-.353.147Z'
				fill='#fff'
			/>
			<path
				d='M14.667 5.033a.504.504 0 0 1-.5-.5v-2.7h-2.7a.504.504 0 0 1-.5-.5c0-.273.226-.5.5-.5h3.2c.273 0 .5.227.5.5v3.2c0 .273-.227.5-.5.5ZM10 15.166H6C2.38 15.166.833 13.62.833 10V6C.833 2.38 2.38.833 6 .833h1.333c.274 0 .5.227.5.5s-.226.5-.5.5H6C2.927 1.833 1.833 2.926 1.833 6v4c0 3.073 1.094 4.166 4.167 4.166h4c3.073 0 4.167-1.093 4.167-4.166V8.666c0-.273.226-.5.5-.5.273 0 .5.227.5.5V10c0 3.62-1.547 5.166-5.167 5.166Z'
				fill='#fff'
			/>
		</svg>
	);
};

export default ExportIcon;
