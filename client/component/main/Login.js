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
          <h1>D7</h1>
          <h4>Do something every single day</h4>
          <form onSubmit={this.login.bind(this)}>
            <div className="inputGroup">
              <input type="email" name="email" value={this.state.email} className="form-control" onChange={this.handleChange.bind(this, "email")} placeholder="email" style={{height: "44px"}} required/>
              <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handleChange.bind(this, "password")} placeholder="password" style={{height: "44px"}} required/>
            </div>
            <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
          </form>
          {/*<p>
            <span>or login with:</span><br />
            <button type="button">Google</button>
          </p>*/}
          <div className="gotoSignup text-center">
            <a onClick={this.setState.bind(this, {isSignup:true})}>Sign up for D7</a>
          </div>

        </div>
      );
    } else {
      return (
        <div className="login-container">
          <h1 className="form-signin-heading">D7</h1>
          <h4>Do something every single day</h4>
          <form className="form-signin" onSubmit={this.signup.bind(this)}>
            <input type="email" name="email" value={this.state.email} className="form-control" onChange={this.handleChange.bind(this, "email")} placeholder="email" style={{height: "44px"}} required/>
            <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handleChange.bind(this, "password")} placeholder="password" style={{height: "44px"}} required/>
            <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleChange.bind(this, "name")} placeholder="name" style={{height: "44px"}} required/>
            {/**/}
            <div className="checkbox">
              <label><input type="checkbox" defaultChecked="true" />Agree for terms of use</label>
            </div>
            <button type="submit" className="btn btn-lg btn-primary btn-block">Sign up & Login</button>
          </form>
        </div>
      );
    }
  }

}

export default Login;
