import React from 'react'
import { render } from 'react-dom'
import CssBaseline from 'material-ui/CssBaseline'
// import App from './components/App';
import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import rootReducer from './reducers'
import store from './store/configureStore'
import App from './components/App'

// const store = createStore(rootReducer)

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render(
  <div>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
)
