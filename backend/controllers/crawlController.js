
const Page = require('../models/pageModel');
exports.crawlSingle = async ( req,res,next)=> {
    try {
    
        const page = await Page.findById(req.body.page_id)
        const crawler = require(`../uploads/script/unica1.js`)
        const result = await crawler.crawlSingle(req.body.url)
        res.status(200).json({
            status: 'success',
            data:result
        });


    } catch (error) {
        next(error);
    }
}