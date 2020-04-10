module.exports = {
    getScoreboard: async (req,res) => {
        const db = req.app.get('db').scoreboard;
        const {id} = req.body
         let data =  await db.get_scoreboard([id])
         console.log(data)
         return res.send(data).status(200)
    },
}