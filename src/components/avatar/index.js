import React from "react"

const avatars = [
  require("./images/ben-jamierusso.jpeg"),
  require("./images/ben-animated.gif"),
  require("./images/ben-aqua.jpg"),
  require("./images/ben-colored.jpg"),
  require("./images/ben-dreamify.jpg"),
  require("./images/ben-duotone.png"),
  require("./images/ben-highres.jpg"),
  require("./images/ben-smile-glasses.jpg"),
]

const randomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)]

class Avatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { avatar: randomAvatar() }
  }

  clickAvatar = () => {
    this.setState({
      avatar: randomAvatar(),
    })
  }

  componentDidMount() {
    setInterval(() =>
      this.setState({
        avatar: randomAvatar(),
      }),
      2000
    );
  }

  render() {
    return (
      <img
        style={{
          width: "256px",
          height: "256px",
          borderRadius: "128px",
          boxShadow: "10px 10px 20px #e5e5e5",
          cursor: "crosshair",
          display: "block",
          verticalAlign: "middle",
        }}
        src={this.state.avatar}
        alt="avatar"
        onClick={this.clickAvatar}
      />
    )
  }
}

export default Avatar
