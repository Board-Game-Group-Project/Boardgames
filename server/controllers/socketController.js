module.exports = {
    getRoom: (req,res) => {
        const {room} = req.body
        res.status(200).send(room).catch(err => {
            console.log(err)
        })

    }

}