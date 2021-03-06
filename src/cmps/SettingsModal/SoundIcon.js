import { useEffect, useRef, useState } from 'react';

import playIcon from '../../assets/imgs/play.png';
import pauseIcon from '../../assets/imgs/pause.png';

function SoundIcon({ selectedClassHandler, settingsUpdateHandler, type }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();
    const sound = require(`../../assets/sounds/alarm${type}.mp3`);

    const iconHandler = () => {
        return isPlaying ? pauseIcon : playIcon;
    }

    const selectSoundUpdate = () => {
        settingsUpdateHandler('sound', type);
        setIsPlaying(prevIsPlaying => !prevIsPlaying);
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    return (
        <div className="flex column align-center sound-option-icon-container">
            <div
                className="flex center align-center pointer sound-option-icon"
                onClick={() => setIsPlaying(!isPlaying)}
            >
                {selectedClassHandler('sound', type) || <img src={iconHandler()} alt="" />}
            </div>
            {isPlaying && <div className="pointer select-button" onClick={selectSoundUpdate}>Select</div>}
            <audio ref={audioRef} src={sound.default} />
        </div>
    )
}

export { SoundIcon }