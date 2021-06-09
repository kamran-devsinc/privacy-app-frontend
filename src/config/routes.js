import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SignIn from 'containers/auth/signin'
import SignUp from 'containers/auth/signup'
import Home from 'containers/home'
import request from 'api/request'
import { setCurrentUser } from 'redux/actions/users'

const PrivateRoute = ({ component: Component, ...restProps }) => {
    const isAuthenticated = useSelector(({ user }) => user.isAuthenticated)

    if (!isAuthenticated) return <Redirect to='/sign-in' />

    return <Route {...restProps}>{(routeProps) => <Component {...routeProps} />}</Route>;
}

const PublicRoute = ({ component: Component, ...restProps }) => {
    const isAuthenticated = useSelector(({ user }) => user.isAuthenticated)

    if (isAuthenticated) return <Redirect to='/' />

    return <Route {...restProps}>{(routeProps) => <Component {...routeProps} />}</Route>;
}

const PrivacyRouter = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!localStorage.getItem('AUTH_TOKEN')) return

        request('users/me', {
            method: 'GET',
        }).then(({ data }) => {
            dispatch(setCurrentUser(data.user))
        }).catch(() => {
            localStorage.removeItem('AUTH_TOKEN')
            history.push('/sign-in')
        })
    }, [])

    return (
        <Router>
            <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <PublicRoute exact path='/sign-in' component={SignIn} />
                <PublicRoute exact path='/sign-up' component={SignUp} />
                <Redirect to='/sign-in' />
            </Switch>
        </Router>
    )
}

export default PrivacyRouter