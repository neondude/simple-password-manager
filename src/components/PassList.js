import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from 'material-ui/List'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'
import CloseIcon from '@material-ui/icons/Close'

import { getPassList } from '../db/passdb'
import PassItem from './PassItem'
import AddPassForm from './AddPassForm'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
})

class PassList extends Component {
  state = {
    passList: [],
    snackOpen: false
  }
  componentWillMount() {
    console.log()
    this.setState({ passList: getPassList(this.props.username) })
  }

  handleUpdatePassList = () => {
    console.log('handle update pass list')
    console.log({ passList: getPassList(this.props.username) })
    this.setState({ passList: getPassList(this.props.username) })
  }

  handleSnackOpen = () => {
    this.setState({ snackOpen: true })
  }

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ snackOpen: false })
  }

  render() {
    const { classes, username } = this.props
    const { passList } = this.state
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.snackOpen}
          autoHideDuration={2000}
          onClose={this.handleSnackClose}
          SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">Password Copied to Clipboard</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleSnackClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
        <AddPassForm updatePassList={this.handleUpdatePassList} />
        <List subheader={<ListSubheader>Your Passwords</ListSubheader>}>
          {passList.map(passItem => (
            <PassItem
              key={passItem.website}
              itemDetails={passItem}
              showCopySnack={this.handleSnackOpen}
            />
          ))}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.user.username
})

export default connect(mapStateToProps)(withStyles(styles)(PassList))
