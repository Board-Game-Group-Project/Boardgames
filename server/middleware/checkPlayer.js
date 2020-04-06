
module.exports = (req, res, next) => {
  console.log('hit checkPlayer')
  if (req.session.player) {
      return res.status(200).send(req.session.player)
  } else {
      next()
  }
}
