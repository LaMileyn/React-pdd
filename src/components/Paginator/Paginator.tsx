import React, {FC, useMemo} from 'react';
import styles from './Paginator.module.scss';
import cn from 'classnames';
import {IQuestion} from "../../types/questions";

interface PaginatorProps{
    itemsCount : number,
    changePage? : (page : number) => void,
}
const Paginator : FC<PaginatorProps> = ({ itemsCount, changePage }) => {

    const pageChange = (page : number) =>{
        if ( changePage ) changePage(page)
    }
    const pages = useMemo( () => {
        return Array(itemsCount).fill(null).map( (el,index) => index + 1)
    },[itemsCount])

    return (
        <div className={styles.paginator}>
            {
                pages.map( page => (
                    <div
                        onClick={() => pageChange(page)}
                        className={cn(styles.page,styles.correct)}>
                        { page }
                    </div>
                ))
            }
        </div>
    );
}

export default Paginator;