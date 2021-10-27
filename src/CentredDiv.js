import {Component} from "react";
import styled from "styled-components";

const CenterDiv = styled.div`
  padding: 2em;
  background-color: whitesmoke;
  border: 1px solid black;
  border-radius: 14%;
  //text-align: center;
`

class CentredDiv extends Component {

    render() {
        return <CenterDiv>{this.props.children}</CenterDiv>
    }
}

export default CentredDiv