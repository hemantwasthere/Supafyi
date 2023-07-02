'use client'

import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

import useAuthModal from '@/hooks/useAuthModal'
import useOnPlay from '@/hooks/useOnPlay'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import useSubscribeModal from '@/hooks/useSubscribeModal'

export interface LibraryProps {
    songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
    const authModal = useAuthModal()
    const { user, subscription } = useUser()
    const uploadModal = useUploadModal()
    const subscribeModal = useSubscribeModal()

    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if (!user) return authModal.onOpen()

        if (!subscription) return subscribeModal.onOpen()

        return uploadModal.onOpen()
    }
    return (
        <div className='flex flex-col'>
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className='text-neutral-400' size={25} />
                    <p className='text-neutral-400 font-medium text-md'>Your Library</p>
                </div>
                <AiOutlinePlus onClick={onClick} size={20} className='cursor-pointer text-neutral-400 hover:text-white transition' />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library