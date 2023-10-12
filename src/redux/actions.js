import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../helpers/routes';

//* Definición de los tipos de acciones
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const RESET_STATE_ON_UNMOUNT = 'RESET_STATE_ON_UNMOUNT';
export const ORDER = 'ORDER';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const RESET_FILTERS = 'RESET_FILTERS';

//* Acción para ordenar la lista de países
export const order = (orderValue) => {
    return {
        type: ORDER,
        payload: orderValue
    };
};

//* Acción para filtrar por continente
export const filterByContient = (filterValue) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: filterValue
    };
};

//* Acción para filtrar por actividad
export const filterByActivity = (activityId) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: activityId
    };
};

//* Acción para obtener la lista de todos los países o por nombre
export const getAllCountries = (name) => {
    return async function (dispatch) {
        try {
            let response;
            if (!name) {
                response = await axios.get(`${API_BASE_URL}/countries`);
            } else {
                response = await axios.get(`${API_BASE_URL}/countries?name=${name}`);
            }
            const countries = response.data;
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: countries
            });
        } catch (error) {
            if (error.response) {
                //* Error de respuesta del servidor
                toast.error(error.response.data.error);
            } else if (error.request) {
                //* No se pudo comunicar con el servidor
                toast.error('Could not connect to the server.');
            } else {
                //* Otras situaciones de error
                toast.error('An error occurred.');
            }
        }
    };
};

//* Acción para establecer la página actual en la paginación
export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    };
};

//* Acción para obtener la lista de todas las actividades
export const getActivities = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${API_BASE_URL}/activities`)
            const allActivities = response.data;
            dispatch({
                type: GET_ACTIVITIES,
                payload: allActivities
            });
        } catch (error) {
            toast.error(error);
        }
    };
};

//* Acción para obtener los detalles de un país
export const getCountryDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${API_BASE_URL}/countries/${id}`);
            const countryDetail = response.data;
            dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: countryDetail
            });
        } catch (error) {
            toast.error(error);
        }
    };
};

//* Acción para resetear el estado al desmontar un componente
export const resetStateOnUnmount = () => {
    return {
        type: RESET_STATE_ON_UNMOUNT
    };
};

//* Acción para crear una nueva actividad
export const createActivity = ({
    activity,
    duration,
    difficulty,
    season,
    countryNames
}) => {
    return async function () {
        try {
            //* Definimos el objeto a enviar para que los datos coincidan con los requeridos por la base de datos.
            const activityData = {
                name: activity,
                duration: duration,
                difficultyLevel: Number(difficulty),
                seasonType: season,
                countryNames: countryNames
            };

            //* Realizamos la solicitud a la API para crear una actividad
            await axios.post(`${API_BASE_URL}/activities`,activityData);
            //* Si todo sale bien, se notifica al usuario que la actividad fue creada
            toast.success('Activity Created');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error)
            }
        }
    };
};

//* Acción para resetear los filtros aplicados
export const resetFiltersAction = () => {
    return {
        type: RESET_FILTERS
    };
};