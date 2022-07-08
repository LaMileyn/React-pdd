import React, {FC} from 'react';
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import styles from './MainLayout.module.scss';

const MainLayout: FC = (props) => {
    return (
        <div>
            <Header/>
            {/* main content*/}
            <div className={styles.contentContainer}>
                <Outlet/>
            </div>
            {/* main content*/}

        </div>
    );
}

export default MainLayout;