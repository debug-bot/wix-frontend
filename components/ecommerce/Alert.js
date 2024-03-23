'use client';

import { Alert } from 'flowbite-react';
import Link from 'next/link';

export default function AlertMessage({message, color, link, linkMessage}) {
    return (
        <div className="text-center mt-10">
            <Alert color={color}>
            <span className='text-center'>
                <p>
                {message}  <span className="font-medium"><Link href={link}>{linkMessage}</Link></span>
                </p>
            </span>
            </Alert>
        </div>
    )
}


