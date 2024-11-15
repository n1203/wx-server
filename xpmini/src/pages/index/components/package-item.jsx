import { Alarm } from "@nutui/icons-react-taro";
import { Button, Tag } from "@nutui/nutui-react-taro";
import { View, Image, Text, Icon } from "@tarojs/components";
import dayjs from "dayjs";

const STATUS_MAP = {
  1: "待接单",
  2: "进行中",
  3: "待送达",
  4: "已完成",
};

const STATUS_COLOR_MAP = {
  1: "#FF4500",
  2: "#FFA500",
  3: "#008000",
  4: "#008000",
};

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
        <Tag
          type="success"
          size="small"
          style={{
            backgroundColor: item?.priceDetails?.endAddressOptions?.dotColor,
          }}
        >
          {item?.priceDetails?.endAddressOptions?.dotText}
        </Tag>
        <Text style={{ fontSize: "12px", color: "#666" }}>
          {item?.endAddress?.province}-{item?.endAddress?.city}-
          {item?.endAddress?.district}-{item?.endAddress?.schoolBuild?.area}-
          {item?.endAddress?.schoolBuild?.build}-
          {item?.endAddress?.schoolBuild?.detail}-
          {item?.endAddress?.mobileNumber}
        </Text>
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
      <View style={{ display: "flex", alignItems: "flex-end" }}>
        <Text style={{ fontSize: "12px", color: "#666" }}>总价：</Text>
        <Text style={{ fontSize: "16px", fontWeight: 800, color: "#FF4500" }}>
          ￥{item?.priceDetails?.totalPrice || 0}
        </Text>
      </View>
      {item.status === 1 && (
        <Button type="primary" size="small">
          接单 {item.deadlineTime} 截止
        </Button>
      )}
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
        src={item.avatarUrl}
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
        {item.orderType}
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
        {item?.createTimeLocal}
      </Text>
      <Tag
        size="small"
        style={{
          backgroundColor: STATUS_COLOR_MAP[item.status],
          padding: "2px 4px",
          fontSize: "12px",
        }}
      >
        {STATUS_MAP[item.status]}
      </Tag>
    </View>
  );
};

export default PackageItem;
