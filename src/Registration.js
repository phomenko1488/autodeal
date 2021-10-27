import React, {Component} from "react";
import axios from "axios";
import styled from "styled-components";
import Background from "./Background";
import CentredDiv from "./CentredDiv";
import {Alert, Button, Input, Result} from "antd";
import 'antd/dist/antd.css';
import Password from "antd/lib/input/Password";
import {CheckCircleFilled, QuestionCircleOutlined, SyncOutlined, UserOutlined} from '@ant-design/icons';
import {CloseCircleFilled} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import {Redirect} from "react-router-dom";


const Title = styled.h1`

`
const InputGroup = styled.div`

`

class Registration extends Component {
    validUsername(username) {
        return typeof username == "string" && username.length >= 5 && username.length <= 14 && new RegExp('^\\w+(\\.\\w+)?$').test(username)
    }

    validMail(mail) {
        return typeof mail == "string" && mail.length >= 5 && new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])').test(mail)
    }

    validPassword(password) {
        return typeof password == "string" && password.length >= 8 && password.length <= 20 && new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$').test(password)
    }

    usernameChangeHandler() {
        let res = false;
        let username = document.getElementById('username').value
        this.setState({username: username})
        if (this.validUsername(username)) {
            this.setState({suffix: <SyncOutlined spin/>})
            axios.get("http://localhost:8888/api/v1/users/exist", {
                params: {
                    username: username
                }
            }).then((data) => {
                this.usernameExistHandler(data.data.message)
            })
            this.setUsernameValidatingResult(true);
        } else {
            res = false;
            this.setState({
                    suffix: <CloseCircleFilled style={{color: "#d71818"}} theme="outlined"/>
                }
            )
            this.setUsernameValidatingResult(res);
        }


    }

    mailChangeHandler() {
        let email = document.getElementById('email').value
        this.setState({mail: email})
        console.log('email : ' + email)
        if (this.validMail(email))
            this.setVisible('mailError', false);
        else {
            this.setVisible('mailError', true);
        }
    }

    passChangeHandler() {
        let password = document.getElementById('password').value
        this.setState({password: password})
        if (this.validPassword(password))
            this.setPasswordValidatingResult(true);
        else {
            this.setPasswordValidatingResult(false);
        }
    }

    passRChangeHandler() {
        let password = document.getElementById('password').value
        let passwordR = document.getElementById('passwordR').value
        let equals = String(password) === String(passwordR);
        this.setState({passwordEquals: equals})
        if (equals)
            this.setPasswordRValidatingResult(true);
        else {
            this.setPasswordRValidatingResult(false);
        }
    }


    setMailValidatingResult(value) {
        this.setState({mailValid: value})
        this.setVisible('mailError', !value)
    }

    setUsernameValidatingResult(value) {
        this.setState({usernameValid: value})
        this.setVisible('usernameError', !value)
    }

    setPasswordValidatingResult(value) {
        this.setState({passwordValid: value})
        this.setVisible('passwordError', !value)
    }

    setPasswordRValidatingResult(value) {
        this.setState({passwordEquals: value})
        this.setVisible('passwordRError', !value)
    }


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameValid: false,
            mail: '',
            mailValid: false,
            password: '',
            passwordValid: '',
            usernameExist: false,
            passwordEquals: false,
            usernameExistChecking: false,
            suffix: <QuestionCircleOutlined/>,
            success: false,
            redirect: false

            // this.state.usernameExistChecking ?
            // <SyncOutlined spin/> :
            // (this.state.usernameValid && !this.state.usernameExist) ?
            //     <CheckCircleFilled style={{color: '#32c422'}} theme="outlined"/> :
            //     <CloseCircleFilled style={{color: '#d71818'}} theme="outlined"/>
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.usernameExistCheckingHandler = this.usernameExistCheckingHandler.bind(this)
        this.passRChangeHandler = this.passRChangeHandler.bind(this)
        this.passChangeHandler = this.passChangeHandler.bind(this)
        this.mailChangeHandler = this.mailChangeHandler.bind(this)
        this.usernameExistHandler = this.usernameExistHandler.bind(this)
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.setPasswordRValidatingResult = this.setPasswordRValidatingResult.bind(this)
        this.setPasswordValidatingResult = this.setPasswordValidatingResult.bind(this)
        this.setMailValidatingResult = this.setMailValidatingResult.bind(this)
        this.setUsernameValidatingResult = this.setUsernameValidatingResult.bind(this)
        this.onLoginClick = this.onLoginClick.bind(this)

    }

    usernameExistCheckingHandler(value) {
        console.log('setting checking : ' + value)
        this.setState({usernameExistChecking: value})
        this.setState({
            suffix: value ? <CheckCircleFilled style={{color: '#32c422'}} theme="outlined"/> :
                <CloseCircleFilled style={{color: '#d71818'}} theme="outlined"/>
        })
    }

    usernameExistHandler(value) {
        console.log('setting exist : ' + value)
        this.setState({usernameExist: value})
        this.setState({
            suffix: value === 'true' ? <CloseCircleFilled style={{color: '#d71818'}} theme="outlined"/> :
                <CheckCircleFilled style={{color: '#32c422'}} theme="outlined"/>
        })
    }

    render() {
        return <Background>
            <CentredDiv>
                {this.state.redirect === true ? <Redirect to="/login"/> :
                    this.state.success === true ?
                        <Result
                            status="success"
                            title="Successfully Registration"
                            subTitle="Your account successfully created. Еo start using your account, you need to confirm it, the link has been sent to your email."
                            extra={[
                                <Button onClick={this.onLoginClick} type="primary" key="login">
                                    Login
                                </Button>
                            ]}
                        /> :
                        <Content>
                            <Title> Registration </Title>
                            <InputGroup>
                                <h3>Your username</h3>
                                <Input
                                    placeholder="Enter your username"
                                    id={"username"}
                                    onChange={this.usernameChangeHandler}
                                    prefix={<UserOutlined className="site-form-item-icon"/>}
                                    suffix={this.state.suffix}
                                />
                                <Alert
                                    message="Username must be :"
                                    description="Length : 5 <= length <= 14.
                            Can contains : letters, numbers, dots."
                                    type="info"
                                />
                                <Alert
                                    className="usernameError "
                                    message="Username error."
                                    type="error"
                                />
                            </InputGroup>
                            <InputGroup>
                                <h3>Your email</h3>
                                <Input id={"email"} type={"email"} onChange={this.mailChangeHandler}
                                       placeholder={'example@example.com'}/>
                                <Alert
                                    className={"mailError "}
                                    message="Email error"
                                    type="error"
                                />
                            </InputGroup>
                            <InputGroup>
                                <h3>Your password</h3>
                                <Password id={"password"} type={"password"} onChange={this.passChangeHandler}
                                          placeholder={'example12'}/>

                                <Alert
                                    message="Password must be : "
                                    description="Length : 8 <= length <=20. Must contains : 1 uppercase letter, 1 lowercase letter, and 1 number"
                                    type="info"
                                />
                                <Alert
                                    className={"passwordError "}
                                    message="Password error"
                                    type="error"
                                />
                            </InputGroup>
                            <InputGroup>
                                <h3>Repeat password</h3>
                                <Password id={"passwordR"} type={"password"} onChange={this.passRChangeHandler}
                                          placeholder={'example12'}/>

                                <Alert
                                    className={"passwordRError "}
                                    message="Passwords don't equals."
                                    type="error"
                                />
                            </InputGroup>
                            <Button onClick={this.handleRegister} type={'primary'}>Create account</Button>
                        </Content>
                }
            </CentredDiv>
        </Background>;
    }

    handleRegister() {
        return axios.post('http://localhost:8888/api/v1/auth/signup', {
            username: this.state.username,
            mail: this.state.mail,
            password: this.state.password
        }).then((res) => {
            if (res.status === 201)
                this.setState({success: true})
        })
    }

    setVisible(id, visible) {
        if (id === 'usernameError')
            id = 'ant-alert ant-alert-error ant-alert-no-icon usernameError '
        if (id === 'mailError')
            id = 'ant-alert ant-alert-error ant-alert-no-icon mailError '
        if (id === 'passwordError')
            id = 'ant-alert ant-alert-error ant-alert-no-icon passwordError '
        if (id === 'passwordRError')
            id = 'ant-alert ant-alert-error ant-alert-no-icon passwordRError '
        if (visible)
            document.getElementsByClassName(id)[0].hidden === true ?
                document.getElementsByClassName(id)[0].hidden = false : console.log('bebra')
        else
            document.getElementsByClassName(id)[0].hidden = true

    }

    onLoginClick() {
        this.setState({redirect: true}
        )
    }
}

export default Registration