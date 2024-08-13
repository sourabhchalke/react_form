import React, { useEffect, useState } from 'react'

export default function SimpleForm() {

    const [state, setState] = useState({
        username: "", email: "", password: "",gender:""
    })

    const [formError, setFormError] = useState({});

    const [isSubmit, setisSubmit] = useState(false);

    const onChangeHandler = (e) => {
        console.log(e.target)
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setFormError(validate(state));
        setisSubmit(true);
    };

    useEffect(() => {
        console.log(formError);
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log(state);
        }
        
    }, [formError])

    const validate = (values) => {
        const errors = {}
        const regex = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        if (!values.username) {
            errors.username = "Name Required";
        }
        if (!values.email) {
            errors.email = "Email Required"
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid Email"
        }

        if (!values.password) {
            errors.password = "Password Required"
        } else if (values.password.length < 4) {
            errors.password = "Minimum Character 4"
        }
        else if (values.password > 10) {
            errors.password = "Maximum 10 Character"
        }

        if(!values.gender){
            errors.gender="Gender Required"
        }

        return errors;
    };

    return (
        <div className='row m-0'>
            <pre>{JSON.stringify(state, undefined, 2)}</pre>
            <div className='col-12 col-md-10 col-lg-4 mx-auto'>
                <h2 className='mb-4 mt-4'>SignIn Form</h2>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label>Name : </label><br />
                        <input type='text' name='username' placeholder='Enter Name' value={state.name} onChange={onChangeHandler} />
                    </div>
                    <p className='text-danger'>{formError.username}</p>
                    <div>
                        <label>Email : </label><br />
                        <input type='email' name='email' placeholder='Enter Email' value={state.email} onChange={onChangeHandler} />
                    </div>
                    <p className='text-danger'>{formError.email}</p>
                    <div>
                        <label>Password : </label><br />
                        <input type='password' name='password' placeholder='Enter Password' value={state.password} onChange={onChangeHandler} />
                    </div>
                    <p className='text-danger'>{formError.password}</p>

                    <div>
                        <label>Gender : </label><br />
                        <input type='radio' name='gender' onChange={onChangeHandler} value="Male" />Male
                        <input type='radio' name='gender' onChange={onChangeHandler} value="Female" />Female
                    </div>
                    <p className='text-danger'>{formError.gender}</p>
                    <button className='btn btn-danger px-5 mt-4 py-2'>Submit</button>
                </form>
            </div>
        </div>
    )
}
