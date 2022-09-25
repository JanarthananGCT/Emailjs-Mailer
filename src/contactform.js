import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { Container } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.min.css';
import "./index.css";
const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    const [disabled, setDisabled] = useState(false);

    // Function that displays a success toast on bottom right of the page when form submission is successful
    const toastifySuccess = () => {
        toast('Form sent!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'submit-feedback success',
            toastId: 'notifyToast'
        });
    };

    // Function called on submit that uses emailjs to send email of valid contact form
    const onSubmit = async (data) => {
        // Destrcture data object
        const { name, email, subject, message } = data;
        try {
            // Disable form while processing submission
            setDisabled(true);

            // Define template params
            const templateParams = {
                name,
                email,
                subject,
                message
            };

            // Use emailjs to email contact form data
            await emailjs.send(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                templateParams,
                process.env.REACT_APP_USER_ID
            );

            // Reset contact form fields after submission
            reset();
            // Display success toast
            toastifySuccess();
            // Re-enable form submission
            setDisabled(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className='ContactForm'>
            <Container>

                <div className='container bod'>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            <h1>Contact Form !</h1>
                            <div className='contactForm'>
                                <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                                    {/* Row 1 of form */}
                                    <div className='row formRow'>
                                        <div className='col-6'>

                                            <div className="row">
                                                <label>Enter your Name :</label>
                                                <input type="text" placeholder="Hospital Name" name="name" className="formin"{...register('name', {
                                                    required: {
                                                        value: true,
                                                        message: 'Please enter your name'
                                                    },
                                                    maxLength: {
                                                        value: 30,
                                                        message: 'Please use 30 characters or less'
                                                    }
                                                })} />
                                            </div>


                                            {errors.name && <span className='errorMessage'>{errors.name.message}</span>}
                                        </div>

                                        <div className='col-6'>
                                            <div className="row">
                                                <label>Enter Email Address :</label>
                                                <input type="email" placeholder="Email address" name="email" className="formin"{...register('email', {
                                                    required: true,
                                                    pattern:
                                                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                                })} />
                                            </div>


                                            {errors.email && (
                                                <span className='errorMessage'>Please enter a valid email address</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* Row 2 of form */}
                                    <div className='row formRow'>
                                        <div className='col'>
                                            <div className="row">
                                                <label>Enter Subject :</label>
                                                <input type="text" placeholder="Subject" name="subject" className="formin"{...register('subject', {
                                                    required: {
                                                        value: true,
                                                        message: 'Please enter a subject'
                                                    },
                                                    maxLength: {
                                                        value: 75,
                                                        message: 'Subject cannot exceed 75 characters'
                                                    }
                                                })} />
                                            </div>


                                            {errors.subject && (
                                                <span className='errorMessage'>{errors.subject.message}</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* Row 3 of form */}
                                    <div className='row formRow'>
                                        <div className='col'>
                                            <div className="row">
                                                <label>Enter Message :</label>
                                                <input type="text" placeholder="Message" name="message" className="formin"  {...register('message', {
                                                    required: true
                                                })} />
                                            </div>



                                            {errors.message && <span className='errorMessage'>Please enter a message</span>}
                                        </div>
                                    </div>
                                    <br />
                                    <br />

                                    <button className='submit-btn' disabled={disabled} type='submit'>
                                        Submit !
                                    </button>
                                    <br />
                                    <br />
                                </form>
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default ContactForm;