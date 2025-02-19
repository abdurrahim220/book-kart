import WrapperContainer from '@/components/shared/WrapperContainer'
import { sellSteps } from '@/components/constant/homeContent'
import React from 'react'

const HowToSell = () => {
    return (
        <section className="py-16 lg:py-20 bg-amber-50">
            <WrapperContainer>
                <div className='text-center font-bold py-4'>
                    <h2 className='text-3xl font-bold my-4'>
                        How to Sell your old books on Bookstore
                    </h2>
                    <p className='text-gray-600 max-w-2xl mx-auto'>
                        Saving some good amount of money by buying used books is just 3 steps away form you :)
                    </p>

                </div>
                <div className="grid md:grid-cols-3 gap-8 relative my-8 lg:my-10">
                    <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4  h-0.5 border-dashed border-gray-300 -z-10"></div>
                    {
                        sellSteps.map((step, index) => (
                            <div key={index} className="relative flex flex-col items-center h-full">
                                <div className="bg-white rounded-xl p-8 shadow-xl flex-grow items-center flex flex-col">
                                    <div className="absolute top-2 left-14 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full ">
                                        {step.step}
                                    </div>
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    {step.icon}</div>
                                    <h3 className="text-xl font-semibold my-4">{step.title}</h3>
                                    <p className="text-gray-600 text-center text-sm grow">{step.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </WrapperContainer>
        </section>
    )
}

export default HowToSell