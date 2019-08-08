import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class VCarousel extends Component {
    render(){
        return (
            <div className="carouseldiv">
                <Carousel className="carousel" infiniteLoop autoPlay swipeable={false} showStatus={false} showThumbs={false} centerMode={false}>
                    <div className="carouselImg carImg1">
                        <div className="dimmer"></div>
                    </div>
                    <div className="carouselImg carImg2">
                        <div className="dimmer"></div>
                    </div>
                    <div className="carouselImg carImg3">
                        <div className="dimmer"></div>
                    </div>
                    <div className="carouselImg carImg4">
                        <div className="dimmer"></div>
                    </div>
                    <div className="carouselImg carImg5">
                        <div className="dimmer"></div>
                    </div>
                </Carousel>
            </div>
        )
    }
}

export default VCarousel