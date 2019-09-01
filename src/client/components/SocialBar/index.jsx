import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// assets
import styles from '../../assets/sass/SocialBar.scss';


const SocialBar = () => (
  <div className={styles.container}>
    <ul className={styles.socialNav}>
      <li className={styles.item}>
        <a className={styles.instagram} href="https://www.instagram.com/franciscoveracoechea">
          <FontAwesomeIcon icon={['fab', 'instagram']} />
        </a>
      </li>
      <li className={styles.item}>
        <a className={styles.github} href="https://github.com/FranciscoVeracoechea">
          <FontAwesomeIcon icon={['fab', 'github-square']} />
        </a>
      </li>
      <li className={styles.item}>
        <a className={styles.linkedin} href="https://www.linkedin.com/in/francisco-veracoechea-a54785155/">
          <FontAwesomeIcon icon={['fab', 'linkedin']} />
        </a>
      </li>
    </ul>
  </div>
);

export default SocialBar;
