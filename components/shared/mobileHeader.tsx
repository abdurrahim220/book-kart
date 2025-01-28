import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface MobileHeaderProps {
    menuItem?: React.ComponentType;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ menuItem: MenuItem }) => {
    return (
        <div className='container mx-auto flex lg:hidden items-center justify-between p-4'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <Menu className='h-6 w-6' />
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className='w-64 p-0'>
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
        </div>
    )
}

export default MobileHeader