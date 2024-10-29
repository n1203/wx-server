import { SafeArea } from "@nutui/nutui-react-taro";
import { ScrollView, View } from "@tarojs/components";
import { useState } from "react";

export default function Layout({ children }) {
  const [refresherTriggered, setRefresherTriggered] = useState(false);
  return (
    <View
      style={{
        background: "linear-gradient(0deg, #FFF 0%, #DDFCF6 100%)",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <SafeArea position="top" />
      <ScrollView
        scrollY
        scrollWithAnimation
        enableBackToTop
        refresherEnabled
        refresherThreshold={100}
        // upperThreshold={100}
        refresherBackground="#DDFCF6"
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
          height: "100vh",
        }}
      >
        {refresherTriggered && <View>Refresher</View>}
        {children}
      </ScrollView>
      <SafeArea position="bottom" />
    </View>
  );
}
