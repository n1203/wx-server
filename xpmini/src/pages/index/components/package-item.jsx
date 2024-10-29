import { Alarm } from "@nutui/icons-react-taro";
import { Button, Tag } from "@nutui/nutui-react-taro";
import { View, Image, Text, Icon } from "@tarojs/components";
import dayjs from "dayjs";

const PackageItem = ({ item }) => {
  return (
    <View
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #F5F5F5",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ borderBottom: "1px solid #F5F5F5" }}>
        <Header item={item} />
      </View>
      <Body item={item} />
      <Footer item={item} />
    </View>
  );
};

const Body = ({ item }) => {
  return (
    <View style={{ padding: "12px" }}>
      <Text
        style={{
          fontSize: "14px",
          color: "#666",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        [订单信息已隐藏]
      </Text>
      <View
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexWrap: "wrap",
          backgroundColor: "#F5F5F5",
          padding: "8px",
          borderRadius: "4px",
          marginTop: "8px",
        }}
      >
        <Tag type="success" size="small">
          送
        </Tag>
        <Text style={{ fontSize: "12px", color: "#666" }}>{item.address}</Text>
      </View>
    </View>
  );
};

const Footer = ({ item }) => {
  return (
    <View
      style={{
        padding: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        <Text style={{ fontSize: "12px", color: "#666" }}>共1件商品</Text>
        <Text style={{ fontSize: "16px", fontWeight: 800, color: "#FF4500" }}>
          ￥100
        </Text>
      </View>
      <Button type="primary" size="small">
        接单 {dayjs(item.dataTime).format("HH:mm")} 截止
      </Button>
    </View>
  );
};

const Header = ({ item }) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px",
        backgroundColor: "#Fbfcee",
      }}
    >
      <Image
        src={item.src}
        style={{ width: "24px", height: "24px", borderRadius: "24px" }}
      />
      <Tag
        type="success"
        size="small"
        background="#E8FCF0"
        color="green"
        style={{
          borderRadius: "4px",
          fontSize: "12px",
          padding: "4px 8px",
          height: "20px",
        }}
      >
        {item.type}
      </Tag>
      <View
        style={{
          flex: 1,
        }}
      />
      <Text
        style={{
          fontSize: "14px",
          color: "#666",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Alarm />
        {dayjs(item.dataTime).format("HH:mm")} 截止
      </Text>
      <Tag type="primary" size="small">
        {item.type}
      </Tag>
    </View>
  );
};

export default PackageItem;
