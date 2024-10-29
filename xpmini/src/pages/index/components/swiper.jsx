import React from "react";
import { Swiper } from "@nutui/nutui-react-taro";

const list = [
  "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
  "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
  "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
  "https://storage.360buyimg.com/jdc-article/fristfabu.jpg",
];

export default () => {
  return (
    <Swiper
      defaultValue={1}
      autoPlay
      indicator
      onChange={() => {}}
      style={{
        borderRadius: "16px",
        height: "100px",
        background: "#fff",
      }}
    >
      {list.map((item, index) => (
        <Swiper.Item key={item}>
          <img
            width="100%"
            height="100%"
            onClick={() => console.log(index)}
            src={item}
            alt=""
          />
        </Swiper.Item>
      ))}
    </Swiper>
  );
};
