import styles from "./styles.module.css";
import React from 'react';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const handleClick = () => {
		// Redirect to another webpage
		window.location.href = '/calendar';
	  };
	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Class</h1>
				<button className={styles.white_btn} onClick={handleClick}>
					Calendar
				</button>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;