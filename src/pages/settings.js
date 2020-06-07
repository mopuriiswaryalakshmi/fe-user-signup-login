import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Grid, Header } from "semantic-ui-react";

import { API_URL } from "../config";

class UserDetailsUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      profilePicture: "",
      gender: "",
      maritalStatus: "",
      dateOfBirth: "",
      hasServerError: false,
      serverErrorMessages: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileChange = this.fileChange.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) this.props.history.replace("/login");
  }

  logout() {
    localStorage.clear();
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      address: this.state.address,
      profilePicture: this.state.profilePicture,
      gender: this.state.gender,
      maritalStatus: this.state.maritalStatus,
      dateOfBirth: this.state.dateOfBirth
    };

    axios({
      method: "put",
      url: `${API_URL}/users`,
      data: formData,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(response => {
        this.setState({
          hasServerError: false,
          serverErrorMessages: ""
        });
        alert("SucessFully Submitted");
      })
      .catch(err => {
        let catchError;
        if (err.response.data.error.errors) {
          catchError = err.response.data.error.errors;
        } else if (err.response.data.error.message) {
          catchError = err.response.data.error.message;
        } else {
          catchError = err.error.message;
        }
        this.setState({
          hasServerError: true,
          serverErrorMessages: catchError
        });
      });
  }

  handleChange(event) {
    // console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }

  fileChange(image) {
    let targerFile = image.target.files[0];
    this.getBase64(targerFile, result => {
      this.setState({ profilePicture: result });
    });
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
            <Header as="h1" color="teal" textAlign="center">
              Information Details
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
                placeholder="Address"
                type="text"
                value={this.state.address}
                name="address"
                onChange={this.handleChange}
                className="form-control"
              />
              <Form.Input
                type="file"
                placeholder="Profile Picture"
                name="profilePicture"
                onChange={this.fileChange}
                className="form-control"
              />
              <Form.Input
                placeholder="Gender"
                type="text"
                value={this.state.gender}
                name="gender"
                onChange={this.handleChange}
                className="form-control"
              />
              <Form.Input
                placeholder="Marital Status"
                type="text"
                value={this.state.maritalStatus}
                name="maritalStatus"
                onChange={this.handleChange}
                className="form-control"
              />
              <Form.Input
                placeholder="Date Of Birth"
                type="text"
                value={this.state.dateOfBirth}
                name="dateOfBirth"
                onChange={this.handleChange}
                className="form-control"
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link to="/" onClick={this.logout}>
                Logout
              </Link>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserDetailsUpdateForm;
