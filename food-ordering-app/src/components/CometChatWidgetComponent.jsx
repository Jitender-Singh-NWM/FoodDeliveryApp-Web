import React, { useEffect } from 'react';
import { CometChat,CometChatWidget } from '@cometchat-pro/chat';
//import { CometChatUIKit } from "@cometchat/chat-uikit-react"; // Ensure you've installed CometChatPro JS SDK
import { CometChatUIKit,UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";

export const CometChatWidgetComponent = () => {
  useEffect(() => {
    const initCometChat = async () => {
      const COMETCHAT_CONSTANTS = {
        APP_ID: "24883762280afdf7", //Replace with your App ID
        REGION: "us", //Replace with your App Region
        AUTH_KEY: "4041814a5efc490013934431c8e39554d614af4a" //Replace with your Auth Key
        }
        
        //create the builder
        const UIKitSettings = new UIKitSettingsBuilder()
          .setAppId(COMETCHAT_CONSTANTS.APP_ID)
          .setRegion(COMETCHAT_CONSTANTS.REGION)
          .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
          .subscribePresenceForFriends()
          .build();
        
        //Initialize CometChat UIKit
        CometChatUIKit.init(UIKitSettings).then(() => {
          console.log("Initialization completed successfully");
          const UID = "superhero1"; //Replace with your UID
const authKeyn = "superhero1_17049024743de3abcbba72c6fc97faba831863ab"; //Replace with your Auth Key

CometChatUIKit.getLoggedinUser().then((user) => {
  if (!user) {
    //Login user
    CometChatUIKit.login(UID, authKeyn).then((user) => {
      console.log("Login Successful:", { user });
      //mount your app
    })
      .catch(console.log);
  } else {
    console.log("Login Eror:", { user });
    //mount your app
  }
});
          // You can now call login function.
        }).catch(console.log);
    };

    initCometChat();
  }, []);

  return (
    <div>
      {/* You can add any additional markup here if needed */}
      <h2>CometChat Widget</h2>
    </div>
  );
};

//export default CometChatWidgetComponent;
