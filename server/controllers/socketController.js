
module.exports = {

    join: (req,res) => {

    },
    queue: (req,res) => {
        let user = req.data
        console.log(user)
        res.sendStatus(200)
    }
}