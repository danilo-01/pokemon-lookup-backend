const endpointNotFound = (req, res, next) => {
    return res.status(404).json({
        "message" : "Endpoint not found"
    })
}

module.exports = endpointNotFound;