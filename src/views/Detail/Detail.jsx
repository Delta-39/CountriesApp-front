import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getCountryDetail, resetStateOnUnmount } from '../../redux/actions'
import { BiArrowBack } from "react-icons/bi";
import styles from './Detail.module.css'


function Detail() {

    //* requiero el id del pais deseado, el cual me llega mediante params desde la ruta definida en el backend.

    const { id } = useParams()
    const dispatch = useDispatch()

    // * llamo al estado global countryDetail
    const countryDetail = useSelector(state => state.countryDetail)

    //* utilizo useEffect para renderizar la informacion una vez que el componente ya esta montado.

    useEffect(() => {
        dispatch(getCountryDetail(id))

        //* En return se despacha la funcion de limpieza del estado
        return () => {
            dispatch(resetStateOnUnmount())
        }
    }, [dispatch, id])

    return (
        <div className={styles.container}>
            <Link to='/home' >
                <button className={styles.backButton}>
                    <BiArrowBack /> Back
                </button>
            </Link>
            <div className={styles.infoContainer}>
                <div className={styles.flag}>
                    <img src={countryDetail.flag} alt={countryDetail.id} />
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{countryDetail.name}</h2>
                    <div className={styles.countryInfo} >
                        <h3 className={styles.infoTitle} >I.D.:  <span>{countryDetail.id}</span></h3>
                        <h3 className={styles.infoTitle} >Continent:  <span>{countryDetail.continents}</span></h3>
                        <h3 className={styles.infoTitle} >Capital:  <span>{countryDetail.capital}</span></h3>
                        <h3 className={styles.infoTitle} >Population:  <span>{countryDetail.population}</span></h3>
                        {countryDetail.area ? <h3 className={styles.infoTitle} >Area:  <span>{(countryDetail.area)} m2</span></h3> : null}
                        {countryDetail.subregion ? <h3 className={styles.infoTitle} >Subregion:  <span>{countryDetail.subregion}</span></h3> : null}
                    </div>
                    {countryDetail.Activities && countryDetail.Activities.length === 0 ? null :
                    <div className={styles.activities} >
                        <h3>Actividades Turisticas: </h3>
                        {countryDetail.Activities && countryDetail.Activities.map(
                            activity => (<p className={styles.activity} key={activity.id} >{activity.name}</p>))
                        }
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Detail