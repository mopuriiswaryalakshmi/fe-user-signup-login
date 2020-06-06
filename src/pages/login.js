import React from "react";
import axios from "axios";

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

  //   handleResponse(ticket) {
  //     this.setState(prevState => ({
  //       tickets: prevState.tickets.concat(ticket),
  //       filteredTickets: prevState.tickets.concat(ticket)
  //     }));
  //   }

  logout() {
    // localStorage.clear();
    // this.props.history.push("/");
    const token = localStorage.getItem("token");
    console.log(token);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password
    };
    // client side validation

    axios
      .post("http://localhost:9000/api/v1/login", formData)
      // axios.defaults.headers.common['header1'] = 'value'
      .then(response => {
        console.log(response.data);
        localStorage.setItem("token", response.data.data.token);
        console.log(response.data.data.token);
        this.props.history.push("/settings");
        // this.props.history.push("");
        // axios({
        //     method: "put", //you can set what request you want to be
        //     url: "http://localhost:9000/api/v1/users",
        //     data: formData,
        //     headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        //   })
        // if (response.data.errors) {
        //   this.setState({
        //     hasServerError: true,
        //     serverErrorMessages: response.data
        //   });
        // } else {
        //   //   this.props.handleResponse(response.data);
        //   this.setState({
        //     email: "",
        //     password: "",
        //     hasServerError: false
        //   });
        // }
      })
      .catch(err => {
        // debugger;
        let catchError;
        if (err.response.data.error.errors) {
          catchError = err.response.data.error.errors;
        } else {
          catchError = err.response.data.error.message;
        }
        // debugger;
        // debugger;
        console.log("err in catch ------------>");
        console.log(JSON.stringify(err));
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
    // const { errors } = this.state.serverErrorMessages;
    // return Object.keys(errors).map(key => {
    //   return (
    //     <li key={key}>
    //       {" "}
    //       <strong> {key} : </strong> {errors[key].join(", ")}{" "}
    //     </li>
    //   );
    // });
    return <p>{this.state.serverErrorMessages}</p>;
  }

  render() {
    return (
      <div>
        <h2> Add Login </h2>
        <form onSubmit={this.handleSubmit}>
          {this.state.hasServerError && (
            <div className="alert alert-danger">
              <h4> Theses errors prohibitted the form from being saved: </h4>
              <ul>{this.errorMessageFormatter()}</ul>
            </div>
          )}
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
          <button type="submit" value="login" className="btn btn-primary">
            Login
          </button>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={this.handleRedirect}
          >
            Signup
          </button>
          <button className="btn btn-primary" onClick={this.logout}>
            LogOut
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
