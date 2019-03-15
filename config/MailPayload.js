module.exports = msg => {
  return `
<html>
    <body>
    <h2>New notification<h3>
    <h4>What happend?</h4>
    <p>${msg.action}</p>
    <h4>From?<h4>
    <p>${msg.login}</p>
    <h4>on what repo?</h4>
    <p>${msg.repo}<p>
    <p>${msg.time}</p>
    </body>
</html>
`
}
