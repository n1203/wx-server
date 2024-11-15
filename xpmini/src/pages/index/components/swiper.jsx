import React from "react";
import { Swiper } from "@nutui/nutui-react-taro";

export default ({ style }) => {
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
      {style?.options?.map((item, index) => (
        <Swiper.Item key={item}>
          <img
            width="100%"
            height="100%"
            onClick={() => console.log(index)}
            src={item?.image}
            alt=""
          />
        </Swiper.Item>
      ))}
    </Swiper>
  );
};
