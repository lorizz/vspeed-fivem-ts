import styles from "./Loading.module.css";
import copsLight from "../assets/images/loading/copsLight.png";

const Loading = () => {
  return (
    <>
      <div className={styles.loading}>
        <div className={`${styles.animate} row h-100`}>
          <div className="col-4 offset-7 d-flex flex-column justify-content-center">
            <img src={copsLight} className="align-self-center" height="64px" />
            <p>Loading</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading;