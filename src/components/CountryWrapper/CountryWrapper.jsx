import usePagination from '../../hooks/usePagination';
import CountryCard from '../CountryCard/CountryCard';
import ActivityCard from '../ActivityCard/ActivityCard';
import styles from './CountryWrapper.module.css';
import Button from '../Button/Button';
import { useLocation } from 'react-router-dom';

function CardWrapper() {
    const pageSize = 10;
    const { itemsToRender, handlePrevClick, handleNextClick, handlePageClick, currentPage, totalPages } = usePagination(pageSize);

    const location = useLocation();
    const isHome = location.pathname !== '/home';

    const pagesToShow = 5;
    const pagesPerBatch = 5;
    const numBatches = Math.ceil(totalPages / pagesPerBatch);

    const currentBatch = Math.floor((currentPage - 1) / pagesPerBatch);

    const startPage = currentBatch * pagesPerBatch + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    const pageButtons = [];

    for (let page = startPage; page <= endPage; page++) {
        pageButtons.push(
            <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`${styles.paginationButton} ${currentPage === page ? styles.activeButton : ''}`}
            >
                {page}
            </button>
        );
    }

    const renderNextBatchButton = currentBatch < numBatches - 1;

    return (
        <>
            <div className={styles.container}>
                {/* Condición para renderizar la tarjeta adecuada según isHome */}
                {itemsToRender.map((item) => (
                    isHome ? (
                        <ActivityCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            difficulty={item.difficultyLevel}
                            duration={item.duration}
                            season={item.seasonType}
                            countries={item.Countries}
                        />
                    ) : (
                        <CountryCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            flag={item.flag}
                            population={item.population}
                            continent={item.continents}
                            capital={item.capital}
                        />
                    )
                ))}
            </div>
            <div className={styles.buttonContainer}>
                <Button name="Prev" onClick={handlePrevClick} disabled={currentPage === 1} />
                <div className={styles.paginationContainer}>
                    {pageButtons}
                    {renderNextBatchButton && (
                        <button
                            onClick={() => handlePageClick(startPage + pagesToShow)}
                            className={styles.paginationButton}
                        >
                            ...
                        </button>
                    )}
                </div>
                <Button name="Next" onClick={handleNextClick} disabled={currentPage === totalPages} />
            </div>
        </>
    );
}

export default CardWrapper;

