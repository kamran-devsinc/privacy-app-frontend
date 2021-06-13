import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import request from 'api/request'
import { setMessages } from 'redux/actions/users';
import MessageForm from './MessageForm';
import { Row, Col } from 'react-bootstrap'

const Messages = () => {
  const { id } = useParams()
  const messages = useSelector(({ user }) => user.messages)
  const dispatch = useDispatch()

  useEffect(() => {
    request(`messages/chats/${id}`).then(({ data }) => {
      dispatch(setMessages(data.chat))
    }).catch((err) => {
      toast.error('Failed to fetch messages')
    })

    return () => dispatch(setMessages([]))
  }, [id])

  return (
    <>
      <h5>Messages</h5>
      <div style={{ minHeight: '65vh', overflowY: 'scroll', overflowX: 'hidden' }}>
        {
          messages.map((message) => (
            <Row key={message._id}>
              <Col className='col-3'><h5>{message.sender.name}</h5></Col>
              <Col className='col-9'>
                <p>{ message.text }</p>
              </Col>
            </Row>
          ))
        }
      </div>
      <MessageForm />
    </>
  )
}

export default Messages
