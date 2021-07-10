import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCourses } from "../../actions/userActions";
import { handleMedia } from "../../lib/utils";
import styles from "../../styles/comments.module.scss";
import Head from "next/head";
import { Button } from "@themesberg/react-bootstrap";
import { deleteComment, listComments } from "../../actions/commentActions";

const LikeList = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const commentList = useSelector((state) => state.commentList);
  const { loading, error, comments } = commentList;

  const commentDelete = useSelector((state) => state.commentDelete);
  const { success } = commentDelete;

  useEffect(() => {
    if (profile?._id)
      dispatch(listComments({ user: profile._id, populate: "course" }));
  }, [dispatch, profile, success]);

  const handleDeleteComment = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ?")) {
      dispatch(deleteComment(id));
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <link type="text/css" rel="stylesheet" href="/css/plugin.css" />
      </Head>
      <div className={styles.title}>Các đánh giá của bạn</div>
      <div>
        {comments?.length &&
          comments.map((comment) => (
            <div className={styles.comment}>
              <div className={styles.course_title}>{comment.course.title}</div>
              <div>
                Điểm đánh giá :{" "}
                <span className={styles.rating}>
                  {[...Array(comment.rating)].map(() => (
                    <i className="fa fa-star co-or"></i>
                  ))}
                </span>
              </div>
              <div>
                Nội dung : <span>{comment.content}</span>
              </div>
              <Button
                variant="danger"
                onClick={() => handleDeleteComment(comment._id)}
              >
                <i className="fas fa-trash" />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LikeList;
