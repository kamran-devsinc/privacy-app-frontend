import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignIn from 'containers/auth/signin'
import SignUp from 'containers/auth/signup'
import Home from 'containers/home'


const PrivacyRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>

                <Route exact path='/sign-in' >
                    <SignIn />
                </Route>
                <Route exact path='/sign-up' >
                    <SignUp />
                </Route>
            </Switch>
        </Router>
    )
}

export default PrivacyRouter
