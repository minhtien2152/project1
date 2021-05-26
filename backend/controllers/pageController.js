const Page = require('../models/pageModel');
const base = require('./baseController');



exports.updatePage = base.updateOne(Page);
exports.deletePage = base.deleteOne(Page);
exports.createPage = base.createOne(Page);
exports.getOne = base.getOne(Page);
exports.getPages = base.getAll(Page)
