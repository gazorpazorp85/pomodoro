import { useEffect, useRef, useState } from 'react';

import playIcon from '../../assets/imgs/play.png';
import pauseIcon from '../../assets/imgs/pause.png';

function SoundIcon({ selectedClassHandler, settingsUpdateHandler, soundType }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();

    const iconHandler = () => {
        return isPlaying ? pauseIcon : playIcon;
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    return (
        <div className="flex column align-center">
            <div
                className="pointer sound-option-icon"
                onClick={() => settingsUpdateHandler('sound', soundType)}
            >{selectedClassHandler('sound', soundType) || soundType}
            </div>
            <div onClick={() => setIsPlaying(!isPlaying)}>
                <img src={iconHandler()} alt="" />
            </div>
            <audio ref={audioRef} src={`sounds/alarm${soundType}.mp3`} />
        </div>
    )
}

export { SoundIcon }