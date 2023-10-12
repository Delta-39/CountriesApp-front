import styles from './Form.module.css'
import adventureImg from '../../assets/img/undraw_travel_mode_re_2lxo.svg'
import { useState, useRef, useEffect } from 'react'
import { validation } from './validation'
import { BiInfoCircle } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { createActivity, getAllCountries, resetStateOnUnmount } from '../../redux/actions';

const Form = () => {

    const dispatch = useDispatch(); //* Obtiene la función de despacho de Redux
    const formRef = useRef(null); //* Crea una referencia mutable para el formulario

    useEffect(() => {
        dispatch(getAllCountries()); //* Realiza la llamada para obtener la lista de países al cargar el componente
        return () => {
            dispatch(resetStateOnUnmount()); //* Restablece el estado de Redux cuando el componente se desmonta
        };
    }, [dispatch]);

    const countries = useSelector(state => state.countries); //* Obtiene la lista de países desde el estado de Redux

    const initialActivityData = {
        activity: '',
        difficulty: '1',
        duration: '',
        season: 'Verano',
        countryNames: []
    }; //* Define los datos iniciales para la actividad

    const [activityData, setActivityData] = useState(initialActivityData); //* Define el estado para los datos de la actividad
    const [errors, setErrors] = useState({
        activity: '',
        duration: '',
        countryNames: ''
    }); //* Define el estado para los errores de validación

    const [selectedCountries, setSelectedCountries] = useState([])

    const handleChange = (event) => {
        const property = event.target.name; //* Obtiene el nombre del campo
        const value = event.target.value; //* Obtiene el valor del campo
        const updatedData = { ...activityData, [property]: value }; //* Actualiza los datos de la actividad con el nuevo valor
        validation(updatedData,setErrors)
        setActivityData(updatedData); //* Actualiza el estado con los nuevos datos
    };

    const handleCountryChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value); //* Creo un array a partir de los paises elegidos
        const newSelectedCountries = selectedOptions.filter(option => !selectedCountries.includes(option)); //* Verifico que esa opcion no este ya seleccionada

        const updatedSelectedCountries = [...selectedCountries, ...newSelectedCountries]; //* Añado los paises seleccionados

        setSelectedCountries(updatedSelectedCountries); //*Seteo el estado

        const updatedData = { ...activityData, countryNames: updatedSelectedCountries };
        validation(updatedData,setErrors)
        setActivityData(updatedData);
    };


    const handleDelete = (index) => {
        setSelectedCountries(prevSelectedCountries => prevSelectedCountries.filter((country, i) => i !== index)); //*Actualiza el estado eliminando al pais en cuestion
        const updatedData = { ...activityData, countryNames: selectedCountries.filter((country, i) => i !== index) }; //* crea una copia de activity data y añada el array filtrado
        validation(updatedData,setErrors) //* Valida los datos
        setActivityData(updatedData); //*Actualiza el estado de data.
    }

    const handleSubmit = (event) => {
        event.preventDefault(); //* Evita el comportamiento de envío por defecto del formulario 
        validation(activityData, setErrors)
        if (Object.keys(errors).length === 0) {
            dispatch(createActivity(activityData)); //* Envía la acción de creación de actividad a Redux
            formRef.current.reset(); //* Reinicia el formulario
            setActivityData(initialActivityData); //* Restablece los datos de la actividad
            setSelectedCountries([]) //* Restablece el estado de paises seleccionados
        } else{
            alert('Complete all mandatory inputs')
        }
    }

    return (
        <div className={styles.container} >
            <div className={styles.generalFormContainer} >
                <div className={styles.preFormContainer} >
                    <h2>Create a <span>Turistic</span> Activity</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor similique aspernatur, pariatur sint accusantium maxime dignissimos rem ab reiciendis placeat ipsam soluta expedita iste sapiente minus! Ad quasi amet id!</p>
                    <img src={adventureImg} alt="adventure image" />
                </div>
                <div className={styles.formContainer} >
                    <h2>Activity Information</h2>
                    <form ref={formRef} action="" method="post">
                        <label htmlFor="" name='name'>Activity Name</label>
                        <input onChange={handleChange} className={styles.infoField} type="text" name='activity' />
                        {errors.activity && <div className={styles.errorsContainer}>
                            <BiInfoCircle className={styles.errorText} />
                            <p className={styles.errorText} >{errors.activity}</p>
                        </div>}
                        <label htmlFor="" name='difficulty' >Difficulty Level</label>
                        <select onChange={handleChange} className={styles.infoField} defaultValue='1' name="difficulty" id="">
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                        <label htmlFor="" name='duration'>Activity Duration</label>
                        <input onChange={handleChange} className={styles.infoField} type="time" name="duration" id="" />
                        {errors.duration && <div className={styles.errorsContainer}>
                            <BiInfoCircle className={styles.errorText} />
                            <p className={styles.errorText} >{errors.duration}</p>
                        </div>}
                        <label htmlFor="" name='season'>Season of the Activity</label>
                        <select onChange={handleChange} className={styles.infoField} defaultValue='Summer' name="season" id="">
                            <option value="Verano">Summer</option>
                            <option value="Otoño">Autumn</option>
                            <option value="Invierno">Winter</option>
                            <option value="Primavera">Spring</option>
                        </select>
                        <label htmlFor="" name='country'>Country of the Activity</label>
                        <select
                            onChange={handleCountryChange}
                            className={styles.infoField}
                            value={activityData.countryNames}
                            name="countries"
                        >
                            {countries.map(country => (
                                <option key={country.id} value={country.name}>{country.name}</option>
                            ))}
                        </select>
                        {selectedCountries.length > 0 && (
                            <div>
                                <ul className={styles.countriesSelection}>
                                    {selectedCountries.map((countryName, index) => (
                                        <li className={styles.countrySelected} key={index}>
                                            {countryName}
                                            <p className={styles.deleteCountry} onClick={() => handleDelete(index)}>X</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {errors.countryNames && (
                                    <div className={styles.errorsContainer}>
                                        <BiInfoCircle className={styles.errorText} />
                                        <p className={styles.errorText}>{errors.countryNames}</p>
                                    </div>
                                )}
                        {Object.keys(errors).length === 0 ?<button onClick={handleSubmit} className={styles.postButton}>Create Activity</button> : null}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form