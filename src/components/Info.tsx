import React from 'react';

interface Props {
	isConnected: boolean;
}
const Info = ({ isConnected }: Props) => {
	return (
		<div className="h-auto w-11/12 flex items-center gap-2">
			<div
				className={`${
					isConnected ? 'bg-emerald-400' : 'bg-red-600'
				} rounded-full w-4 h-4 shadow-inner shadow-black-100 border-none animate-pulse`}
			></div>
			<p className="font-bold text-red-200">
				{isConnected ? 'Play Music!' : '장치가 연결되었는지 확인해주세요.'}
			</p>
		</div>
	);
};

export default Info;
