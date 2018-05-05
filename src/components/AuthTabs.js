import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import Divider from 'material-ui/Divider'

import LoginForm from './LoginForm'

const styles = {
  root: {
    flexGrow: 1
  }
}

class AuthTabs extends React.Component {
  state = {
    tabVal: 0
  }

  handleTabChange = (event, tabVal) => {
    this.setState({ tabVal })
  }

  render() {
    const { classes } = this.props
    const { tabVal } = this.state
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={tabVal} onChange={this.handleTabChange}>
            <Tab label="Login" />
            <Tab label="Create Account" />
          </Tabs>
        </AppBar>
        {tabVal == 0 && <LoginForm />}
        <Divider/>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  logged_in: state.user.logged_in
})

AuthTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(AuthTabs))
