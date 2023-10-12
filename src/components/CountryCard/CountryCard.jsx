/* eslint-disable react/prop-types */
import styles from './CountryCard.module.css'
import { Link } from 'react-router-dom'

function Card(props) {
    //*Desetructuramos las props
    const {id,name, flag, population, continent, capital} = props

    return (
        <div className={styles.container} >
            <div className={styles.flagContainer} >
                <img src={flag} alt="Country Flag" />
            </div>
            <div className={styles.textContainer} >
                <h3>{name}</h3>
                <div className={styles.countryInfo}>
                    <p>Population: <span>{population}</span></p>
                    <p>Continent: <span>{continent}</span></p>
                    <p>Capital: <span>{capital ? capital : 'Country without capital'}</span></p>
                </div>
            </div>
            <Link  to={`/countries/${id}`} >
                <button className={styles.button} > More Details </button>
            </Link>
        </div>
    )
}

export default Card