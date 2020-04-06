const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db").auth
    const { username, password } = req.body
    
    let player = await db.check_player(username)
    player = player[0]
    if (!player) {
      return res.status(404).send("Username not found")
    }

    const authenticated = bcrypt.compareSync(password, player.password)
    if (authenticated) {
      delete player.password
      req.session.player = player
      return res.status(202).send(req.session.player)
    } else {
      return res.status(404).send("Incorrect username or password")
    }
  },
  register: async (req, res) => {
    const db = req.app.get("db").auth
    const { username, email, password } = req.body

    let player = await db.check_player(username)
    player = player[0]
    if (player) {
      return res.status(409).send("Username already exists")
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    try {
      let newPlayer = await db.register_player({ username, hash, email })
      newPlayer = newPlayer[0]
      req.session.player = newPlayer
      return res.status(201).send(req.session.player)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  edit: async (req, res) => {
    const db = req.app.get("db").auth
    const { username, email } = req.body
    const { id } = req.params

    let player = await db.check_player(username)
    if (player[0] && player[0].username !== username) {
        return res.status(409).send("Username already exists.")
    }

    let editedPlayer = await db.edit_player({ id, username, email })
    editedPlayer = editedPlayer[0]
    if (editedPlayer) {
      req.session.player = editedPlayer
      return res.status(202).send(req.session.player)
    } else {
      return res.status(500).send("Unable to edit account information.")
    }
  },
  delete: async (req, res) => {
    // console.log("hit delete")
    const db = req.app.get("db").auth
    const { username, password } = req.body
    const { id } = req.params
    
    let player = await db.check_player(username)
    player = player[0]
    if (!player) {
      return res.status(404).send("Username not found")
    }
    
    const authenticated = bcrypt.compareSync(password, player.password)
    if (authenticated) {
      delete player.password
      await db.delete_player(id)
      return res.sendStatus(200)
    } else {
      return res.status(500).send("Unable to delete account information. Please try again.")
    }
  },
  logout: (req, res) => {
    // console.log("hit logout")
    if (req.session) {
      req.session.destroy()
    }
    return res.sendStatus(200)
  }
};

