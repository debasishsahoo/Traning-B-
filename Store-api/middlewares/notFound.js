const notFound = (req, res) => {
    res.status(404).send(`${req.originalUrl} dose not Exist`);
}

module.exports = notFound;