import { Location } from "@nutui/icons-react-taro";
import { Tag } from "@nutui/nutui-react-taro";
import { Image, Text, View } from "@tarojs/components";
import SvgLogoText from "../../../assets/logo-text.svg";
import { useRequest } from "alova/client";
import { orderApi } from "../../../endpoint";

export default function Header() {
  const scrollInfo = useRequest(orderApi.info);
  const schoolName = scrollInfo.data?.schoolName;
  const home = scrollInfo.data?.customPage.home || {};

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        gap: "16px",
        right: "0",
        position: "fixed",
        top: "0",
        left: 0,
        zIndex: "100",
      }}
    >
      <Image
        src={SvgLogoText}
        style={{
          width: "83.94px",
          height: "28px",
        }}
      />
      <Tag
        type="success"
        style={{
          padding: "0px 8px",
          height: "24px",
          borderRadius: "12px",
        }}
      >
        ⚡️ 最快 1 小时送达
      </Tag>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginLeft: "auto",
        }}
      >
        <Location />
        <Text
          style={{
            fontSize: "14px",
            color: "#333",
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {schoolName}
        </Text>
      </View>
    </View>
  );
}
