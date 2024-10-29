import { Location } from "@nutui/icons-react-taro";
import { Tag } from "@nutui/nutui-react-taro";
import { Image, Text, View } from "@tarojs/components";
import SvgLogoText from "../../../assets/logo-text.svg";
export default function Header() {
  return (
    <View
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "16px",
        gap: "16px",
        position: "sticky",
        top: "0",
        zIndex: "100",
        backgroundColor: "#DDFCF6",
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
          padding: "4px 8px",
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
          江西新能源科技职业学院
        </Text>
      </View>
    </View>
  );
}
