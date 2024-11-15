import { SafeArea } from "@nutui/nutui-react-taro";
import { Image, ScrollView, View } from "@tarojs/components";
import { useRequest } from "alova/client";
import { useState } from "react";
import { orderApi } from "../endpoint";

export default function Layout({ children, ...props }) {
  const scrollInfo = useRequest(orderApi.info);
  const [refresherTriggered, setRefresherTriggered] = useState(false);
  const home = scrollInfo.data?.customPage.home || {};

  return (
    <View
      style={{
        background:
          home?.background || "linear-gradient(0deg, #FFF 0%, #DDFCF6 100%)",
        height: "calc(100vh - 60px)",
        overflow: "hidden",
        paddingTop: "60px",
        paddingBottom: "100px",
      }}
    >
      <Image
        src="https://xpqk-2024.oss-cn-hangzhou.aliyuncs.com/pic/4823595e-6551-4d36-85c0-b0e6f1a13ce4.webp"
        style={{
          width: "100%",
          height: `${home?.titleBar?.topBgHeight || 200}px`,
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          zIndex: 0,
        }}
      />
      <SafeArea position="top" />
      <ScrollView
        scrollY
        scrollWithAnimation
        enableBackToTop
        refresherEnabled
        refresherThreshold={100}
        // upperThreshold={100}
        refresherBackground={home?.background}
        enhanced
        // refresherTriggered
        enablePassive
        scrollIntoViewWithinExtent
        lowerThreshold={100}
        onRefresherPulling={() => {
          setRefresherTriggered(true);
          setTimeout(() => {
            setRefresherTriggered(false);
          }, 1000);
        }}
        style={{
          flex: "1",
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {refresherTriggered && <View>Refresher</View>}
        {children}
      </ScrollView>
      <SafeArea position="bottom" />
    </View>
  );
}
