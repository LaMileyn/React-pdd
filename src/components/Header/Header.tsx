import React, {FC} from 'react';
import styles from './Header.module.scss';
import Container from "../Container/Container";
import {Link} from "react-router-dom";

const Header: FC = (props) => {
    return (
        <div className={styles.header}>
            <Container>
                <Link to={"/"}>
                    <h2>MileynDD</h2>
                </Link>
            </Container>
        </div>
    );
}

export default Header;