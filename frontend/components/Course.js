import Link from "next/link";
import styles from "../styles/course.module.scss";
import { Card } from "@themesberg/react-bootstrap";
import { useEffect, useState } from "react";
const Course = ({ course }) => {
  const [media, setUrl] = useState("");

  useEffect(() => {
    setUrl(course.media.url);
  }, [course]);

  const handleMedia = () => {
    const str1 = media.split("https://www.youtube.com/embed/")[1];
    const str2 = str1.split("?rel");
    console.log(str2[0]);
    const result = "https://img.youtube.com/vi/" + str2[0] + "/hqdefault.jpg";
    return result;
  };
  return (
    <Card className={styles.card}>
      {media !== "" && (
        <Card.Img
          variant="top"
          className={styles.card_img}
          src={`${handleMedia()}`}
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
