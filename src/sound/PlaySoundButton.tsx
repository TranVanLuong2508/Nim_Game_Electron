// PlaySoundButton.tsx
import React from 'react'
import { AudioLines } from 'lucide-react';
import useSound from 'use-sound'

const PlaySoundButton = () => {
    const [play] = useSound('../../public/sound/ECNHQ.mp3', {
        volume: 0.5,
    })

    return (
        <button
            onClick={() => play()}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 rounded-[50%] w-[50px] h-[50px]'
        >
            <AudioLines />
        </button>
    )
}

export default PlaySoundButton
