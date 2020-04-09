module.exports = {
    getScoreboard: (req,res) => {
        const db = req.app.get('db').scoreboard;
        const {id} = req.body
        db.get_scoreboard((id)).then(()=> {
            res.send().status(200)
        }).catch(err => console.log(err))
        
          
        
    },
}