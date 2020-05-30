import React, { useState, useCallback } from 'react'
import Lobby from './Lobby'

const VideoChat = () => {
  const [username, setUsername] = useState('')
  const [roomname, setRoomname] = useState('')
  const [token, setToken] = useState(null)

  const handleUsernameChange = useCallback(e => {
    setUsername(e.target.value)
  }, [])
  const handleRoomnameChange = useCallback(e => {
    setRoomname(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault()
      const data = await fetch('/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          room: roomname,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
      setToken(data.token)
    },
    [username, roomname]
  )

  const handleLogout = useCallback(event => {
    setToken(null)
  }, [])
  let render
  if (token) {
    render = (
      <div>
        <p>Username: {username}</p>
        <p>Room name: {roomname}</p>
        <p>Token: {token}</p>
      </div>
    )
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomname}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomnameChange}
        handleSubmit={handleSubmit}
      />
    )
  }
  return render
}

export default VideoChat
