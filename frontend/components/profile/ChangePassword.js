import styles from "../../styles/changePassword.module.scss";

const ChangePassword = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Thay đổi mật khẩu</div>
      <div className={styles.content}>
        <div className={styles.edit_form}>
          <div className={styles.edit_item}>
            <div className={styles.edit_label}>Mật khẩu hiện tại</div>
            <div className={styles.edit_value}>
              <div className={styles.input}>
                <div className={styles.input_container}>
                  <input type="password" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.edit_item}>
            <div className={styles.edit_label}>Mật khẩu mới</div>
            <div className={styles.edit_value}>
              <div className={styles.input}>
                <div className={styles.input_container}>
                  <input type="password" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.edit_item}>
            <div className={styles.edit_label}>Xác nhận</div>
            <div className={styles.edit_value}>
              <div className={styles.input}>
                <div className={styles.input_container}>
                  <input type="password" className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
