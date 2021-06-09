import { Formik } from 'formik';
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import request from 'api/request'
import { setCurrentUser } from 'redux/actions/users'

const SignIn = () => {
    const dispatch = useDispatch()

    return (
        <div className='d-flex justify-content-center'>
            <div className='sign-in-form'>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required'
                        } else if (values.password.length < 8) {
                            errors.password = 'Minimun 8 characters required'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        request('login', {
                            method: 'POST',
                            data: values,
                        }).then(({data}) => {
                            localStorage.setItem('AUTH_TOKEN', data.token)
                            dispatch(setCurrentUser(data.user))
                        }).catch((err) => {
                            toast.error(err.response?.data?.message ?? 'Failed to sign-in')
                        }).finally(() => setSubmitting(false))
                    }}
                >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 text-left" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name='email' type="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
                            {
                                errors.email
                                    ? <Form.Text className="text-danger">
                                        { errors.email }
                                    </Form.Text>
                                    : null
                            }
                        </Form.Group>

                        <Form.Group className="mb-3 text-left" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name='password' type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                            {
                                errors.password
                                    ? <Form.Text className="text-danger">
                                        { errors.password }
                                    </Form.Text>
                                    : null
                            }
                        </Form.Group>
                        <Link to='/sign-up'>
                            <p>Sign-up instead</p>
                        </Link>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Sign in
                        </Button>
                    </form>
                )}
                </Formik>
            </div>
        </div>
    )
}

export default SignIn
