import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import { ListItem, ListItemText } from 'material-ui/List'
import ContentCopy from 'material-ui-icons/ContentCopy'
import copy from 'copy-to-clipboard'

import store from '../store/configureStore'
import {getPass} from '../db/passdb'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

class PassItem extends Component {
  handleCopy = ()=>{
    const { website } = this.props.itemDetails
    const {username, password} = this.props
    console.log('user password',password)
    //read pass for website from db
    const password_result = getPass(website,username,password)
    console.log(password_result)
    
    //copy to clip board 
    copy(password_result)

    //trigger snackbar
    this.props.showCopySnack()
  }
  render() {
    const { website } = this.props.itemDetails
    console.log(this.props.itemDetails)
    return (
      <ListItem>
        <Tooltip id="tooltip-icon" title="Copy">
          <IconButton aria-label="Copy" onClick={this.handleCopy}>
            <ContentCopy />
          </IconButton>
        </Tooltip>
        <ListItemText primary={website} />
      </ListItem>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.user.username,
  password: state.user.password
})

export default connect(mapStateToProps)(withStyles(styles)(PassItem))
