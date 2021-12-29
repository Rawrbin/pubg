import React from "react";
import theme from "./Banner.module.scss";

function Banner(props) {
  return <div className={theme.bannerContainer}>{props.test}</div>;
}

// Exporting the component
export default Banner;
