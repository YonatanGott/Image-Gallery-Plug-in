import React from 'react';
import {
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import noImage from './noImage.png';
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
    title: {
        height: "60px",
        fontSize: "1.2rem",
    },
});

const GalleryCard = (props) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={3}>
            <Card className={classes.card}>
                <CardActionArea onClick={props.handleOpen}>
                    {
                        <CardMedia
                            component="img"
                            alt={props.image.title}
                            image={props.image.url}
                            title={props.image.date}
                            height="240"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = noImage;
                            }}
                        />
                    }
                    <CardContent>
                        <Typography
                            className={classes.title}
                            gutterBottom
                            variant="h5"
                            component="h3"
                        >
                            {props.image.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={props.handleDelete}
                        value={props.image.url}
                    >
                        <DeleteIcon />
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};
export default GalleryCard;