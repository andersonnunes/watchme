import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import { setupMiragejs } from './setupMiragejs'

setupMiragejs()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
