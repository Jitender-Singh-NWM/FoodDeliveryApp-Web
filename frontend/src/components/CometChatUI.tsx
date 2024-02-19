import { CometChatUsersWithMessages, CometChatGroupsWithMessages, CometChatConversationsWithMessages, CometChatTabs } from "@cometchat/chat-uikit-react";
import { TabAlignment, CometChatTabItem } from "@cometchat/uikit-resources";
import { BaseStyle, TabItemStyle } from "@cometchat/uikit-shared";
import React, { useEffect } from "react";
import { useState } from "react";
//import usersTabIcon from "https://data-eu.cometchat.io/avatars/photo123.jpg";
//mport groupsTabIcon from "./assets/groups.svg";
//import chatsTabIcon from "./assets/chats.svg";

export function CometChatUI() {

  const [isMobileView, setIsMobileView] = useState(false);
	const tabItemStyle = new TabItemStyle({
      iconTint: "#39f",
      width: "80px",
      height: "auto",
      activeBackground: "#39f",
      activeIconTint: "white",
      activeTitleTextColor: "white"
  });

	const tStyle = new BaseStyle({
    border: "1px solid red",
    width: "270px",
    height: "36px",
    background: "#fff"
	})

	const chatsTab = new CometChatTabItem({
	    id: "chats",
	    title: "Chats",
			iconURL: "https://data-eu.cometchat.io/avatars/photo123.jpg",
			style: tabItemStyle,
			isActive: true,
	    childView: <CometChatConversationsWithMessages isMobileView={isMobileView} />
	});

	const usersTab = new CometChatTabItem({
	    id: "users",
	    title: "Users",
			iconURL: "https://data-eu.cometchat.io/avatars/photo123.jpg",
			style: tabItemStyle,
	    childView: <CometChatUsersWithMessages isMobileView={isMobileView} />
	});

	const groupsTab = new CometChatTabItem({
	    id: "groups",
	    title: "Groups",
	    iconURL: "https://data-eu.cometchat.io/avatars/photo123.jpg",
			style: tabItemStyle,
	    childView: <CometChatGroupsWithMessages isMobileView={isMobileView} />
	});

	const tabs = [chatsTab, usersTab, groupsTab];
                                         
  const resizeWindow = () => {
    innerWidth = window.innerWidth;
    if (innerWidth >= 320 && innerWidth <= 767)
    {
    	setIsMobileView(true);
    } else {
    	setIsMobileView(false);
    }
  };   
                                         
  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

	return (
	    <div style={{width: "800px", height: "500px", margin: "24px auto"}}>
				<CometChatTabs tabAlignment={TabAlignment.bottom} tabs={tabs} tabsStyle={tStyle} />
			</div>
	);
}
export default CometChatUI;
