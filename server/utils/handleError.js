
module.exports = function (res, err) {
  console.error(err)

  res.status(500)
  res.send({ message: "an error has occurred" })
}
