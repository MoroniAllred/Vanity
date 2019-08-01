import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
    render(){
        return (
            <div className="grayer">
                <div className="carouseldiv">
                    <Carousel className="carousel" infiniteLoop autoPlay swipeable={false} showThumbs={false} centerMode={false}>
                        <div className="img1"></div>
                        <div className="img2"></div>
                        <div className="img3"></div>
                        <div className="img4"></div>
                        <div className="img5"></div>
                        <div className="img6"></div>
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default DemoCarousel