/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu, SearchIcon, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '../ui/input'

interface MobileHeaderProps {
    menuItem?: React.ComponentType;
    user?: any;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ menuItem: MenuItem, user }) => {
    return (
        <div className='container mx-auto flex lg:hidden items-center justify-between p-4'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <Menu className='h-6 w-6' />
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className='w-64 md:w-96 p-0'>
                    <SheetHeader>
                        <SheetTitle className='sr-only '></SheetTitle>
                    </SheetHeader>
                    <div className="p-4 border-b">
                        <Link href='/' className='flex items-center'>
                            <Image src={"/images/web-logo.png"} alt='desktop logo' width={150} height={40}
                                className='h-10  w-auto'
                            />
                        </Link>
                    </div>
                    {MenuItem && <MenuItem />}
                </SheetContent>
            </Sheet>

            <div className="flex flex-1 items-center justify-center max-w-xl px-4">
                <div className="flex flex-1 items-center justify-center max-w-xl px-2 md:px-4">
                    <div className="relative w-full">
                        <Input
                            type='text'
                            placeholder='Search Book'
                            className='w-full pr-8'
                            onChange={() => { }} />
                        <Button size={'icon'}
                            variant={'ghost'}
                            className='absolute right-0 top-1/2 -translate-y-1/2'
                        >
                            <SearchIcon className='h-5 w-5' />
                        </Button>
                    </div>
                    <Link href='/checkout/cart'>
                        <div className="relative">
                            <Button variant={"ghost"} className='relative'>
                                <ShoppingCart className='h-5 w-5 mr-2' />
                            </Button>
                            {user && (
                                <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs">3</span>
                            )}
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default MobileHeader