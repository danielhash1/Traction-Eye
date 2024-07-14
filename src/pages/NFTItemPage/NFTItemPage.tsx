import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { nfts } from '../IndexPage/IndexPage';
import { NFT } from '@/types/types';

import copy from 'clipboard-copy';
import { postEvent } from '@telegram-apps/sdk';

// icons
import { FaRegCopy } from 'react-icons/fa6';
import { IoMdDoneAll } from 'react-icons/io';

const NFTItemPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const nft = nfts.find((nft: NFT) => nft.id.toString() === id);

    const shortenAddress = (address: string, startLength: number = 7, endLength: number = 4): string => {
        const start = address.substring(0, startLength);
        const end = address.substring(address.length - endLength);
        return `${start}...${end}`;
    };

    const copyToClipboard = (text: string) => {
        copy(text);
        postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'light' });
        // alert(`Copied: ${text}`);
    };

    if (!nft) {
        return <div>NFT not found</div>;
    }

    return (
        <div className='h-screen bg-gray-50 flex flex-col p-5'>
            <img className='rounded-lg shadow-lg w-full' src={nft.image_url} alt={nft.name} />
            <h1 className='text-3xl flex py-5 text-start font-bold'>{nft.name}</h1>

            <span className='w-full border-b'></span>

            <ul className='gap-3 mt-5 text-base'>
                <li className='flex justify-between mb-4'>
                    <div className='text-gray-400 font-semibold'>Last Price</div>
                    <div className='font-semibold'>$0.31</div>
                </li>

                <li className='flex justify-between mb-4'>
                    <div className='text-gray-400 font-semibold'>Collection</div>
                    <div className='font-semibold'>{nft.collection_name}</div>
                </li>

                <li className='flex justify-between mb-5'>
                    <div className='text-gray-400 font-semibold'>Purchase Date</div>
                    <div className='font-semibold'>23 / 12 / 2024</div>
                </li>

                <li className='flex justify-between'>
                    <div className='text-gray-400 font-semibold'>TON Address</div>
                    <div className='font-light font-mono cursor-pointer flex items-center' onClick={() => copyToClipboard(nft.nft_address)}>
                        <FaRegCopy className='mr-2 text-gray-700' /> {shortenAddress(nft.nft_address)}
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default NFTItemPage;