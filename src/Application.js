import React from 'react'
import Login from "./login";
import {BrowserRouter, Switch, Link, Redirect, Route, useLocation} from "react-router-dom";
import styled from "styled-components";
import Registration from "./Registration";

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function Ad(props) {
    console.log('it\'s AD page ')
    let id = props.id;
    if (!isNumeric(id))
        return <Redirect to="/invalidID"/>;

    return <div>Ads with id : {props.id}</div>;
}

function InvalidID() {
    console.log('it\'s invalid page ')
    return <div>
        <div>Invalid ID</div>
        <Link pathname={"/"}>Back to main page</Link>
    </div>;
}

function IndexPage() {
    console.log('it\'s index page ')
    return <div>Index page</div>;
}

const Title = styled.h1`

`



function Forgot() {
    console.log('it\'s forgot page ')
    return <div>
        <Title>Forgot pass?</Title>
        <input type="email"/>
        <div>
            <button>Restore</button>
        </div>

    </div>;
}

function Change() {
    let token = useQuery().get("token")
    console.log(token)
    return <div>
        <Title>Change password</Title>
        <input type="text"/>
        <button>Change password</button>
    </div>
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ForgotSuccess() {
    return <div>
        <Title>Success!</Title>
        <div>Link to restore password was sent to your email.</div>
        <Link pathname={"/index"}>Back to main page</Link>

    </div>;
}


class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: []
        }
    }

    render() {
        // const {user: currentUser} = this.props;
        // if (!currentUser) {
        //     return <Redirect to="/login"/>;
        // }
        return <BrowserRouter>

            <Route path={"/login"} component={Login}/>

            <Route path={"/registration"} render={({match}) => {

                return <Registration
                    token={match.params.token}
                    onUsernameChange={this.usernameChangeHandler}
                    onMailChange={this.mailChangeHandler}
                    onPassChange={this.passChangeHandler}
                />
            }
            }/>

            <Route path={"/forgot"} component={Forgot}/>

            <Route path={"/forgot/success"} component={ForgotSuccess}/>

            <Route path={"/change"} render={({match}) => (
                <Change
                    token={match.params.token}
                />
            )}/>

            <Route path="/ads/:id" render={({match}) => (
                <Ad
                    id={match.params.id}
                />
            )}/>
            <Route path={"/invalidID"} component={InvalidID}/>
            <Switch>
                <Route path={"/index"} component={IndexPage}/>
            </Switch>
        </BrowserRouter>;
    }
}

export default Application;