const categoryModel = require("../models/categoryModel");
const APIFeatures = require("../utils/apiFeatures");
const Course = require("../models/course.model");
exports.returnMedia = async (req, res, next) => {
  try {
    const { limit, sort, page, populate, keyword, lt, gt, ...rest } = req.query;

    const sortAndPaginate = { limit, sort, page };
    let features;
    let searchPrice = {};
    if (lt) {
      searchPrice = { ...searchPrice, $lt: lt };
    }
    if (gt) {
      searchPrice = { ...searchPrice, $gt: gt };
    }
    if (gt || lt) {
      searchPrice = { price: { ...searchPrice } };
    }

    if (keyword) {
      features = new APIFeatures(
        Course.find({
          ...rest,
          $text: { $search: `\"${keyword}\"` },
          ...searchPrice,
        }).populate(populate),
        sortAndPaginate
      )
        .sort()
        .paginate();
    } else {
      Course = new APIFeatures(
        Course.find({ ...rest }).populate(populate),
        sortAndPaginate
      )
        .sort()
        .paginate();
    }

    const doc = await features.query;
    const elements = doc.map((rs, i) => {
      return {
        title: rs.title,
        image_url: rs.thumbnail.value,
        subtitle: `Giá: ${new Intl.NumberFormat("vi-VI", {
          style: "currency",
          currency: "VND",
        }).format(rs.price)}`,
        default_action: {
          type: "web_url",
          url: rs.url,
          webview_height_ratio: "full",
        },
        buttons: [
          {
            type: "web_url",
            url: rs.url,
            title: "Đi đến trang khóa học",
          },
          {
            type: "postback",
            title: "Tôi sẽ học được gì?",
            payload: `/ask_for_course_knowledge{"course_no":"${i}"}`,
          },
        ],
      };
    });
    if (doc.length > 0)
      res.status(200).json({
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: elements,
            },
          },
        },
        results: doc.length,
        data: doc,
      });
    else
      res.status(200).json({
        message: { text: "Hiện tôi không có khóa học nào về chủ đề này" },
        results: 0,
        data: null,
      });
  } catch (error) {
    next(error);
  }
};

exports.quickReply = async (req, res, next) => {
  try {
    const cats = await categoryModel.find({});

    const quick_replies = cats.map((cat) => {
      return {
        content_type: "text",
        title: cat.name,
        payload: `/inform_category{"category_id":"${cat._id}"}`,
      };
    });

    // res.status(200).json({ quick_replies: quick_replies });
    res.status(200).json({
      text: "Hãy nêu chủ đề bạn muốn tìm kiếm:",
      quick_replies: quick_replies,
    });
  } catch (error) {
    next(error);
  }
};

exports.randomCourse = async (req, res, next) => {
  try {
    const randomCourse = await Course.aggregate([{ $sample: { size: 3 } }]);
    const elements = randomCourse.map((rs, i) => {
      return {
        title: rs.title,
        image_url: rs.thumbnail.value,
        subtitle: `Giá: ${new Intl.NumberFormat("vi-VI", {
          style: "currency",
          currency: "VND",
        }).format(rs.price)}`,
        default_action: {
          type: "web_url",
          url: rs.url,
          webview_height_ratio: "full",
        },
        buttons: [
          {
            type: "web_url",
            url: rs.url,
            title: "Đi đến trang khóa học",
          },
          {
            type: "postback",
            title: "Tôi sẽ học được gì?",
            payload: `/ask_for_course_knowledge{"course_no":"${i}"}`,
          },
        ],
      };
    });

    res.status(200).json({
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: elements,
          },
        },
      },
      results: randomCourse.length,
      data: randomCourse,
    });
  } catch (error) {
    next(error);
  }
};

exports.categoryCourse = async (req, res, next) => {
  try {
    const randomCourse = await Course.aggregate([
      { $match: { category: req.params.id } },
      { $sample: { size: 3 } },
    ]);
    const elements = randomCourse.map((rs, i) => {
      return {
        title: rs.title,
        image_url: rs.thumbnail.value,
        subtitle: `Giá: ${new Intl.NumberFormat("vi-VI", {
          style: "currency",
          currency: "VND",
        }).format(rs.price)}`,
        default_action: {
          type: "web_url",
          url: rs.url,
          webview_height_ratio: "full",
        },
        buttons: [
          {
            type: "web_url",
            url: rs.url,
            title: "Đi đến trang khóa học",
          },
          {
            type: "postback",
            title: "Tôi sẽ học được gì?",
            payload: `/ask_for_course_knowledge{"course_no":"${i}"}`,
          },
        ],
      };
    });

    if (randomCourse.length > 0)
      res.status(200).json({
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: elements,
            },
          },
        },
        results: randomCourse.length,
        data: randomCourse,
      });
    else
      res.status(200).json({
        message: { text: "Hiện tôi không có khóa học nào về chủ đề này" },
        results: 0,
        data: null,
      });
  } catch (error) {
    next(error);
  }
};
