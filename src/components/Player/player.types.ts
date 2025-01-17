export interface HTMLCustomVideoElement extends HTMLVideoElement {
	mozRequestFullScreen?: () => Promise<void>;
	webkitRequestFullScreen?: () => Promise<void>;
	msRequestFullScreen?: () => Promise<void>;
}

export enum EnumPlayerQuality {
	'original' = 'Original',
	'1080p' = '1080p',
	'720p' = '720p',
	'480p' = '480p',
	'360p' = '360p',
}
