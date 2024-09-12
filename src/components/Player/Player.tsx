'use client';

import { Maximize, Pause, Play, RotateCcw, RotateCw } from 'lucide-react';
import { usePlayer } from './usePlayer';
import SelectQuality from './SelectQuality';
import ProgressBar from './ProgressBar';

export default function Player() {
	const {
		changeQuality,
		isPlaying,
		playerRef,
		quality,
		skipTime,
		toggleFullScreen,
		togglePlayOrPause,
		progress,
		currentTime,
		videoTime,
	} = usePlayer();

	return (
		<div className='max-w-4xl mx-auto relative rounded-lg overflow-hidden'>
			<video
				ref={playerRef}
				className='w-full h-full aspect-video'
				controls={false}
				src='tokyo.mp4'
				preload='metadata'
			/>
			<div className='flex items-center justify-between p-3 bg-dark-700 relative'>
				<ProgressBar progress={progress} />
				<div className='flex items-center gap-5'>
					<button onClick={togglePlayOrPause} className='hoverPrimary'>
						{isPlaying ? <Pause /> : <Play />}
					</button>
					<div className='flex items-center gap-2'>
						<button
							onClick={() => skipTime('backward')}
							className='hoverPrimary'
						>
							<RotateCcw />
						</button>
						<button
							onClick={() => skipTime('forward')}
							className='hoverPrimary'
						>
							<RotateCw />
						</button>
					</div>
					<div className='flex items-center gap-1 pl-3 border-l border-white/50'>
						<span>
							{Math.floor(currentTime / 60) +
								':' +
								('0' + Math.floor(currentTime % 60)).slice(-2)}
						</span>
						<span>/</span>
						<span>
							{Math.floor(videoTime / 60) +
								':' +
								('0' + Math.floor(videoTime % 60)).slice(-2)}
						</span>
					</div>
				</div>
				<div className='flex items-center gap-5'>
					<SelectQuality currentValue={quality} onChange={changeQuality} />
					<button onClick={toggleFullScreen} className='hoverPrimary'>
						<Maximize />
					</button>
				</div>
			</div>
		</div>
	);
}
