import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'

// import AuthTabs from './AuthTabs'
import LoginForm from './LoginForm'
import PassList from './PassList'

const styles = {
  root: {
    flexGrow: 1
  }
}

class App extends React.Component {

  render() {
    const { classes, logged_in } = this.props
    return (
      <div className={classes.root}>
        <AppBar  position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Password Manager
            </Typography>
          </Toolbar>
        </AppBar>
        {!logged_in && <LoginForm/>}
        {logged_in && <PassList />}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  logged_in: state.user.logged_in
})

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(App))
