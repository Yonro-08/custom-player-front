import { useEffect, useRef, useState } from 'react';
import { EnumPlayerQuality, HTMLCustomVideoElement } from './player.types';

const SKIP_TIME_SECONDS = 15;

export function usePlayer() {
	const playerRef = useRef<HTMLCustomVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [quality, setQuality] = useState(EnumPlayerQuality['1080p']);

	const togglePlayOrPause = () => {
		if (isPlaying) {
			playerRef.current?.pause();
		} else {
			playerRef.current?.play();
		}
		setIsPlaying(!isPlaying);
	};

	const skipTime = (type?: 'forward' | 'backward') => {
		if (!playerRef.current?.currentTime) return;

		if (type === 'forward') {
			playerRef.current.currentTime += SKIP_TIME_SECONDS;
		} else {
			playerRef.current.currentTime -= SKIP_TIME_SECONDS;
		}
	};

	const toggleFullScreen = () => {
		if (!playerRef.current) return;

		if (playerRef.current.requestFullscreen) {
			playerRef.current.requestFullscreen();
		} else if (playerRef.current.mozRequestFullScreen) {
			playerRef.current.mozRequestFullScreen();
		} else if (playerRef.current.webkitRequestFullScreen) {
			playerRef.current.webkitRequestFullScreen();
		} else if (playerRef.current.msRequestFullScreen) {
			playerRef.current.msRequestFullScreen();
		}
	};

	const changeQuality = (quality: EnumPlayerQuality) => {
		if (!playerRef.current) return;
		setQuality(quality);
		playerRef.current.src = `/uploads/${quality}/1725203245814-102158888.mp4`;
		playerRef.current.currentTime = currentTime;
		playerRef.current.play();
		setIsPlaying(true);
	};

	const [currentTime, setCurrentTime] = useState(0);
	const [videoTime, setVideoTime] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const originalTime = playerRef.current?.duration;
		if (originalTime) setVideoTime(originalTime);
	}, [playerRef.current?.duration]);

	useEffect(() => {
		const updateProgress = () => {
			if (!playerRef.current) return;
			setCurrentTime(playerRef.current.currentTime);
			setProgress((currentTime / videoTime) * 100);
		};

		playerRef.current?.addEventListener('timeupdate', updateProgress);

		return () =>
			playerRef.current?.addEventListener('timeupdate', updateProgress);
	}, [videoTime, currentTime]);

	return {
		playerRef,
		isPlaying,
		quality,
		togglePlayOrPause,
		skipTime,
		toggleFullScreen,
		changeQuality,
		progress,
		videoTime,
		currentTime,
	};
}
