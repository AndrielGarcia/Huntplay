import React from 'react'
import { BrowserRouter, Route, Switch  } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Match from './pages/Match'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/match/:cod_partida" exact component={Match} />
            </Switch>
        </BrowserRouter>
    )
}