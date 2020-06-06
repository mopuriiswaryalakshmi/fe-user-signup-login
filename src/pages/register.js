import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Loader
} from "semantic-ui-react";

// import api from "../config/api";
// import keys from "../config/credentials";

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

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    // client side validation
    axios
      .post("http://localhost:9000/api/v1/signup", formData)

      .then(response => {
        this.props.history.push("/login");
        console.log("response.data------------------->");
        console.log(response.data);
      })
      .catch(err => {
        // debugger;
        console.log("err in catch ------------>");
        console.log(JSON.stringify(err));
        this.setState({
          hasServerError: true,
          serverErrorMessages: err.response.data.error.message
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
    // const { error } = this.state.serverErrorMessages;
    console.log(this.state.serverErrorMessages);
    // return Object.keys(error).map(key => {
    //   console.log(key);
    //   return (
    //     <li key={key}>
    //       {" "}
    //       <strong> {key} : </strong> {error[key].join(", ")}{" "}
    //     </li>
    //   );
    return <p>{this.state.serverErrorMessages}</p>;
    // });
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
            </Link>

            <Header as="h1" color="teal" textAlign="center">
              Create Account
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
              {/* <div className="form-group"> */}
              {/* <label>
                  Name */}
              <Segment stacked>
                <Form.Input
                  placeholder="Name"
                  type="text"
                  value={this.state.name}
                  name="name"
                  onChange={this.handleChange}
                  // className="form-control"
                />
                {/* </label> */}
                {/* </div> */}
                {/* <div className="form-group"> */}
                {/* <label> */}
                <Form.Input
                  placeholder="Email"
                  type="text"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleChange}
                  className="form-control"
                />
                {/* </label> */}
                {/* </div> */}
                {/* <div className="form-group"> */}
                {/* <label> */}
                {/* Password */}
                <Form.Input
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                  className="form-control"
                />
                {/* </label> */}
                {/* </div> */}
                {/* <div className="form-group"> */}
                {/* <label> */}
                {/* Confirm Password */}
                <Form.Input
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  name="confirmPassword"
                  onChange={this.handleChange}
                  className="form-control"
                />
                {/* </label> */}
                {/* </div> */}
                <Button
                  type="submit"
                  value="signup"
                  className="btn btn-primary"
                >
                  Signup
                </Button>
              </Segment>
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
