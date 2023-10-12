/* eslint-disable react/prop-types */
import styles from './Button.module.css'

const Button = (props) =>{

    const { name,  onClick }= props

    return(
        <button onClick={onClick} className={styles.buttonGeneral}>
            {name}
        </button>
    )
}

export default Button