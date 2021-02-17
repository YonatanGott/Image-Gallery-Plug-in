import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Container, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import noImage from "./noImage.png";

// Component Styling
const useStyles = makeStyles({
    slider: {
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "1000px",
        height: "600px",
        borderRadius: "10px",
    },
    rightArrow: {
        position: "absolute",
        top: "50%",
        right: "32px",
        fontSize: "3rem",
        color: "#000",
        zIndex: "10",
        cursor: "pointer",
        userSelect: "none",
    },
    leftArrow: {
        position: "absolute",
        top: "50%",
        left: "32px",
        fontSize: "3rem",
        color: "#000",
        zIndex: "10",
        cursor: "pointer",
        userSelect: "none",
    },
    slide: {
        opacity: "0",
        transition: {
            duration: 1,
        },
    },
    slideActive: {
        opacity: "1",
        transition: {
            duration: 1,
        },
        transform: "scale(1.08)",
    },
});

const Slider = (props) => {
    const classes = useStyles();
    const [current, setCurrent] = useState(props.index);
    const length = props.imageArray.length;

    useEffect(() => {
        if (props.autoPlay) {
            setInterval(nextSlide, props.interval);
        }
    });


    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(props.imageArray) || props.imageArray.length <= 0) {
        return null;
    }

    return (
        <Container className={classes.slider}>
            <ArrowBackIcon className={classes.leftArrow} onClick={prevSlide} />
            <ArrowForwardIcon className={classes.rightArrow} onClick={nextSlide} />
            {props.imageArray.map((image, index) => {
                return (
                    <div
                        className={index === current ? classes.slideActive : classes.slide}
                        key={index}
                    >
                        {index === current && (
                            <>
                                <CardMedia
                                    className={classes.image}
                                    component="img"
                                    alt="No Image Found"
                                    image={image.url}
                                    title={image.date}
                                    // Should be changed to a local img file
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = noImage;
                                    }}
                                />
                                <Typography variant="h5" component="h2">
                                    {image.title}
                                </Typography>
                            </>
                        )}
                    </div>
                );
            })}
        </Container>
    );
};

export default Slider;
