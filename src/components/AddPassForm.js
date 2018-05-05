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

import { checkExists, addPass } from '../db/passdb'
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

class AddPassForm extends React.Component {
  state = {
    website: '',
    password: '',
    error: false,
    showPassword: false
  }

  handleSubmit = e => {
    this.handleAddPass()
    e.preventDefault()
  }

  handleAddPass = () => {
    const { website, password } = this.state
    const { username, user_password } = this.props
    console.log('handle add pass')
    if(checkExists(website,username)){
      this.setState({error:true})
    }else{
      //add to db
      //clear form and error
      //call update list 
      addPass(username, website, password, user_password )
      this.setState({
        website: '',
        password: '',
        error: false,
        showPassword: false
      })
      this.props.updatePassList()
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  handleMouseDownPassword = event => {
    event.preventDefault();
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    const { classes } = this.props
    const { website, password, error } = this.state

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
                    label="Website"
                    value={website}
                    onChange={this.handleChange('website')}
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
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item>
                  <Button
                    color="primary"
                    className={classes.button}
                    type="submit"
                    value="submit"
                  >
                    Add Password
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

const mapStateToProps = (state, props) => ({
  username: state.user.username,
  user_password: state.user.password
})

const mapDispatchToProps = dispatch => ({
  doLogin: (username, password) => dispatch(doLogin(username, password))
})

AddPassForm.propTypes = {
  classes: PropTypes.object.isRequired,
  doLogin: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddPassForm))
