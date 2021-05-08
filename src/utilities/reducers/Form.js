import { axiosHelper } from "./axiosHelper";

function init(initialFormType) {
    return formData = {
            formType: initialFormType,
            values: {},
            errors: {},
            isSubmitting: false
        }
    
}

function Counter({initialFormType}) {
    const [state, dispatch] = useReducer(reducer, initialFormType, init);
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'reset', payload: initialCount})}> Reset </button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      </>
    );
  }

function formReducer(state, action) {
    switch (action.type) {
        case 'REGISTER':

            switch (action.function) {
                case 'init': // Initializing Register specific object keys/values for formData 
                    formData.values = {
                        name: "",
                        email: "",
                        password: ""
                    }

                case 'onChange': // Storing current form values and then "frontend" error checking for simple rules/validation
                    formData.values.name = state.values.name 
                    formData.values.email = state.values.email
                    formData.values.password = state.values.password

                    { formData.values } 

                    if (!state.values.name) {
                        formData.errors.name = 'Name is required';
                    }
                    if (!state.values.email) {
                        formData.errors.email = "Email is required";
                    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                        formData.errors.email = "Email address format is invalid"
                    }
                    if (!state.values.password) {
                        formData.errors.password = 'Password is required';
                    } else if (state.values.password < 8) {
                        formData.errors.password = "Password must be 8 or more characters"
                    }
                    return formData;
                case 'onSubmit':
                    if (Object.keys(formData.errors).length === 0 && formData.isSubmitting) {
                        axiosHelper({
                            // Check for unique emails
                            data: formData.value.email,
                            method: 'post',
                            url: '///////////////', // Put URL in
                            successMethod: {} // Return some success message
                        })
                    }

            }
        case 'LOGIN':
        case 'CREATEGROUP':
    }
}