import Utils from "Utils/utils";

const utils = new Utils();

export default async function handler(req, res) {
    if (req.query.type === 'tag') {
        const resData = await utils.getProductByTagId(req.query.id);
        console.log(resData);

        const ids = resData.map(item => item.id);
        res.status(200).json({data: ids});
    } else if (req.query.type === 'category') {
        res.status(200).json({data: []});
    } else if (req.query.type === "id") {
        res.status(200).json({data: []});
    }
}
