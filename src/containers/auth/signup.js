import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import request from 'api/request'

const SignUp = () => {
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
                        request('register', {
                            method: 'POST',
                            body: values,
                        }).then((data) => {
                            console.log({ data })
                        }).catch((err) => {
                            toast.error('Failed to login')
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
                            <Form.Control name='name' type="text" placeholder="Enter name" onChange={handleChange} />
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
                            <Form.Control name='email' type="email" placeholder="Enter email" onChange={handleChange} />
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
                            <Form.Control name='password' type="password" placeholder="Password" onChange={handleChange} />
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
                            <Form.Control name='workExperience' placeholder="Your work experience" onChange={handleChange} as='textarea' />
                            {
                                errors.workExperience
                                    ? <Form.Text className="text-danger">
                                        { errors.workExperience }
                                    </Form.Text>
                                    : null
                            }
                        </Form.Group>
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
