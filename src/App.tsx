import Audio from './components/Audio';
import Container from './components/Container';
import Header from './components/Header';

const App = () => {
	return (
		<Container>
			<div className="bg-background bg-cover absolute w-[98%] h-[97%] top-[1.5%] left-[1%] rounded-xl"></div>
			<div className="backdrop-blur-sm bg-slate-50/20 bg-cover absolute w-[98%] h-[97%] top-[1.5%] left-[1%] rounded-xl"></div>
			<div className="flex flex-col w-full h-full">
				<Header />

				<main className="flex flex-col justify-center items-center z-20 w-full h-full">
					<Audio />
				</main>
			</div>
		</Container>
	);
};

export default App;
