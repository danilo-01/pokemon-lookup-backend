const notFound = (err, req, res, next) => {
    if(err){
        console.log(err);
        return res.status(err.status).json({
            "message" : err.message,
        })
    }
    return res.status(404).json({
        "message" : "Endpoint not found"
    })
}

module.exports = notFound;