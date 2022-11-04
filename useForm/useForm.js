import { useEffect, useMemo, useState } from "react";




export const useForm = ( initialForm = {}, formValidations = {}) => {

   const initialFormMemo = useMemo(() => ({ ...initialForm }), [initialForm]);
    
    const [formState, setFormState] = useState( initialFormMemo );
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
      
      createValidators();
      
    }, [ formState ])
    
    useEffect(() => {

      setFormState( initialForm )
      
    }, [initialForm])
    

    const isFormValid = useMemo(() => { 

        for (const formField of Object.keys( formValidation )) {
          
          if( formValidation[formField] !== null) return false;

        }

        return true
     }, [ formValidation ])


    const onInputChange = ( { target } ) => {
        const { name, value } = target;
        
       setFormState({...formState, [ name ]: value });

    };

    const onResetForm = () => {
        setFormState( initialForm )
    }

    const onCleanInput = ({ target }) => {
      const { name } = target;
        
      setFormState({...formState, [ name ]: '' });
    }

    const createValidators = () => {

      const formCheckedValues = {};

      for (const formField of Object.keys( formValidations )) {
        const [ fn, errorMessage ] = formValidations[formField]
        
        formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
      }
      setFormValidation( formCheckedValues )
      
    };


  return {
    ...formValidation,
    ...formState,
    isFormValid,
    formValidation,
    formState,
    onInputChange,
    onResetForm,
    onCleanInput

  } 
}
