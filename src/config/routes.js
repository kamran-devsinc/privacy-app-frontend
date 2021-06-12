import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SignIn from 'containers/auth/signin'
import SignUp from 'containers/auth/signup'
import Home from 'containers/home'
import request from 'api/request'
import { setCurrentUser } from 'redux/actions/auth'
import UserProfile from 'containers/UserProfile'
import {
    Row,
    Col,
    Navbar,
    Nav,
    NavDropdown,
} from 'react-bootstrap';

const PrivateRoute = ({ component: Component, ...restProps }) => {
    const currentUser = useSelector(({ auth }) => auth)

    if (!currentUser.isAuthenticated) return <Redirect to='/sign-in' />

    const onLogoutClick = () => {
        localStorage.removeItem('AUTH_TOKEN')
        window.location.href = '/sign-in'
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="d-flex">
                <Navbar.Brand href="/home">Privacy App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Nav className="mr-0">
                        <NavDropdown alignRight title={`${currentUser.name}`} id="basic-nav-dropdown">
                        <NavDropdown.Item onSelect={ onLogoutClick }> Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Route {...restProps}>{(routeProps) => <Component {...routeProps} />}</Route>;
        </>
    )
}

const PublicRoute = ({ component: Component, ...restProps }) => {
    const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated)

    if (isAuthenticated) return <Redirect to='/' />

    return <Route {...restProps}>{(routeProps) => <Component {...routeProps} />}</Route>;
}

const PrivacyRouter = () => {
    const [isPending, setIsPending] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!localStorage.getItem('AUTH_TOKEN')) return
        setIsPending(true)
        request('users/me', {
            method: 'GET',
        }).then(({ data }) => {
            dispatch(setCurrentUser(data.user))
        }).catch(() => {
            localStorage.removeItem('AUTH_TOKEN')
            history.push('/sign-in')
        }).finally( () => setIsPending(false))
    }, [])

    if(isPending){
        return null
    }
    return (

        <Router>
            <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/users/:id' component={UserProfile} />
                <PublicRoute exact path='/sign-in' component={SignIn} />
                <PublicRoute exact path='/sign-up' component={SignUp} />
                <Redirect to='/sign-in' />
            </Switch>
        </Router>
    )
}

export default PrivacyRouter
