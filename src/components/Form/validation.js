export const validation = ({ activity, duration, countryNames }, setErrors) => {
    let errors = {};

    //* Valido si el nombre de la actividad está completo
    if (!activity) {
        errors.activity = 'The field name must be completed.';
    } else {
        //* Valida que la actividad no contenga caracteres especiales ni números
        if (/[^A-Za-z\s]/.test(activity)) {
            errors.activity = 'The field name can only contain letters and spaces.';
        }
    }

    //*Valido si hay al menos un pais seleccionado.
    if(countryNames.length === 0 ){
        errors.countryNames = 'Choose at least one country'
    }

    //* Valido si la duración está completa
    if (!duration) {
        errors.duration = 'The field duration must be completed.';
    }

    setErrors(errors);
};
