import React, { Fragment } from "react";
import Skeleton from '@mui/material/Skeleton';
import styled, { css } from 'styled-components'

const ImageComponent = styled("img")`
    height:100%;
    width:100%;
    object-fit:cover;
`;
const SkeletonWrapper = styled("div")`
    height: 0;
    position: relative;
    padding-top: 100%;
`;
const SkeletonComponent = styled(Skeleton)`
    position: absolute;
    top: -50%;
    left: 0;
    width: 100%;
    height: 180%;
`;

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  handleImageLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    const imageStyle = !loaded ? { display: "none" } : {};
    return ( 
      <>
        {!loaded && <SkeletonWrapper><SkeletonComponent /></SkeletonWrapper> }
        <ImageComponent src={this.props.src} style={imageStyle} onLoad={this.handleImageLoaded.bind(this)} />
      </>
    )
  }
}

export default Image
