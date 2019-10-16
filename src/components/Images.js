import React from 'react'
import './Images.css'
import Image from './Image'

const Images = ({ images, onSelectionChange }) => {
    return (
        <div>
            <div>images ({images.length})</div>
            {images.map((image) => (
                <Image key={image.img} image={image} selected={false} onSelectionChange={onSelectionChange} />
        ))}
        </div>
    )
};

export default Images