import WrapperContainer from '@/components/shared/WrapperContainer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { blogPosts } from '@/components/constant/homeContent'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const BlogPost = () => {
    return (
        <section className='py-16 lg:py-20 bg-[rgb(221,234,254)]'>
            <WrapperContainer>
                <div>
                    <div className='flex items-center justify-center my-8 lg:my-10'>
                        <h2 className='text-center text-3xl font-bold'>Read from our <span className='text-primary'>Blog</span></h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <Card key={index} className='h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg'>
                                <CardContent
                                    className='p-0 flex flex-col h-full'
                                >

                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={post.imageSrc}
                                            alt={post.title}
                                            layout='fill'
                                            objectFit='cover'
                                            className='transition-transform duration-300 hover:scale-105'
                                        />
                                    </div>
                                    <div className='p-6 flex flex-col flex-grow'>
                                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                {post.icon}</div>
                                            <span className="flex-grow">{post.title}</span>
                                        </h3>
                                        <p className="text-gray-600 text-sm flex-grow">{post.description}</p>

                                        <Button variant={"link"} className='mt-4 p-0 flex items-center text-primary text-lg'>
                                            Read More <ArrowRight className='w-4 h-4' />
                                        </Button>

                                    </div>
                                </CardContent>

                            </Card>
                        ))}
                    </div>
                </div>
            </WrapperContainer>
        </section>
    )
}

export default BlogPost