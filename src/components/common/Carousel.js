import React from 'react';
import Slider from 'react-slick';
import { Card } from 'antd';
import './Carousel.css';
const { Meta } = Card;

const carouselData = [
    {
        image: 'https://i.pinimg.com/originals/b8/b0/dc/b8b0dc35190341ec0b0ea1452cfb6344.jpg',
        title: 'New Tech SmartPhone',
        description: 'Most powerfull processor. Build in California,USA. ',
    },
    {
        image: 'https://cdn.shopify.com/app-store/listing_images/1696a1b47ada9a17b518bb0d2f1cc6e4/desktop_screenshot/CJb78az0lu8CEAE=.jpg?height=720&quality=90&width=1280',
        title: 'Dresses for all',
        description: 'Customisable Dress',
    },
    {
        image:'https://about.flipboard.com/wp-content/uploads/2023/05/Flipboard-Ads-May-2023-1.png',
        title: 'Food Utensils',
        description: 'Heavy Build',
    },
    {
        image:'https://cdn.shopify.com/app-store/listing_images/50bb43331da42651a316f787225367a6/desktop_screenshot/CPSA6MulqYADEAE=.png?height=720&width=1280',
        title: 'Cloths for All',
        description: 'All size are available',
    },
    {
        image: 'https://i.ytimg.com/vi/lqe8SKiG_Ns/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDbCKi7aDExW-2qQef6OAdcIN5aIQ',
        title: 'Exclusive Men Collection',
        description: 'Classy Look',
    },
];


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1900,
    fade: true ,
    pauseOnHover: false,

};

const CarouselComponent = () => (
    <Slider {...settings} style={{marginTop:"50px"}}>
        {carouselData.map((item, index) => (
            <div key={index} className="carousel-slide">
                <Card
                    hoverable
                    cover={
                        <img
                            alt={item.title}
                            src={item.image}
                            className="carousel-image"
                        />
                    }
                >
                    <Meta title={item.title} description={item.description} />
                </Card>
            </div>
        ))}
    </Slider>
);

export default CarouselComponent;

