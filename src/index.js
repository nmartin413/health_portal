import 'reset-css/reset.css'
import './index.css'

import App                            from './components/App'
import React                          from 'react'
import thunk                          from 'redux-thunk'
import ReactDOM                       from 'react-dom'
import rootReducer                    from './reducers/root'
import {Provider}                     from 'react-redux'
import registerServiceWorker          from './registerServiceWorker'
import {createStore, applyMiddleware} from 'redux'

const devToolExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = createStore(
  rootReducer,
  devToolExtension,
  applyMiddleware(thunk)
)

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),

  document.getElementById('root')
)

registerServiceWorker()
