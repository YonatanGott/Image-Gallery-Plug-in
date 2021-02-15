import React from 'react';
import GalleryImage from './GalleryImage';
import Carousel from "react-material-ui-carousel";

import { makeStyles } from "@material-ui/core/styles";

// Component Styling
const useStyles = makeStyles({
    carousel: {
    },
});

const GalleryCarousel = (props) => {
    const classes = useStyles();
    return (
        <Carousel
            className={classes.carousel}
            autoPlay={props.autoPlay}
            indicators={props.indicators}
            index={props.index}
            interval={props.interval}
        >
            {props.imageArray.map((image, index) => {
                return <GalleryImage key={index} image={image} />;
            })}
        </Carousel>
    );
};
export default GalleryCarousel;