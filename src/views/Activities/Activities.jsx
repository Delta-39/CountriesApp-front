import styles from './Activities.module.css'
import CountryWrapper from '../../components/CountryWrapper/CountryWrapper'


function Activities() {

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer} >
                <h2 className={styles.title}>Tourist Activities</h2>
            </div>
            <CountryWrapper/>
        </div>
    )
}

export default Activities