import { Link } from 'react-router-dom';
import routesHelper from '../../helpers/routes';
import styles from './Nav.module.css';
import Button from '../Button/Button'

const Nav = () => {
    return (
        <>
            <div className={styles.header} >
                <h1>Countries App</h1>
                <nav>
                    <Link to={routesHelper.home} >
                        <Button name='Home' />
                    </Link>
                    <Link to={routesHelper.activities} >
                        <Button name='Activities' />
                    </Link>
                    <Link to={routesHelper.createActivity} >
                        <Button name='Create Activity' />
                    </Link>
                </nav>
                <Link to='/'>
                    <button className={styles.landingButton}>Landing Page</button>
                </Link>
            </div>
        </>
    )
}

export default Nav