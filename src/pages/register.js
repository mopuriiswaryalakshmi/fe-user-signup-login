import React from "react";
import axios from "axios";

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

  //   handleResponse(ticket) {
  //     this.setState(prevState => ({
  //       tickets: prevState.tickets.concat(ticket),
  //       filteredTickets: prevState.tickets.concat(ticket)
  //     }));
  //   }

  //   fetchPosts() {
  //     let token = localStorage.getItem('token');
  //     // console.log(token);
  //     http
  //       .get(`https://teacherflow-cd841.firebaseio.com/posts.json?auth=${token}`)
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   }

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

        // try {
        //   this.props.history.push("/login");
        //   console.log("response.data------------------->");
        //   console.log(response.data);
        // } catch (error) {
        //   console.log("inside catch----------.,");
        //   console.log(JSON.stringify(error), error);
        // }

        // if (response.data.errors) {
        //   this.setState({
        //     hasServerError: true,
        //     serverErrorMessages: response.data
        //   });
        // }
        // else {
        //   //   this.props.handleResponse(response.data);
        //   this.setState({
        //     name: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: "",
        //     hasServerError: false
        //   });
        // }
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
              email
              <input
                type="text"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password
              <textarea
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
                className="form-control"
              ></textarea>
            </label>
          </div>
          <div className="form-group">
            <label>
              Confirm Password
              <textarea
                value={this.state.confirmPassword}
                name="confirmPassword"
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

export default RegistrationForm;
