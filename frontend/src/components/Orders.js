import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Title from "./Title";
import Typography from "@material-ui/core/Typography";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

function dailyEmissionCounter(numberOfCars, factor, distance) {
  return numberOfCars * 0.00001 * factor * distance;
}

export default function Orders({ count }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box textAlign="center">
        <Title>Estimated Emission (Today)</Title>
        <Typography component="p" variant="h4">
          {/* {props.count} */}
          {dailyEmissionCounter(count, 182, 1.5)} Tonne
        </Typography>
        <Title>Estimated Emission (This Week)</Title>
        <Typography component="p" variant="h4">
          {dailyEmissionCounter(count, 182, 1.5) * 7} Tonne
        </Typography>
      </Box>
    </React.Fragment>
  );
}
