import React from 'react';
import { useFormik, withFormik } from 'formik';

// // Yup can also be used for validation, check it once
// // TODO: Add Asterisk for showing Required fields


//  Start Here: https://formik.org/docs/api/formik#component-reactcomponenttypeformikpropsvalues
//  See Component and Children

const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
  
    if (!values.password) {
      errors.password = 'Required';
    } 
    // Minimum number of characters in a string validation can be added later
    // else if (values.password.length > 8) {
    //   errors.password = 'Must be 8 characters or less';
    // }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };

const RegisterFormik = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
					fetch('http://localhost:3000/register', {
						method: 'post',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							email: values.email,
							password: values.password,
							name: values.name
						})
					})
            .then(response => response.json())
            .then(user => {
                // if(user) {
                //     this.props.loadUser(user);
                //     this.props.onRouteChange('home');
								// }
								console.log(user);
            });
						alert(JSON.stringify(values, null, 2));
						console.log('Submitiing Info');
        },
    });

		return(
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure ">
						<form onSubmit={formik.handleSubmit}>
							<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
								<legend className="f2 fw6 ph0 mh0">Register</legend>
								<div className="mt3">
									<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
									<input 
										className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
										type="text" 
										name="name"  
										id="name"
										onChange={formik.handleChange} 
										onBlur={formik.handleBlur}
										value={formik.values.name}
									/>
									{ 
										formik.touched.name && formik.errors.name 
										? <label className="fw6 f6 i" style={{color: "#E0DF03"}}>{formik.errors.name}</label> 
										: null 
									}
								</div>
								<div className="mt3">
									<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
									<input 
										className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
										type="email" 
										name="email"  
										id="email"
										onChange={formik.handleChange} 
										onBlur={formik.handleBlur}
										value={formik.values.email}
									/>
									{ 
										formik.touched.email && formik.errors.email 
										? <label className="fw6 f6 i" style={{color: "#E0DF03"}}>{formik.errors.email}</label> 
										: null 
									}
								</div>
								<div className="mv3">
									<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
									<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
										type="password" 
										name="password"  
										id="password"
										onChange={formik.handleChange} 
										onBlur={formik.handleBlur}
										value={formik.values.password}
									/>
									{ 
										formik.touched.password && formik.errors.password 
										? <label className="fw6 f6 i" style={{color: "#E0DF03"}}>{formik.errors.password}</label> 
										: null 
									}
								</div>
							</fieldset>
							<div className="">
									<input
											className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
											type="submit" 
											value="Register"
									/>
							</div>
						</form>
					</div>
				</main>
			</article>
		);
}

export default RegisterFormik;