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
const PageItems = (props) => {
    const classes = useStyles();
    return (
        <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="items-label">Images per page</InputLabel>
                <Select
                    labelId="items-label"
                    id="select-items"
                    value={props.pageItems}
                    onChange={props.handleChangePageItems}
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
};
export default PageItems;