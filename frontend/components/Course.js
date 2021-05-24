import Link from "next/link";
import styles from "../styles/course.module.scss";
import { Card } from "@themesberg/react-bootstrap";
import { useEffect, useState } from "react";
import { handleMedia } from "../lib/utils";
const Course = ({ course }) => {
  const [media, setUrl] = useState("");

  useEffect(() => {
    setUrl(course.media.url);
  }, [course]);

  return (
    <Card className={styles.card}>
      {media !== "" && (
        <Card.Img
          variant="top"
          className={styles.card_img}
          src={`${handleMedia(media)}`}
        />
      )}
      <Card.Body>
        <Card.Title>
          <Link href="/course/[id]" as={`/course/${course._id}`}>
            <a>
              {course.title.length > 40
                ? course.title.slice(0, 40) + "..."
                : course.title}
            </a>
          </Link>
        </Card.Title>
        <Card.Text className={styles.price}>{course.price}</Card.Text>
        <div className={styles.rating}>
          {[...Array(5)].map(() => (
            <i className="fa fa-star co-or"></i>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Course;
