import {
    useEffect
} from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    useLocation
} from 'react-router-dom';
import {
    getAllCountries,
    getActivities,
    resetStateOnUnmount,
    setCurrentPage
} from '../redux/actions';

//* Custom hook para la lógica de paginación
const usePagination = (pageSize) => {
    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.currentPage);
    const countries = useSelector((state) => state.countries);
    const filteredCountries = useSelector((state) => state.filteredCountries);
    const activities = useSelector((state) => state.activities);

    const location = useLocation(); //* Obtiene la ruta actual
    const isHome = location.pathname !== '/home';

    useEffect(() => {
        //* Despacha una acción para obtener todos los países
        dispatch(getAllCountries());

        //* Si la ruta es '/activities', entonces obtiene todas las actividades
        if (location.pathname === '/activities') {
            dispatch(getActivities());
        }

        //* Despacha una acción para establecer la página actual en 1
        dispatch(setCurrentPage(1));

        //* Función de limpieza que se ejecuta cuando se desmonta el componente
        return () => {
            //* Limpia el estado utilizando una acción de Redux
            dispatch(resetStateOnUnmount());
        };
    }, [dispatch, location.pathname]); //* Agrega location.pathname como dependencia

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;

    let itemsToRender;
    //* Determina qué lista de elementos se debe renderizar en función de la ruta
    if (isHome) {
        itemsToRender = activities.slice(startIdx, endIdx); // *Renderiza actividades si no es la ruta /home
    } else {
        if (filteredCountries.length > 0) {
            itemsToRender = filteredCountries.slice(startIdx, endIdx);
        } else {
            itemsToRender = countries.slice(startIdx, endIdx);
        }
    }

    //* Manejador para el botón "Página anterior"
    const handlePrevClick = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    //* Manejador para el botón "Página siguiente"
    const handleNextClick = () => {
        //* Calcula el número total de elementos en función de la ruta y los elementos filtrados
        const totalItems = isHome ? activities.length : filteredCountries.length > 0 ? filteredCountries.length : countries.length;
        if (currentPage < Math.ceil(totalItems / pageSize)) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const handlePageClick = (page) =>{
        dispatch(setCurrentPage(page))
    }

    const totalPages = Math.ceil(
        isHome ?
        activities.length / pageSize :
        filteredCountries.length > 0 ?
        filteredCountries.length / pageSize :
        countries.length / pageSize
    );

    //* Retorna objetos y funciones para ser utilizados por el componente que llama a este hook
    return {
        itemsToRender,
        handlePrevClick,
        handleNextClick,
        handlePageClick,
        totalPages,
        currentPage
    };
};

export default usePagination;