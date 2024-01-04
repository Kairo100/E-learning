import React from 'react';
import { FacebookProvider, MessageUs } from 'react-facebook';

const FacebookChat = () => {
  return (
    <FacebookProvider appId="YOUR_APP_ID">
      <MessageUs messengerAppId="YOUR_MESSENGER_APP_ID" pageId="YOUR_PAGE_ID" />
    </FacebookProvider>
  );
};

export default FacebookChat;