function increment(req, res, next) {
    let current_id = req.header("current-id")

    if (!current_id) return res.status(401).json({ message: "No current id, access denied." })

    req.next_id = current_id + 1
    next()
}