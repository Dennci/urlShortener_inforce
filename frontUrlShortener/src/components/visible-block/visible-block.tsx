import React from 'react';
export interface VisibleBlockProps{
    isVisible?: boolean
    children?: React.ReactNode
}

const VisibleBlock = (props: VisibleBlockProps) => {
    const {isVisible , children} = props

    if (!isVisible) return null;

    return (
        <>
            {children}
        </>
    );
};

export default VisibleBlock;