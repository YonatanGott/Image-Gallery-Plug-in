/* npm package dependencies to install :
    yarn add @material-ui/core
    yarn add @material-ui/icons
    yarn add @material-ui/lab
    yarn add react-material-ui-carousel
*/
import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    TextField,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Paper,
    Modal,
    LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import SlideshowIcon from "@material-ui/icons/Slideshow";
import DeleteIcon from "@material-ui/icons/Delete";
import Carousel from "react-material-ui-carousel";

// Component Styling
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: "1.5rem",
    },
    formControl: {
        width: "100%",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(245, 245, 245, 0.8)",
    },
    gallery: {
        marginTop: "1.5rem",
    },
    title: {
        height: "60px",
        fontSize: "1.2rem",
    },
    error: {
        backgroundColor: "FireBrick",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        fontSize: "1.5rem",
        padding: "1rem",
    },
    searchButton: {
        marginLeft: "1rem",
        padding: "0.5rem",
    },
    formSearch: {
        display: "flex",
        justifyContent: "center",
    },
    slidesButton: {
        padding: "0.5rem",
        display: "flex",
        justifyContent: "center",
    },
});
// Main Component
/*
    Component Props :
    feed = string - path to the JSON file
    search = boolean - show search option
    pagination = boolean - show pagination option
    results = number - item per page
    sorting = boolean - show sorting option
    interval = number - number of seconds for each slide
*/
const MyGallery = (props) => {
    const classes = useStyles();
    const [imagesArray, setImagesArray] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [currentArray, setCurrentArray] = useState([]);
    const [sort, setSort] = useState("");
    const [intResults] = useState(props.results || 10);
    const [pageItems, setPageItems] = useState(10);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageArray, setPageArray] = useState([]);
    const [openSlides, setOpenSlides] = useState(false);
    const [pageNums, setPageNums] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSearch, setShowSearch] = useState(true);
    const [showSort, setShowSort] = useState(true);
    const [showPagination, setShowPagination] = useState(true);
    const [blackList, setBlackList] = useState([]);
    const [autoPlay, setAutoPlay] = useState(true);
    const [interval] = useState(props.interval * 1000);
    const [imageIndex, setImageIndex] = useState(0);
    // Shows Carousel indicators
    const [indicators] = useState(false);

    // On Rendering
    useEffect(() => {
        const fetchFeed = async () => {
            try {
                setLoading(true);
                const res = await fetch(props.feed, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
                const images = await res.json();
                if (images) {
                    // Get Items from localStorage and remove them from images array
                    let deletedItems = localStorage.getItem("BlackList");
                    let blackArray = JSON.parse(deletedItems);
                    if (blackArray) {
                        setBlackList(blackArray);
                        for (let i = 0; i < images.length; i++) {
                            if (blackArray.indexOf(images[i].url) !== -1) {
                                images.splice(i, 1);
                            }
                        }
                    }
                    let intArray = images.slice(0, intResults);
                    setPageArray(intArray);
                    pageNumbers(images, intResults);
                    setImagesArray(images);
                    setCurrentArray(images);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setError("No Images To Display");
            }
        };
        fetchFeed();
        if (props.search === false) {
            setShowSearch(false);
        }
        if (props.sorting === false) {
            setShowSort(false);
        }
        if (props.pagination === false) {
            setShowPagination(false);
        }
    }, [props.feed, intResults, props.search, props.sorting, props.pagination]);

    // Pagination
    const handleChangePage = (event, value) => {
        setLoading(true);
        setCurrentPage(value);
        const indexOfLastImage = value * pageItems;
        const indexOfFirstImage = indexOfLastImage - pageItems;
        let imgArray = currentArray.slice(indexOfFirstImage, indexOfLastImage);
        setPageArray(imgArray);
        setLoading(false);
    };
    // Repeat Functions
    const pageNumbers = (array, items) => {
        let pages = Math.ceil(array.length / items);
        setPageNums(pages);
        setCurrentPage(1);
    };

    //  # Functional Components 

    // Search Page
    const handleChangeSearch = (e) => {
        let replace = e.target.value;
        let typeReg = new RegExp(replace, "i");
        setSearchInput(typeReg);
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let imgArray = imagesArray.filter(
            (image) => image.title.search(searchInput) !== -1
        );
        setCurrentArray(imgArray);
        let searchArray = imgArray.slice(0, pageItems);
        setPageArray(searchArray);
        pageNumbers(imgArray, pageItems);
        setLoading(false);
    };
    // Sort Images
    const handleChangeSort = (e) => {
        setLoading(true);
        setSort(e.target.value);
        if (e.target.value === "title") {
            let sortArray = currentArray.sort((a, b) =>
                a.title > b.title ? 1 : b.title > a.title ? -1 : 0
            );
            setCurrentArray(sortArray);
            let imgArray = currentArray.slice(0, pageItems);
            setPageArray(imgArray);
            setCurrentPage(1);
        } else if (e.target.value === "date") {
            let sortArray = currentArray.sort((a, b) =>
                a.date > b.date ? 1 : b.date > a.date ? -1 : 0
            );
            setCurrentArray(sortArray);
            let imgArray = currentArray.slice(0, pageItems);
            setPageArray(imgArray);
            setCurrentPage(1);
        }
        setLoading(false);
    };
    const SortImages = () => {
        return (
            <Grid item xs={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="select-sort"
                        value={sort}
                        onChange={handleChangeSort}
                        label="Sort by"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"date"}>Date</MenuItem>
                        <MenuItem value={"title"}>Title</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        )
    }
    // Items per Page
    const handleChangePageItems = (e) => {
        setLoading(true);
        let imgArray = currentArray.slice(0, e.target.value);
        setPageArray(imgArray);
        setPageItems(e.target.value);
        pageNumbers(currentArray, e.target.value);
        setLoading(false);
    };
    const PageItems = () => {
        return (
            <Grid item xs={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="items-label">Images per page</InputLabel>
                    <Select
                        labelId="items-label"
                        id="select-items"
                        value={pageItems}
                        onChange={handleChangePageItems}
                        label="Images per page"
                    >
                        <MenuItem value={5}>Five</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={15}>Fifteen</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        )
    }
    // SlideShow
    const handleOpenSlides = () => {
        setOpenSlides(true);
    };
    const SlideShow = () => {
        return (
            <Modal open={openSlides} onClose={handleClose} className={classes.modal}>
                <GalleryCarousel
                    imageArray={currentArray}
                />
            </Modal>
        );
    }
    // Modal
    const handleOpen = (e) => {
        let imageUrl = e.target.src;
        for (let i = 0; i < currentArray.length; i++) {
            if (imageUrl === currentArray[i].url) {
                let index = i;
                setImageIndex(index);
            }
        }
        setOpenSlides(true)
        setAutoPlay(false);
    };
    const handleClose = () => {
        setOpenSlides(false);
        setImageIndex(0);
    };
    const GalleryImage = (props) => {
        return (
            <Container className={classes.galleryImage}>
                <CardMedia
                    component="img"
                    alt="No Image Found"
                    image={props.image.url}
                    title={props.image.date}
                    // Should be changed to a local img file src
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://img.icons8.com/pastel-glyph/2x/error--v1.png";
                    }}
                />
                <Typography variant="h5" component="h2">
                    {props.image.title}
                </Typography>
            </Container>
        );
    };
    // Carousel
    const GalleryCarousel = (props) => {
        return (
            <Carousel
                className={classes.carousel}
                autoPlay={autoPlay}
                indicators={indicators}
                index={imageIndex}
                interval={interval}
            >
                {props.imageArray.map((image, index) => {
                    return <GalleryImage key={index} image={image} />;
                })}
            </Carousel>
        );
    };
    // Image Card
    const GalleryCard = (props) => {
        return (
            <Grid item xs={12} sm={3}>
                <Card className={classes.card}>
                    <CardActionArea onClick={handleOpen}>
                        {
                            <CardMedia
                                component="img"
                                alt={props.image.title}
                                image={props.image.url}
                                title={props.image.date}
                                height="240"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://img.icons8.com/pastel-glyph/2x/error--v1.png";
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
                            onClick={handleDelete}
                            value={props.image.url}
                        >
                            <DeleteIcon />
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    };
    const handleDelete = (e) => {
        let url = e.currentTarget.value;
        blackList.push(url);
        localStorage.setItem("BlackList", JSON.stringify(blackList));
        for (let i = 0; i < currentArray.length; i++) {
            if (url === currentArray[i].url) {
                let index = i;
                let pageIndex = i - (currentPage - 1) * pageItems;
                currentArray.splice(index, 1);
                let indexOfFirstImage = index - pageIndex;
                let indexOfLastImage = indexOfFirstImage + pageItems;
                let imgArray = currentArray.slice(indexOfFirstImage, indexOfLastImage);
                setPageArray(imgArray);
            }
        }
    };

    return (
        <Container className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    {showSearch && (
                        <Grid item xs>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                                onSubmit={handleSearchSubmit}
                            >
                                <form onSubmit={handleSearchSubmit} className={classes.formSearch}>
                                    <TextField
                                        id="search-input"
                                        label="Search by Title"
                                        variant="outlined"
                                        onChange={handleChangeSearch}
                                    />
                                    <Button className={classes.searchButton} variant="outlined" type="submit">
                                        Search
                                    </Button>
                                </form>
                            </FormControl>
                        </Grid>
                    )}
                    {showSort && (
                        <SortImages />
                    )}
                    <PageItems />
                    <Grid item xs={2}>
                        <Button size="large" color="primary" onClick={handleOpenSlides} variant="outlined" className={classes.slidesButton} >
                            <SlideshowIcon />
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.gallery}
                >
                    {error ? (
                        <Paper className={classes.error}>{error}</Paper>
                    ) : loading ? (
                        <LinearProgress className={classes.loader} />
                    ) : (
                                pageArray.map((image, index) => {
                                    return <GalleryCard key={index} index={index} image={image} />;
                                })
                            )}
                </Grid>
                {showPagination && (
                    <Grid item xs>
                        <Pagination
                            count={pageNums}
                            page={currentPage}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChangePage}
                        />
                    </Grid>
                )}
            </Grid>
            <SlideShow />
        </Container>
    );
};

export default MyGallery;
