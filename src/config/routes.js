import React from 'react'
import { Router, Route } from 'react-router'
import App from '../components/App'

export default (
    <Router>
        <Route path='battle/:pokemon1/:pokemon2' component={App}>
        </Route>
    </Router>
)