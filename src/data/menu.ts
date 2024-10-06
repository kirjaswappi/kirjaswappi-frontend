import home from "../assets/material-symbols_book-outline.svg";
import message from "../assets/message.svg";
import profile from "../assets/profile.svg";
import map from "../assets/uiw_map.svg";

export const menu = [
    {
      id: 1,
      icon: home,
    //   selected: home,
      value: "Books",
      route: "/",
      isRoute: true,
    },
    {
      id: 2,
      icon: map,
    //   selected: store,
      value: "Map",
      route: "/map",
      isRoute: true,
    },
    {
      id: 3,
      icon: message,
    //   selected: category,
      value: "Message",
      route: "/message",
      isRoute: true,
    },
    {
      id: 5,
      icon: profile,
      selected: profile,
      value: "Profile",
      route: "/profile",
      isRoute: true,
    },
  ];
  