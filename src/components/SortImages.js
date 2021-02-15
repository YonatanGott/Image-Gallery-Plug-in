import React from 'react';
import {
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Component Styling
const useStyles = makeStyles({
    formControl: {
        width: "100%",
    },
});

const SortImages = (props) => {
    const classes = useStyles();

    return (
        <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="sort-label">Sort by</InputLabel>
                <Select
                    labelId="sort-label"
                    id="select-sort"
                    value={props.sort}
                    onChange={props.handleChangeSort}
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
};
export default SortImages;