'use client'

import { Button } from '@/components/ui/button'
import { bannerImages } from '@/components/constant/homeContent'
import { NotebookIcon, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className='relative h-[600px] overflow-hidden'>
      {
        bannerImages.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${currentImage === index ? 'opacity-100' : "opacity-0"}`} >
            <Image
              src={image}
              fill
              objectFit='cover'
              priority={index === 0}
              objectPosition='center'
              alt='banner' />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl font-bold md:text-6xl mb-8">
          Buy and sell old books online in Bangladesh
        </h1>

        <div className="flex flex-col sm:flex-row gap-6">
          <Button
            size={'lg'}
            className='group bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-8 rounded-xl'>

            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                <ShoppingBag className='h-6 w-6' />
              </div>
              <Link href="/books">

                <div className="text-left">
                  <div className="text-sm opacity-90">
                    Start Shopping
                  </div>
                  <div className="text-lg font-semibold">
                    Buy Used Books                </div>
                </div> </Link>
            </div>
          </Button>
          <Button
            size={'lg'}
            className='group bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-700 hover:to-yellow-900 text-white px-8 py-8 rounded-xl'>

            <div className="flex items-center gap-3">
              <div className="bg-black/20 p-2 rounded-lg group-hover:bg-black/30 transition-colors">
                <NotebookIcon className='h-6 w-6' />
              </div>
              <Link href="/sell-books">

                <div className="text-left">
                  <div className="text-sm opacity-90">
                    Start Selling
                  </div>
                  <div className="text-lg font-semibold">
                    Sell Used Books
                  </div>
                </div> </Link>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Banner