import React, {FC, useMemo} from 'react';
import styles from './Paginator.module.scss';
import cn from 'classnames';

interface PaginatorProps{
    itemsCount : number,
}
const Paginator : FC<PaginatorProps> = ({ itemsCount }) => {

    const pages = useMemo( () => {
        return Array(itemsCount).fill(null).map( (el,index) => index + 1)
    },[itemsCount])
    console.log(pages)

    return (
        <div className={styles.paginator}>
            {
                pages.map( page => (
                    <div
                        className={cn(styles.page,styles.correct)}>
                        { page }
                    </div>
                ))
            }
        </div>
    );
}

export default Paginator;