import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';
import routesHelper from '../../helpers/routes';

export default function LandingPage() {

    
    return (
        <div className={styles.container}>
            <div className={styles.textContainer} >
                <h1 className={styles.title}>Ready<span className={styles.span} >Ready</span></h1>
                <h1 className={styles.title}>To <span className={styles.span} >To</span></h1>
                <h1 className={styles.title}>Explore the world?<span className={styles.span} >Explore the world?</span></h1>
            </div>
            <Link to={routesHelper.home}>
                <button className={styles.button}>Lets go</button>
            </Link>
        </div>
    )
}
