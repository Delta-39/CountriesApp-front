import {
    GET_ALL_COUNTRIES,
    GET_ACTIVITIES,
    GET_COUNTRY_DETAIL,
    ORDER,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    SET_CURRENT_PAGE,
    CREATE_ACTIVITY,
    RESET_STATE_ON_UNMOUNT,
    RESET_FILTERS
} from './actions';

//* Estadp inicial de la aplicacion
const initialState = {
    countries: [],
    currentPage: 1,
    pageSize: 10,
    filteredCountries: [],
    countryDetail: [],
    activities: []
};

//* Función de utilidad para ordenar la lista de países
const orderCountries = (countries, payload) => {
    let sortedCopy;
    if (payload === 'nameAsc') {
        sortedCopy = countries.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (payload === 'nameDes') {
        sortedCopy = countries.slice().sort((a, b) => b.name.localeCompare(a.name));
    } else if (payload === 'popuAsc') {
        sortedCopy = countries.slice().sort((a, b) => a.population - b.population);
    } else if (payload === 'popuDes') {
        sortedCopy = countries.slice().sort((a, b) => b.population - a.population);
    } else {
        sortedCopy = countries.slice();
    }
    return sortedCopy;
};

//* Función de utilidad para filtrar países por continente
const filterCountriesByContinent = (countries, payload) => {
    return payload === 'all' ? countries : countries.filter((country) => country.continents === payload);
};

//* Función de utilidad para filtrar países por actividad
const filterCountriesByActivity = (countries, activityId) => {
    return countries.filter(country => country.Activities && country.Activities.some(activity => activity.id === Number(activityId)))
};

//* Reductor principal que maneja las acciones y actualiza el estado
const rootReducer = (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: payload,
                filteredCountries: payload
            };
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: payload
            };
        case GET_ACTIVITIES:
            return {
                ...state, activities: payload
            };
        case GET_COUNTRY_DETAIL:
            return {
                ...state, countryDetail: payload
            };
        case ORDER:
            return {
                ...state,
                countries: orderCountries(state.countries, payload),
                    filteredCountries: orderCountries(state.filteredCountries, payload)
            };
        case FILTER_BY_CONTINENT:
            return {
                ...state,
                filteredCountries: filterCountriesByContinent(state.countries, payload)
            };
        case FILTER_BY_ACTIVITY: 
            return {
                ...state,
                filteredCountries: filterCountriesByActivity(state.countries, payload)
            };
        case CREATE_ACTIVITY:
            return {
                ...state, activities: [...state.activities, payload]
            };
        case RESET_FILTERS:
            return{
                ...state,
                filteredCountries: state.countries
            }
        default:
            return state;
    }
};

//* Wrapper para manejar el reseteo del estado al desmontar un componente
export default (state, action) => {
    if (action.type === RESET_STATE_ON_UNMOUNT) {
        return initialState;
    }

    return rootReducer(state, action);
};