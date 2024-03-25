import React, { Component } from 'react';

class CometChat extends Component {
  componentDidMount() {
    this.loadCometChatScript(() => {
      this.initializeCometChat();
    });
  }

  loadCometChatScript(callback) {
    const script = document.createElement('script');
    script.src = 'https://widget-js.cometchat.io/v3/cometchatwidget.js';
    script.defer = true;
    script.onload = () => callback();
    document.body.appendChild(script);
  }

  initializeCometChat() {
    window.CometChatWidget.init({
      "appID": "24883762280afdf7",
      "appRegion": "us",
      "authKey": "4041814a5efc490013934431c8e39554d614af4a"
    }).then(response => {
      console.log("Initialization completed successfully");
      // You can now call login function.
      window.CometChatWidget.login({
        "uid": "aayj5dgqqxm2h8examuuktcqlnd2"
      }).then(response => {
        window.CometChatWidget.launch({
          "widgetID": "a3b0ffed-995d-4f05-a55c-3845ec96bbc8",
          "docked": "true",
          "alignment": "right", //left or right
          "roundedCorners": "true",
          "height": "450px",
          "width": "400px",
          "defaultID": 'superhero1', //default UID (user) or GUID (group) to show,
          "defaultType": 'user' //user or group
        });
      }, error => {
        console.log("User login failed with error:", error);
        // Check the reason for error and take appropriate action.
      });
    }, error => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    });
  }

  render() {
    return (
      <div id="cometchat-widget">
        {/* You can add any placeholder content here */}
      </div>
    );
  }
}

export default CometChat;
