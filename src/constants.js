export const ACTIONS = {
  CONNECT: [
    {
        buttonText: 'Connect',
        handler: 'connect',
        status: 'CONNECT',
    }
  ],
  REQUEST_SENT: [
      {
          buttonText: 'Decline',
          handler: 'decline',
          status: 'REQUEST_SENT',
      }
  ],
  REQUEST_RECEIVED: [
      {
          buttonText: 'Accept',
          handler: 'accept',
          status: 'REQUEST_RECEIVED',
      },
      {
          buttonText: 'Decline',
          handler: 'decline',
          status: 'REQUEST_RECEIVED',
      }
  ],
  CONNECTED: [
      {
          buttonText: 'Disconnect',
          handler: 'decline',
          status: 'CONNECTED',
      }
  ],
}
