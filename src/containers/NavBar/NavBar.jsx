import React from "react";
import styles from "./NavBar.module.scss";
import Button from "../../components/Button";

const NavBar = (props) => {

  const {signInWithRedirect, signOut, user} = props;

  const buttonsJSX = user? <Button btnText="Sign out" handleClick={signOut} /> : <Button btnText="Sign in" handleClick={signInWithRedirect} />;

  return (
    <div className={styles.navBar}>
      <h1>TaskMASTER</h1>
      <div className={styles.login}>
        {buttonsJSX}
      </div>
    </div>
  );
};

export default NavBar;
