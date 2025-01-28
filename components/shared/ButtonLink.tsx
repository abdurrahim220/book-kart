import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

interface ButtonLinkProps {
    title: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ title }) => {
    return (
        <div className="flex items-center justify-center">
            <Button
                size={'lg'}
                className='group bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-700 hover:to-yellow-900 text-white px-8 py-8 rounded-xl  '>

                <Link href="/books">

                    <div className="text-left">
                        <div className="text-sm">
                            {title}
                        </div>
                    </div>

                </Link>

            </Button>
        </div>
    )
}

export default ButtonLink