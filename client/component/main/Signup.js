import React, {Component} from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username:""
    };
  };

  signup(e) {
    e.preventDefault();
    axios.post("/api/signup", {
      email : this.state.email,
      username : this.state.name,
      password: this.state.password,
    }).then((res) => {
      console.log("Signup & login success: ", res);
      this.props.goto("/");
      this.props._save({loggedIn: true});
    }).catch((err)=>{
      console.error("Error: Signup failed: ", err);
      this.setState({
        email: "",
        password: "",
        username: ""
      });
    });
  };

  handleChange(what, event) {
    let data = {};
    data[what] = event.target.value;
    this.setState(data);
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">D7</h1>
          <h4 className="login-description">Do something every single day</h4>
        </div>
        <form onSubmit={this.signup.bind(this)}>
          <div className="input-group">
            <input type="email" name="email" value={this.state.email} className="form-control" onChange={this.handleChange.bind(this, "email")} placeholder="email" required />
            <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handleChange.bind(this, "password")} placeholder="password" required />
            <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleChange.bind(this, "name")} placeholder="name" required />
            <div className="checkbox">
              <input type="checkbox" defaultChecked="false" /> Agree for terms of use
            </div>
            <button type="submit" className="btn btn-primary">Sign up & Login</button>
          </div>
        </form>
        <div className="login-footer">
          <a onClick={()=>this.props.goto("/login")}>&#8592;
Back to login page</a>
        </div>
      </div>
    );
  }

}

export default Signup;
