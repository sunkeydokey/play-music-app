import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import Instrument from './Instrument';
import Info from './Info';

const Audio = () => {
	const audioCtx = new AudioContext();
	const [available, setAvailable] = useState(true);
	const [isConnected, setIsConnected] = useState(false);
	const analyser = new Tone.Analyser('waveform', 1024);

	const kick = new Tone.MembraneSynth().connect(analyser).toDestination();
	const snare = new Tone.MetalSynth().connect(analyser).toDestination();
	const floorTom = new Tone.MembraneSynth().connect(analyser).toDestination();
	const hiHat = new Tone.NoiseSynth().connect(analyser).toDestination();
	const runAudio = async (data: { type: string; keyCode: string }) => {
		switch (data.keyCode) {
			case '1':
				kick.triggerAttackRelease('C1', '8n');
				break;
			case '2':
				snare.triggerAttackRelease('F#3', '8n');
				break;
			case '3':
				floorTom.triggerAttackRelease('C2', '8n');
				break;
			case '4':
				hiHat.triggerAttackRelease('16n');
				break;
			case '5':
				hiHat.triggerAttackRelease('16n');
				break;
			case '6':
				hiHat.triggerAttackRelease('16n');
				break;
			default:
				break;
		}
	};

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const drawWaveform = useCallback(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');
			if (ctx) {
				// 파형 높이와 너비
				const waveformWidth = canvas.width;
				const waveformHeight = canvas.height;

				const draw = () => {
					// Analyser.getData()를 사용하여 실시간 진폭 정보를 가져옴
					const waveform: any = analyser.getValue();

					// Canvas에 파형그리기
					ctx.clearRect(0, 0, waveformWidth, waveformHeight);
					ctx.beginPath();
					ctx.moveTo(0, waveformHeight / 2);
					for (let i = 0; i < waveform.length; i += 2) {
						const x = (i / waveform.length) * waveformWidth;
						const y: any = (waveform[i] / 2 + 0.5) * waveformHeight;
						ctx.lineTo(x, y);
						ctx.strokeStyle = '#db2777';
					}
					ctx.stroke();

					// requestAnimationFrame으로 30ms마다 draw함수 재호출
					requestAnimationFrame(draw);
				};
				draw();
			}
		}
	}, []);

	useEffect(() => {
		drawWaveform();
	}, [drawWaveform]);

	const ws = new WebSocket('ws://192.168.0.191:1880/switch');

	ws.onopen = () => {
		setIsConnected(true);
	};

	ws.onmessage = async (e) => {
		runAudio(JSON.parse(e.data));
	};

	ws.onclose = () => {
		setIsConnected(false);
	};

	return (
		<div>
			<Info isConnected={isConnected} />

			<button
				className={`px-2 ${!available && 'hidden'} border rounded bg-slate-200`}
				onClick={async () => {
					setAvailable(false);
					audioCtx.resume();
				}}
				disabled={!available}
			>
				시작
			</button>
			<canvas ref={canvasRef} width={600} height={200} />
			<Instrument
				available={available}
				setAvailable={setAvailable}
				analyser={analyser}
			/>
		</div>
	);
};

export default Audio;
