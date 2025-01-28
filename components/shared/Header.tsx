"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { BookLock, ChevronRight, Contact, FileTerminal, Heart, Lock, LogOut, Package, PiggyBank, SearchIcon, ShoppingCart, User, User2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector, } from '@/lib/store/hooks/hooks'

import { toggleLoginDialog } from '@/lib/store/slice/userSlice'
import { RootState } from '@/lib/store/store'
import MobileHeader from './mobileHeader'


const Header = () => {
  const [isDropdown, setIsDropdown] = React.useState(false)

  const router = useRouter()
  const dispatch = useAppDispatch()
  const isLoginOpen = useAppSelector((state: RootState) => state.user.isLoginDialogOpen)

  const user = {
    profilePicture: '',
    name: 'John Doe',
    email: 'johndoe@gmail.com'
  }
  // const user = null
  const userPlaceholder = ""

  const handleLogin = (

  ) => {
    dispatch(toggleLoginDialog())
    setIsDropdown(false)
  }
  const handleProtectionNavigation = (href: string) => {
    return () => {
      if (user) {
        router.push(href);
        setIsDropdown(false);
      } else {
        dispatch(toggleLoginDialog());
        setIsDropdown(false);
      }
    };
  };

  const handleLogout = () => { }

  const menuItem = [
    ...(user && user) ? [
      {
        href: 'account/profile',
        content: (
          <div className="flex space-x-4 items-center p-2 border-b">
            <Avatar className='w-12 h-12 -ml-2 rounded-full'>
              {user?.profilePicture ? (
                <AvatarImage alt='user_image'></AvatarImage>
              ) :
                (<AvatarFallback>{userPlaceholder}</AvatarFallback>
                )}
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">
                {user.name}
              </span>
              <span className="text-xs text-gray-500">
                {user.email}
              </span>
            </div>

          </div>
        )
      }
    ] : [{
      icon: <Lock className='h-5 w-5' />,
      label: "Login/Signup",
      onClick: handleLogin
    }],
    {
      icon: <User className='h-5 w-5' />,
      label: "My Profile",
      onClick: handleProtectionNavigation("account/profile")
    },
    {
      icon: <Package className='h-5 w-5' />,
      label: "My Orders",
      onClick: handleProtectionNavigation("account/orders")
    },
    {
      icon: <PiggyBank className='h-5 w-5' />,
      label: "My Selling orders",
      onClick: handleProtectionNavigation("account/selling-orders")
    },
    {
      icon: <ShoppingCart className='h-5 w-5' />,
      label: "My Cart",
      onClick: handleProtectionNavigation("checkout/cart")
    },
    {
      icon: <Heart className='h-5 w-5' />,
      label: "My Wishlist",
      onClick: handleProtectionNavigation("account/wishlist")
    },

    {
      icon: <User2 className='h-5 w-5' />,
      label: "About Us",
      href: 'about-us'
    },
    {
      icon: <FileTerminal className='h-5 w-5' />,
      label: "Terms & Use",
      href: 'terms-and-use'
    },
    {
      icon: <BookLock className='h-5 w-5' />,
      label: "Privacy Policy",
      href: 'privacy-policy'
    },
    {
      icon: <Contact className='h-5 w-5' />,
      label: "Contact Us",
      href: 'contact-us'
    },
    ...(user && [{
      icon: <LogOut className='h-5 w-5' />,
      label: "Logout",
      onClick: handleLogout
    }])
  ];


  const MenuItems = ({ className = "" }) => (
    <div className={className}>
      {
        menuItem?.map((item, index) =>
          item?.href ? (
            <Link href={item.href} key={index} className='flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-gray-200'
              onClick={() => setIsDropdown(false)}
            >

              {item.icon}
              <span>{item.label}</span>
              {item?.content && <div className='mt-1'>{item.content}</div>}
            </Link>
          ) : (
            <button key={index} className='flex items-center w-full gap-3 px-4 py-3 text-sm rounded-lg hover:bg-gray-200'
              onClick={item.onClick ? item.onClick : undefined}
            >

              {item.icon}
              <span>{item.label}</span>
              <ChevronRight />
            </button>
          )
        )
      }
    </div>
  )

  return (
    <header className='border-b bg-white sticky top-0 z-50'>
      {/* desktop */}

      <div className="container w-[80%] mx-auto hidden lg:flex items-center justify-between p-4">
        <Link href='/' className='flex items-center'>
          <Image src={"/images/web-logo.png"} alt='desktop logo' width={300} height={60}
            className='h-12  w-auto'
          />
        </Link>
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
              type='text'
              placeholder='Book Name / Author / Subject'
              className='w-full pr-10'
              onChange={() => { }} />
            <Button size={'icon'}
              variant={'ghost'}
              className='absolute right-0 top-1/2 -translate-y-1/2'
            >
              <SearchIcon />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href='/used-book-sell'>
            <Button variant={"secondary"} className='bg-yellow-400 text-gray-900 hover:bg-yellow-500'>
              Sell Used Book
            </Button>

          </Link>

          {/* account dropdown-menu */}
          <DropdownMenu onOpenChange={setIsDropdown} open={isDropdown}>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <Avatar className='w-8 h-8 rounded-full'>

                  {user?.profilePicture ? (<AvatarImage alt='user_image'></AvatarImage>) : userPlaceholder ? (<AvatarFallback>
                    {userPlaceholder}
                  </AvatarFallback>) : (
                    <User className='ml-2 mt-2' />
                  )}

                </Avatar>
                My Account
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <MenuItems />
            </DropdownMenuContent>

          </DropdownMenu>
          <Link href='/checkout/cart'>
            <div className="relative">
              <Button variant={"ghost"} className='relative'>
                <ShoppingCart className='h-5 w-5 mr-2' />Cart
              </Button>
              {user && (
                <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs">3</span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* mobile */}

      <MobileHeader menuItem={MenuItems} />


    </header>
  )
}

export default Header