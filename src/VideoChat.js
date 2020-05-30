import React, { useState, useCallback } from 'react'

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
  return <div></div> // we'll build up our response later
}

export default VideoChat
