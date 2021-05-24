import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../actions/userActions";
import { wrapper } from "../../store";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/profilePage.module.scss";
import LikeList from "../../components/profile/LikeList";
import Head from "next/head";
const LIKE_LIST = "Likelist";
const COMMENT = "Comment";
const EDIT_INFO = "EditInfo";
const PASSWORD = "Password";

const menuList = [
  ["fas fa-star", "Danh sách yêu thích", LIKE_LIST, <LikeList />],
  ["far fa-comment-dots", "Đánh giá", COMMENT],
  ["fas fa-user-edit", "Chỉnh sửa thông tin", EDIT_INFO],
  ["fas fa-key", "Thay đổi mật khẩu", PASSWORD],
];

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const [screen, setScreen] = useState(LIKE_LIST);

  useEffect(() => {
    console.log(id);
    console.log(axios.defaults.headers.common["Authorization"]);
    dispatch(getProfile(id));
  }, [dispatch, id]);

  return (
    <div className={styles.main_page}>
      <div className={`container ${styles.layout}`}>
        <div className={`${styles.container} ${styles.header_container}`}>
          {profile && (
            <>
              <img className={styles.profile_img} src={profile.avatar} />
              <div className={styles.user}>
                <div className={styles.user_name}>{profile.name}</div>
                <div className={styles.user_intro}>
                  <span>
                    <i class="far fa-file-alt"></i> Chữ kí :{" "}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.content}>
          <div className={`${styles.container} ${styles.side_menu}`}>
            <div className={styles.header}>Trung tâm cá nhân</div>
            <ul className={styles.menu_list}>
              {menuList.map((item) => (
                <li
                  className={`${styles.menu_item} ${
                    screen === item[2] && styles.checked
                  }`}
                  onClick={(e) => setScreen(item[2])}
                >
                  <div className={styles.icon}>
                    <i className={item[0]}></i>
                  </div>
                  {" " + item[1]}
                </li>
              ))}

              <li className={styles.menu_item}>
                <div className={styles.icon}>
                  <i className="fas fa-sign-out-alt"></i>
                </div>{" "}
                Đăng xuất
              </li>
            </ul>
          </div>

          {screen === LIKE_LIST && menuList[0][3]}
        </div>
      </div>
    </div>
  );
};

export default Profile;
