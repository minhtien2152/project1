import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/changeProfile.module.scss";

const genders = [
  ["Nam", "male"],
  ["Nữ", "female"],
  ["Bí mật", "null"],
];

const ChangeProfile = () => {
  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const [gender, setGender] = useState("");
  const fileUploader = useRef();
  const [avatar, setAvatar] = useState(null);
  const handleAvaClick = () => {
    fileUploader.current.click();
  };
  const onAvatarChange = (e) => {
    setAvatar([...e.target.files]);
  };
  useEffect(() => {
    if (profile) setGender(profile.gender);
  }, [profile]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>Chỉnh sửa hồ sơ</div>
      <input
        className="form-control-file"
        type="file"
        onChange={onAvatarChange}
        accept="image/*"
        style={{ display: "none" }}
        ref={fileUploader}
      />
      {profile && (
        <div className={styles.content}>
          <div className={styles.edit_avatar} onClick={handleAvaClick}>
            <div className={styles.avatar}>
              <img className={styles.profile_img} src={profile.avatar} />
            </div>
            <p>Thay đổi ảnh đại diện</p>
          </div>
          <div className={styles.edit_form}>
            <div className={styles.edit_item}>
              <div className={styles.edit_label}>Tên hiển thị</div>
              <div className={styles.edit_value}>{profile.name}</div>
            </div>
            <div className={styles.edit_item}>
              <div className={styles.edit_label}>Giới tính</div>
              <div className={styles.edit_value}>
                {genders.map((g) => (
                  <div
                    className={styles.radio}
                    onClick={(e) => setGender(g[1])}
                  >
                    <i
                      className={`${styles.radio_icon} ${
                        gender === g[1] && styles.radio_icon_active
                      }`}
                    ></i>
                    {g[0]}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.edit_item}>
              <div className={styles.edit_label}>Chữ kí</div>
              <div className={styles.edit_value}>
                <div className={styles.input}>
                  <div className={styles.input_container}>
                    <textarea />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.btn_block}>
              <button>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeProfile;
