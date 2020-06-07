import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import FileBase64 from "react-file-base64";

import { Button, Form, Grid, Header } from "semantic-ui-react";

class UserDetailsUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
    // this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    this.fileChange = this.fileChange.bind(this);
  }

  logout() {
    localStorage.clear();
    // this.props.history.push("/");
    // const token = localStorage.getItem("token");
    // console.log(token);
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
    // console.log("targerFile--------->");
    // console.log(targerFile);
    this.getBase64(targerFile, result => {
      console.log("result base64-------------");
      console.log(result);
      this.setState({ profilePicture: result });
    });
  }

  // getFiles(files) {
  //   console.log("Inside Get files-------------->");
  //   console.log(files);
  //   this.setState({ profilePicture: files.base64 });
  // }

  onFileChangeHandler = event => {
    this.setState({
      profilePicture: event.target.files[0]
    });
  };

  onFileClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.profilePicture);
    axios
      .post("http://localhost:9000/api/v1/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      name: this.state.name,
      address: this.state.address,
      profilePicture: this.state.profilePicture,
      gender: this.state.gender,
      maritalStatus: this.state.maritalStatus,
      dateOfBirth: this.state.dateOfBirth
    };
    // client side validation

    axios({
      method: "put", //you can set what request you want to be
      url: "http://localhost:9000/api/v1/users",
      data: formData,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(response => {
        console.log("SucessFully Submitted");
        console.log("response.data------------------->");
        console.log(response.data);
        alert("SucessFully Submitted");
        // localStorage.clear();
        // return <p>"SucessFully Submitted"</p>;
        // this.props.history.push("/login");
      })
      .catch(err => {
        // debugger;
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
                placeholder="Name"
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
                className="form-control"
              />
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
              {/* <FileBase64
                multiple={false}
                placeholder="Profile Picture"
                onDone={this.getFiles.bind(this)}
              /> */}
              {/* <Form.Input
                type="file"
                name="file"
                onChange={this.onFileChangeHandler}
              />
              <button
                type="button"
                class="btn btn-success btn-block"
                onClick={this.onFileClickHandler}
              >
                Upload
              </button> */}
              {/* <button onClick={this.onFileUpload}>Upload</button> */}
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
              <Button type="submit" className="btn btn-primary">
                Submit
              </Button>
              <Link to="/" onClick={this.logout}>
                {" "}
                Logout{" "}
              </Link>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserDetailsUpdateForm;
