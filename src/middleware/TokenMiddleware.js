module.exports = (req, res, next) => {
    let token = '';

    if (req.headers.authorization) {
        token = req.headers.authorization

        token = token.split(' ')[1];

        if (token === '' || token !== process.env.TOKEN) {
            res.json({
                message: 'Not authorized'
            })
        }
    }

    next();
}