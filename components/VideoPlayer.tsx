'use client';

import ReactPlayer from 'react-player';

interface VideoPlayerProps {
    url: string;
    poster?: string;
}

export default function VideoPlayer({ url, poster }: VideoPlayerProps) {
    return (
        <div id="video-frame" className="relative w-full aspect-video bg-black rounded-xl overflow-hidden ">
            <ReactPlayer
                src={url}
                width="100%"
                height="100%"
                controls
                playing
                playsInline
                poster={poster}
                controlsList="nodownload"
            />
        </div>
    );
}