import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-screen h-screen flex flex-col bg-[#14053A]/90 justify-center items-center \">
			<div className="my-auto mx-auto w-full h-full shadow-lg relative">
				<div className="relative overflow-hidden w-full h-full bg-[#f5fee7]">
					<div className="bg-background bg-cover absolute w-[98%] h-[97%] top-[1.5%] left-[1%] rounded-xl"></div>
					<div className="backdrop-blur-sm bg-slate-50/20 absolute w-[98%] h-[97%] top-[1.5%] left-[1%] rounded-xl"></div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Container;
