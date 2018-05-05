import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import IconButton from 'material-ui/IconButton'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import { verifyLogin, createUser } from '../db/users'
import { doLogin } from '../actions/user'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  textField: {
    width: '100%'
  }
})

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    error: false,
    showPassword: false
  }

  handleSubmit = e => {
    this.handleLogin()
    e.preventDefault()
  }

  handleLogin = () => {
    console.log('hello login')
    // let result = db.get('users').find({'username':this.state.username}).value()
    const login_result = verifyLogin(this.state.username, this.state.password)
    if (login_result) {
      this.props.doLogin(this.state.username, this.state.password)
      this.setState({ error: !login_result })
    } else {
      this.setState({
        error: true
      })
    }
    console.log(login_result)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  handleMouseDownPassword = event => {
    event.preventDefault()
  }
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  handleCreateUser = () => {
    const { username , password } = this.state
    //call create user db
    const createResult = createUser(username,password)

    //if createUser fail
    if(!createResult){
      // show error
      this.setState({error:true})
    }
    //else
    else{
      //clear error
      this.setState({
        username: '',
        password: '',
        error: false,
        showPassword: false
      })
      //show snack bar
      console.log('user created')

    }

  }

  render() {
    const { classes } = this.props
    const { username, password, error } = this.state

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={12}>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={24} justify="center">
                <Grid item xs={6}>
                  <TextField
                    error={error}
                    id="name"
                    label="Username"
                    value={username}
                    onChange={this.handleChange('username')}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.textField}>
                    <InputLabel htmlFor="adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="adornment-password"
                      error={error}
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {/* <TextField
                    error={error}
                    id="pass"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={this.handleChange('password')}
                    className={classes.textField}
                  /> */}
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item>
                  <Button
                    variant="raised"
                    color="primary"
                    className={classes.button}
                    type="submit"
                    value="submit"
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.handleCreateUser}
                  >
                    Create User
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  doLogin: (username, password) => dispatch(doLogin(username, password))
})

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  doLogin: PropTypes.func
}

export default connect(undefined, mapDispatchToProps)(
  withStyles(styles)(LoginForm)
)
