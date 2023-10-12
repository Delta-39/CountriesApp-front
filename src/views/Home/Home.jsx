import CardWrapper from '../../components/CountryWrapper/CountryWrapper'
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import styles from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { filterByContient, getAllCountries, order, filterByActivity, resetFiltersAction, setCurrentPage } from '../../redux/actions';
import { useState } from 'react';

function Home() {

    //* Llamamos a useState para guardar en el estado local el nombre buscado por el usuario.
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    //* Definimos la función que se encarga de enviar el dispatch para generar el orden de los países.
    const handleOrder = (e) => {
        let orderValue = e.target.value;
        dispatch(order(orderValue));
    };

    //* Definimos la función que se encarga de hacer el dispatch para generar el filtro de los países.
    const handleFilter = (e, filterType) => {
        let filterValue = e.target.value;
        if (filterType === 'continent') {
            dispatch(filterByContient(filterValue)); //* Filtro por continente
        } else if (filterType === 'activity') {
            dispatch(filterByActivity(filterValue)); //* Filtro por actividad
        }
        dispatch(setCurrentPage(1))
    };

    //* Función para realizar la búsqueda de países por nombre
    let onSearch = (name) => {
        dispatch(getAllCountries(name));
    };

    //* Función para manejar cambios en el campo de búsqueda
    let handleChange = (event) => {
        let name = event.target.value
        setName(name);
    };

    //* Función para resetear los filtros
    let resetFilters = () => {
        dispatch(resetFiltersAction());
    };

    //* Obtiene la lista de países con actividades desde el estado global
    const countryActivities = useSelector(state => state.countries);

    //* Filtra los países que tienen actividades
    const countriesWithActivities = countryActivities.filter(country => country.Activities && country.Activities.length > 0);

    //* Crea un objeto para almacenar los nombres únicos de actividades
    const uniqueActivityNamesMap = {};

    //* Itera sobre los países para agregar los nombres de actividades al objeto
    countriesWithActivities.forEach(country => {
        country.Activities.forEach(activity => {
            uniqueActivityNamesMap[activity.id] = activity.name;
        });
    });

    //* Convierte el objeto de nombres en un array de objetos
    const uniqueActivityNamesArray = Object.entries(uniqueActivityNamesMap).map(([id, name]) => ({ value: id, label: name }));

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div>
            <div className={styles.containerBackground}>
                <div className={styles.menuContainer} >
                    <p className={styles.hamburguerMenu}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        Menu
                    </p>
                    {isMenuOpen && (
                        <div className={styles.mobileMenu}>
                            <div className={styles.mobileItem}>
                                <input className={styles.searchBar} onChange={handleChange} onKeyUp={() => onSearch(name)} type="text" placeholder='Type a Country Name...' />
                            </div>
                            <div className={styles.mobileItem} >
                                <button className={styles.resetButton} onClick={resetFilters}>Reset Filters</button>
                            </div>
                            <div className={styles.mobileItem} >
                                <FilterButtons mobile={isMenuOpen} onChange={(e) => handleFilter(e, 'continent')} filterName='Filter by Continent'
                                    options={[
                                        { value: 'all', label: 'all' },
                                        { value: 'Europe', label: 'Europe' },
                                        { value: 'North America', label: 'North America' },
                                        { value: 'South America', label: 'South America' },
                                        { value: 'Asia', label: 'Asia' },
                                        { value: 'Africa', label: 'Africa' },
                                        { value: 'Oceania', label: 'Oceania' },
                                        { value: 'Antarctica', label: 'Antarctica' }]} />
                            </div>
                            <div className={styles.mobileItem} >
                                <FilterButtons mobile={isMenuOpen}  onChange={(e) => handleFilter(e, 'activity')} filterName='Filter By Activity' options={uniqueActivityNamesArray} />
                            </div>
                            <div className={styles.mobileItem} >
                                <FilterButtons mobile={isMenuOpen}  onChange={handleOrder} filterName='Order by Name'
                                    options={[
                                        { value: 'nameAsc', label: 'Ascending' },
                                        { value: 'nameDes', label: 'Descending' }]} />
                            </div>
                            <div className={styles.mobileItem} >
                                <FilterButtons mobile={isMenuOpen}   onChange={handleOrder} filterName='Order by Population'
                                    options={[
                                        { value: 'popuAsc', label: 'Ascending' },
                                        { value: 'popuDes', label: 'Descending' }]} />
                            </div>
                        </div>
                    )}
                    <div className={styles.filtersContainer} >
                        <div className={styles.searchBarContainer} >
                            <input className={styles.searchBar} onChange={handleChange} onKeyUp={() => onSearch(name)} type="text" placeholder='Type a Country Name...' />
                        </div>
                        <div className={styles.selectionContainer} >
                            <button className={styles.resetButton} onClick={resetFilters} >Reset Filters</button>
                            <FilterButtons onChange={(e) => handleFilter(e, 'continent')} filterName='Filter by Continent'
                                options={[
                                    { value: 'all', label: 'all' },
                                    { value: 'Europe', label: 'Europe' },
                                    { value: 'North America', label: 'North America' },
                                    { value: 'South America', label: 'South America' },
                                    { value: 'Asia', label: 'Asia' },
                                    { value: 'Africa', label: 'Africa' },
                                    { value: 'Oceania', label: 'Oceania' },
                                    { value: 'Antarctica', label: 'Antarctica' }]} />
                            <FilterButtons onChange={(e) => handleFilter(e, 'activity')} filterName='Filter By Activity' options={uniqueActivityNamesArray} />
                            <FilterButtons onChange={handleOrder} filterName='Order by Name'
                                options={[
                                    { value: 'nameAsc', label: 'Ascending' },
                                    { value: 'nameDes', label: 'Descending' }]} />
                            <FilterButtons onChange={handleOrder} filterName='Order by Population'
                                options={[
                                    { value: 'popuAsc', label: 'Ascending' },
                                    { value: 'popuDes', label: 'Descending' }]} />
                        </div>
                    </div>
                </div>
            </div>
            <CardWrapper />
        </div>
    )
}

export default Home