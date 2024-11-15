import React from "react";
import Header from "./components/header";
import Swiper from "./components/swiper";
import { View } from "@tarojs/components";
import Tabbar from "./components/tabbar";
import Services from "./components/services";
import Layout from "../../conponents/layout";
import Packages from "./components/packages";
import { orderApi } from "../../endpoint";
import { useRequest } from "alova/client";
import { Notice } from "./components/notice";
import { Loading } from "@nutui/icons-react-taro";
import { ConfigProvider } from "@nutui/nutui-react-taro";

function Index() {
  const scrollInfo = useRequest(orderApi.info);
  console.log(scrollInfo.loading);
  return (
    <>
      <Header />
      <Layout>
        {scrollInfo?.loading ? (
          <View key="loading" className="py-8 flex justify-center items-center">
            <ConfigProvider theme={{ nutuiLoadingIconSize: "28px" }}>
              <Loading type="spinner" />
            </ConfigProvider>
          </View>
        ) : (
          <View
            key="contents"
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              paddingTop: "0",
              minHeight: "calc(100vh - 48px - 88px)",
            }}
          >
            {scrollInfo.data?.pageData?.data?.map((widget) => {
              switch (widget.type) {
                case "notice":
                  return <Notice style={widget?.style} />;
                case "swiper":
                  return <Swiper style={widget?.style} />;
                case "sideByImages":
                  return <Services />;
                case "orderNew":
                  return <Packages data={widget?.data} />;
                default:
                  return "no widget";
              }
            })}
            {/* <Swiper />
          <Services />
          <Packages /> */}
          </View>
        )}
      </Layout>
      <Tabbar />
    </>
  );
}

export default Index;
