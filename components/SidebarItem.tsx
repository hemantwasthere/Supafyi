import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

export interface SidebarItemProps {
    icon: IconType
    label: string
    active?: boolean
    href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, href }) => {
    return (
        <Link href={href} className={twMerge(`
        flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
            active && 'text-white'
        )}>
            <div className="relative">
                <Icon size={26} />
                {active && href === '/search' && <div className='absolute p-1 top-[7.19px] left-[7px] bg-white rounded-full' />}
            </div>
            <p className='truncate w-full'>{label}</p>
        </Link>
    )
}

export default SidebarItem