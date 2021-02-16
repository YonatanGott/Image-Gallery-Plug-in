import React from 'react';
import {
    Container,
    CardMedia,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import noImage from './noImage.png';
import Carousel from 'react-bootstrap/Carousel';

// Component Styling
const useStyles = makeStyles({
    galleryImage: {
    },
});


const GalleryImage = (props) => {
    const classes = useStyles();

    return (
        <Carousel.Item>
            <Container className={classes.galleryImage}>
                <CardMedia
                    component="img"
                    alt="No Image Found"
                    image={props.image.url}
                    title={props.image.date}
                    // Should be changed to a local img file
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImage;
                    }}
                />
                <Typography variant="h5" component="h2">
                    {props.image.title}
                </Typography>
            </Container>
        </Carousel.Item>
    );
};
export default GalleryImage;