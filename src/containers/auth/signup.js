import { Formik } from 'formik';
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import request from 'api/request'
import { setCurrentUser } from 'redux/actions/auth'

const SignUp = () => {
    const dispatch = useDispatch()

    return (
        <div className='d-flex justify-content-center'>
            <div className='sign-in-form'>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        workExperience: '',
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.name) {
                          errors.name = 'Required'
                        } else if (values.name.length < 2) {
                          errors.name = 'Min 2 characters required'
                        }

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required'
                        } else if (values.password.length < 8) {
                            errors.password = 'Min 8 characters required'
                        }

                        if (values.workExperience.length > 1000) {
                          errors.workExperience = 'Max 1000 characters allowed'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        request('register', {
                            method: 'POST',
                            data: values,
                        }).then(({ data }) => {
                          localStorage.setItem('AUTH_TOKEN', data.token)
                          dispatch(setCurrentUser(data.user))
                        }).catch((err) => {
                          toast.error(err.response?.data?.message ?? 'Failed to sign-up')
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
                      <Form.Group className="mb-3 text-left">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' type="text" placeholder="Enter name" value={values.name} onChange={handleChange} />
                            {
                                errors.name
                                    ? <Form.Text className="text-danger">
                                        { errors.name }
                                    </Form.Text>
                                    : null
                            }
                        </Form.Group>
                        <Form.Group className="mb-3 text-left">
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
                        <Form.Group className="mb-3 text-left">
                            <Form.Label>Work experience</Form.Label>
                            <Form.Control name='workExperience' placeholder="Your work experience" value={values.workExperience} onChange={handleChange} as='textarea' />
                            {
                                errors.workExperience
                                    ? <Form.Text className="text-danger">
                                        { errors.workExperience }
                                    </Form.Text>
                                    : null
                            }
                        </Form.Group>
                        <Link to='/sign-in'>
                            <p>Sign-in instead</p>
                        </Link>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Sign up
                        </Button>
                    </form>
                )}
                </Formik>
            </div>
        </div>
    )
}

export default SignUp
