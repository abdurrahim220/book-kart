import React from 'react'

const WrapperContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='container mx-auto px-4 lg:px-6'>{children}</div>
    )
}

export default WrapperContainer