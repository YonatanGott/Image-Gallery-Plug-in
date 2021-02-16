import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import noImage from './noImage.png';
import Carousel from 'react-bootstrap/Carousel';
// Component Styling
const useStyles = makeStyles({
    carouselTitle: {

    },
});

const GalleryCarousel = (props) => {
    const classes = useStyles();
    return (
        <Carousel
            className={classes.carousel}
            indicators={props.indicators}
            activeIndex={props.index}
            interval={props.interval}
        >
            {props.imageArray.map((image, index) => {

                return (
                    <Carousel.Item key={index} image={image} >
                        <img
                            className="d-block w-100"
                            src={image.url}
                            alt="No Image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = noImage;
                            }}
                        />
                        <Carousel.Caption>
                            <h3 className={classes.carouselTitle}>{image.title}</h3>
                            <p className={classes.carouselDate}>{image.date}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};
export default GalleryCarousel;

