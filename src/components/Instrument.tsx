import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

type Props = {
	analyser: any;
	setAvailable: (arg0: boolean) => void;
	available: boolean;
	children?: React.ReactNode;
};
interface KeyMapping {
	key: string;
	note: string;
}

const Instrument = ({ analyser, setAvailable, available }: Props) => {
	const [soundName, setSoundName] = useState('piano');
	const notes = [
		'A0',
		'Bb0',
		'B0',
		'C1',
		'Db1',
		'D1',
		'Eb1',
		'E1',
		'F1',
		'Gb1',
		'G1',
		'Ab1',
		'A1',
		'Bb1',
		'B1',
		'C2',
		'Db2',
		'D2',
		'Eb2',
		'E2',
		'F2',
		'Gb2',
		'G2',
		'Ab2',
		'A2',
		'Bb2',
		'B2',
		'C3',
		'Db3',
		'D3',
		'Eb3',
		'E3',
		'F3',
		'Gb3',
		'G3',
		'Ab3',
		'A3',
		'Bb3',
		'B3',
		'C4',
		'Db4',
		'D4',
		'Eb4',
		'E4',
		'F4',
		'Gb4',
		'G4',
		'Ab4',
		'A4',
		'Bb4',
		'B4',
		'C5',
		'Db5',
		'D5',
		'Eb5',
		'E5',
		'F5',
		'Gb5',
		'G5',
		'Ab5',
		'A5',
		'Bb5',
		'B5',
		'C6',
		'Db6',
		'D6',
		'Eb6',
		'E6',
		'F6',
		'Gb6',
		'G6',
		'Ab6',
		'A6',
		'Bb6',
		'B6',
		'C7',
		'Db7',
		'D7',
		'Eb7',
		'E7',
		'F7',
		'Gb7',
		'G7',
	];

	// 건반과 비슷한 키 매핑 설정
	const keyMappings: KeyMapping[] = [
		{ key: 'a', note: 'C4' },
		{ key: 'w', note: 'Db4' },
		{ key: 's', note: 'D4' },
		{ key: 'e', note: 'Eb4' },
		{ key: 'd', note: 'E4' },
		{ key: 'f', note: 'F4' },
		{ key: 't', note: 'Gb4' },
		{ key: 'g', note: 'G4' },
		{ key: 'y', note: 'Ab4' },
		{ key: 'h', note: 'A4' },
		{ key: 'u', note: 'Bb4' },
		{ key: 'j', note: 'B4' },
		{ key: 'k', note: 'C5' },
	];

	const pianoNotePaths = notes.map((note) => `inst/piano/${note}.mp3`);
	const guitarNotePaths = notes.map((note) => `inst/guitar/${note}.mp3`);
	const pianoSounds = new Tone.Sampler(
		Object.fromEntries(
			notes.map((note) => [note, pianoNotePaths[notes.indexOf(note)]]),
		),
	)
		.connect(analyser)
		.toDestination();

	const guitarSounds = new Tone.Sampler(
		Object.fromEntries(
			notes.map((note) => [note, guitarNotePaths[notes.indexOf(note)]]),
		),
	)
		.connect(analyser)
		.toDestination();

	// 건반 다운 이벤트 핸들러
	function keyDownHandler(event: KeyboardEvent) {
		if (available) {
			setAvailable(false);
		}
		const keyMapping = keyMappings.find(
			({ key }) => `Key${key.toUpperCase()}` == event.code,
		);

		if (keyMapping) {
			if (soundName === 'piano') {
				pianoSounds.triggerAttack(keyMapping.note);
				return;
			}
			if (soundName === 'guitar') {
				guitarSounds.triggerAttack(keyMapping.note);
				return;
			}
		}
	}

	// 건반 업 이벤트 핸들러
	function keyUpHandler(event: KeyboardEvent) {
		const keyMapping = keyMappings.find(
			({ key }) => `Key${key.toUpperCase}` == event.code,
		);

		if (keyMapping) {
			if (soundName === 'piano') {
				pianoSounds.triggerAttack(keyMapping.note);
				return;
			}
			if (soundName === 'guitar') {
				guitarSounds.triggerAttack(keyMapping.note);
				return;
			}
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', keyDownHandler);
		window.addEventListener('keyup', keyUpHandler);

		return () => {
			window.removeEventListener('keydown', keyDownHandler);
			window.removeEventListener('keyup', keyUpHandler);
		};
	}, [soundName]);
	return (
		<div className="flex justify-around gap-2 items-center">
			<button
				className="h-16 w-1/3 border border-slate-500 bg-slate-100/20 rounded hover:scale-y-125 transition"
				onClick={() => setSoundName('guitar')}
			>
				기타
			</button>
			<button
				className="h-16 w-1/3 border border-slate-500 bg-slate-100/20 rounded hover:scale-y-125 transition"
				onClick={() => setSoundName('piano')}
			>
				피아노
			</button>
		</div>
	);
};

export default Instrument;
