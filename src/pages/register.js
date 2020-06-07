import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Grid, Header, Image, Message } from "semantic-ui-react";

import { API_URL } from "../config";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      hasServerError: false,
      serverErrorMessages: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("token")) this.props.history.replace("/settings");
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    axios
      .post(`${API_URL}/signup`, formData)

      .then(response => {
        this.props.history.replace("/login");
      })
      .catch(err => {
        let catchError;
        if (err.response.data.error.errors) {
          catchError = err.response.data.error.errors;
        } else {
          catchError = err.response.data.error.message;
        }
        this.setState({
          hasServerError: true,
          serverErrorMessages: catchError
        });
      });
  }

  handleChange(event) {
    // console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  errorMessageFormatter() {
    return <p>{this.state.serverErrorMessages}</p>;
  }

  render() {
    return (
      <div className="register-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Link to="/">
              <Image src="/assets/logo.png" size="tiny" centered />
              {/*Base64 image conversion <Image
                src="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJC..."
                size="tiny"
                centered
              /> */}
            </Link>

            <Header as="h1" color="teal" textAlign="center">
              Create Account
            </Header>
            <Form onSubmit={this.handleSubmit}>
              {this.state.hasServerError && (
                <div className="alert alert-danger">
                  <h4>Theses errors prohibitted the form from being saved: </h4>
                  <ul>{this.errorMessageFormatter()}</ul>
                </div>
              )}
              <Form.Input
                placeholder="Name"
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder="Email"
                type="text"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
                className="form-control"
              />
              <Form.Input
                placeholder="Password"
                value={this.state.password}
                type="password"
                name="password"
                onChange={this.handleChange}
                className="form-control"
              />
              <Form.Input
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                type="password"
                name="confirmPassword"
                onChange={this.handleChange}
                className="form-control"
              />
              <button type="submit" value="signup" className="btn btn-primary">
                Signup
              </button>
            </Form>
            <Message>
              Already have an account? <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default RegistrationForm;
