module.exports = {
    getScoreboard: async (req,res) => {
        const db = req.app.get('db').scoreboard;
        const {id} = req.body
         let data =  await db.get_scoreboard((id))
         return res.send(data).status(200)
    },
}