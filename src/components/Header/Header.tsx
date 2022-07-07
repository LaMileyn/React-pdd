import React, {FC} from 'react';
import styles from './Header.module.scss';
import Container from "../Container/Container";

const Header: FC = (props) => {
    return (
        <div className={styles.header}>
            <Container>
                <h2>MileynDD</h2>
            </Container>
        </div>
    );
}

export default Header;