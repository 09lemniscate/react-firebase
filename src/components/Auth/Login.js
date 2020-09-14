import React, { useState } from "react";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";

function Login(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setErrors] = useState([])
    const [loading,setLoading] = useState(false)
    const [loadingGoogle,setLoadingGoogel] = useState(false)
    firebase.analyticsEvents('LOGIN_PAGE');
const  displayErrors = () =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

const  handleSubmit = event => {
    event.preventDefault();
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase.login(email,password)
        .then(signedInUser => {
          setLoading(false);
          props.history.push("/");
          firebase.analyticsEvents('HOME_PAGE');
        })
        .catch(err => {
          console.error(err);
          setErrors(errors.concat(err));
          setLoading(false);
        });
    }
  };
const handleGoogleSignIn = event => {
  event.preventDefault();
  setLoadingGoogel(true);
  firebase.doSignInWithGoogle().then(res => {
    setLoadingGoogel(false);
    props.history.push("/");
    firebase.analyticsEvents('HOME_PAGE');
  })
  .catch(err=>{
    console.log(err)
    setLoadingGoogel(false);

  })
}
const isFormValid = () => email && password;

 const handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="braille" color="violet" />
            Login to Enjoy
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={e => setEmail(e.target.value)}
                value={email}
                className={handleInputError(errors, "email")}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                className={handleInputError(errors, "password")}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
                fluid
                onClick={handleSubmit}
                size="large"
              >
                SignIn With email
              </Button>
              <Button icon labelPosition="left"
                disabled={loadingGoogle}
                className={loadingGoogle ? "loading" : ""}
                style={{marginTop:'1rem'}}
                color="grey"
                fluid
                onClick={handleGoogleSignIn}
                size="large"
              >
                <Icon name='google' />
                SignIn with Google
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {displayErrors()}
            </Message>
          )}
        </Grid.Column>
      </Grid>
    );
  }

export default withRouter(Login);