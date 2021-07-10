import Link from "next/link";
import styles from "../styles/course.module.scss";
import { Card } from "@themesberg/react-bootstrap";
import { useEffect, useState } from "react";
import { handleMedia } from "../lib/utils";
const Course = ({ course }) => {
  return (
    <Card className={styles.card}>
      <Card.Img
        variant="top"
        className={styles.card_img}
        src={
          course.thumbnail?.type === "cdn"
            ? `/cdn/${course.thumbnail.value}`
            : course.thumbnail.value
        }
      />

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
        <Card.Text className={styles.price}>
          {new Intl.NumberFormat("vi-VI", {
            style: "currency",
            currency: "VND",
          }).format(course.price)}
        </Card.Text>
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
