import React from "react";
import axios from "axios";

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
  }

  // On file select (from the pop up)
  onFileChange = event => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };

  logout() {
    localStorage.clear();
    // this.props.history.push("/");
    // const token = localStorage.getItem("token");
    // console.log(token);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      name: this.state.name,
      address: this.state.address,
      profilePicture: this.state.address,
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
      <div>
        <h2> Add Ticket </h2>
        <form onSubmit={this.handleSubmit}>
          {this.state.hasServerError && (
            <div className="alert alert-danger">
              <h4> Theses errors prohibitted the form from being saved: </h4>
              <ul>{this.errorMessageFormatter()}</ul>
            </div>
          )}
          <div className="form-group">
            <label>
              Name
              <input
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Address
              <input
                type="text"
                value={this.state.address}
                name="address"
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Profile Picture
              <textarea
                value={this.state.profilePicture}
                name="profilePicture"
                onChange={this.handleChange}
                className="form-control"
              ></textarea>
            </label>
          </div>
          <div className="form-group">
            <label>
              Gender
              <textarea
                value={this.state.gender}
                name="gender"
                onChange={this.handleChange}
                className="form-control"
              ></textarea>
            </label>
          </div>
          <div className="form-group">
            <label>
              Marital Status
              <textarea
                value={this.state.maritalStatus}
                name="maritalStatus"
                onChange={this.handleChange}
                className="form-control"
              ></textarea>
            </label>
          </div>
          <div className="form-group">
            <label>
              Date Of Birth
              <textarea
                value={this.state.dateOfBirth}
                name="dateOfBirth"
                onChange={this.handleChange}
                className="form-control"
              ></textarea>
            </label>
          </div>
          <input type="submit" value="Add Signup" className="btn btn-primary" />{" "}
          or <input type="reset" value="Reset" className="btn btn-secondary" />
        </form>
      </div>
    );
  }
}

export default UserDetailsUpdateForm;
