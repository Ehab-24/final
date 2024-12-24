import Slider from 'react-slick'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
    images: string[]
    className?: string | null
}

export default function Carousel({ images, className }: Props) {
    return (
        <Slider {...sliderSettings} className={className ?? ''}>
            {images.map(img => (
            <img key={img} src={img} alt='' className='w-full h-80' />
            ))}
        </Slider>
    )
}

const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
};
