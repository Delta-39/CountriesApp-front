/* eslint-disable react/prop-types */
import styles from './FilterButtons.module.css'


function FilterButtons(props) {
    //* Desestructura las propiedades recibidas: filterName, options y onChange
    const { mobile, filterName, options, onChange } = props
    
    return (
        <div>
            <select onChange={onChange} className={ mobile? styles.mobileFilter : styles.filter} name="" id="">
                <option disabled selected hidden>{filterName}</option>
                {options.map((option)=>(
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default FilterButtons