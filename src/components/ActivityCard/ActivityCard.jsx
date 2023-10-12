/* eslint-disable react/prop-types */
import styles from './ActivityCard.module.css'

function ActivityCard(props) {
    const { name, difficulty, duration, season, countries } = props

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.infoDiv} >
                <p className={styles.textInfo} >Difficulty: <span className={styles.spanInfo} >{difficulty}</span></p>
                <p className={styles.textInfo} >Duration: <span className={styles.spanInfo}  >{duration}</span></p>
                <p className={styles.textInfo} >Season: <span className={styles.spanInfo}  >{season}</span></p>
            </div>
            <div className={styles.countryWrapper} >
                <h3>Countries with this Activity</h3>
                <div className={styles.countryFlexCards} >
                    {countries.map((country, index) => (
                        <p key={index} className={styles.country} >{country.name}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ActivityCard