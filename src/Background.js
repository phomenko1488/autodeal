import React from "react";
import styled from "styled-components";
import './App.css'
const BackgroundDiv = styled.div`
  background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

class Background extends React.Component {
    render() {
        return <BackgroundDiv>{this.props.children}</BackgroundDiv>
    }
}

export default Background