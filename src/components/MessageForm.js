import request from 'api/request';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { setMessages } from 'redux/actions/users';

const MessageForm = () => {
  const [text, setText] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const { id } = useParams()
  const messages = useSelector(({user}) => user.messages)
  const dispatch = useDispatch()

  const sendMessage = (e) => {
    e.preventDefault();

    if (!text.trim().length || isSubmitting) return;

    setSubmitting(true)
    request('messages', {
      method: 'POST',
      data: {
        message: text,
        receiverId: id,
      },
    }).then(({ data }) => {
      setText('')
      dispatch(setMessages([...messages, data.message]))
    })
    .catch(() => toast.error('Failed to send message'))
    .finally(() => setSubmitting(false))
  }


  return (
    <form onSubmit={sendMessage} className='d-flex'>
      <Form.Control
        value={text}
        className='mr-2'
        onChange={(e) => setText(e.target.value)}
        placeholder='Type your message'
      />
      <Button variant="primary" type="submit" disabled={isSubmitting}>Send</Button>
    </form>
  )
}

export default MessageForm
