import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image } from "semantic-ui-react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hasServerError: false,
      serverErrorMessages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("http://localhost:9000/api/v1/login", formData)
      .then(response => {
        localStorage.setItem("token", response.data.data.token);
        this.props.history.push("/settings");
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

  handleRedirect() {
    this.props.history.push("/");
  }

  errorMessageFormatter() {
    return <p>{this.state.serverErrorMessages}</p>;
  }

  render() {
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Link to="/">
              <Image src="/assets/logo.png" size="tiny" centered />
            </Link>

            <Header as="h2" color="teal" textAlign="center">
              Login
            </Header>
            <Form onSubmit={this.handleSubmit}>
              {this.state.hasServerError && (
                <div className="alert alert-danger">
                  <h4>
                    {" "}
                    Theses errors prohibitted the form from being saved:{" "}
                  </h4>
                  <ul>{this.errorMessageFormatter()}</ul>
                </div>
              )}
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
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
                className="form-control"
              />
              <Button type="submit" value="login" className="btn btn-primary">
                Login
              </Button>
              <Link to="/"> SignUp </Link>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
