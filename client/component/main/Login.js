import React, {Component} from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignup: false,
      email: "",
      password: "",
      username:""
    };
  };

  login(e) {
    e.preventDefault();
    axios.post("/api/login", {
      email : this.state.email,
      password: this.state.password
    }).then((res) => {
      console.log("Login success: ", res);
      this.props.goto("/");
      this.props._save({loggedIn: true});
    }).catch((err)=>{
      console.error("Error: Login failed: ", err);
      this.setState({
        email: "",
        password: ""
      });
      alert(err.data.message);
    });
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

  componentWillMount() {
    this.props.checkIfLogined();
  };

  render() {
    if(!this.state.isSignup){
      return (
        <div className="login-container">
          <div className="login-header">
            <h1 className="login-title">D7</h1>
            <h4 className="login-description">Do something every single day</h4>
          </div>
          <form onSubmit={this.login.bind(this)}>
            <div className="input-group">
              <input type="email" name="email" value={this.state.email} className="form-control" onChange={this.handleChange.bind(this, "email")} placeholder="email" required/>
              <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handleChange.bind(this, "password")} placeholder="password" required/>
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          {/*<p>
            <span>or login with:</span><br />
            <button type="button">Google</button>
          </p>*/}
          <div className="login-footer">
            <a onClick={this.setState.bind(this, {isSignup:true})}>Sign up for D7 &#8594;</a>
          </div>

        </div>
      );
    } else {
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
            <a onClick={this.setState.bind(this, {isSignup: false})}>&#8592;
 Back to login page</a>
          </div>
        </div>
      );
    }
  }

}

export default Login;
