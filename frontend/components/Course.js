import Link from "next/link";
import styles from "../styles/course.module.scss";
import { Card } from "@themesberg/react-bootstrap";
const Course = () => {
  return (
    <Card className={styles.card}>
      <Card.Img
        variant="top"
        className={styles.card_img}
        src="https://pasgo.vn/Upload/anh-chi-tiet/nha-hang-pachi-pachi-mac-dinh-chi-1-normal-77643113205.jpg"
      />
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Course;
