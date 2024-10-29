import React from "react";
import Layout from "./components/layout";
import Header from "./components/header";
import Swiper from "./components/swiper";
import { ScrollView, View } from "@tarojs/components";
import Tabbar from "./components/tabbar";
import Services from "./components/services";
import PackageItem from "./components/package-item";

function Index() {
  return (
    <Layout>
      <Header />
      <View
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingTop: "0",
        }}
      >
        <Swiper />
        <Services />
        <PackageItem
          item={{
            src: "https://malimawaicode.oss-cn-hangzhou.aliyuncs.com/pic/template/791ecba3-5ff4-4f4c-bd0c-fcaeb70bf0f6.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_300/quality,q_100",
            type: "快递代取",
            dataTime: "2024-10-29",
            address: "杭州市拱墅区",
          }}
        />
        <PackageItem
          item={{
            src: "https://malimawaicode.oss-cn-hangzhou.aliyuncs.com/pic/template/791ecba3-5ff4-4f4c-bd0c-fcaeb70bf0f6.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_300/quality,q_100",
            type: "快递代取",
            dataTime: "2024-10-29",
            address: "杭州市拱墅区",
          }}
        />
        <PackageItem
          item={{
            src: "https://malimawaicode.oss-cn-hangzhou.aliyuncs.com/pic/template/791ecba3-5ff4-4f4c-bd0c-fcaeb70bf0f6.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_300/quality,q_100",
            type: "快递代取",
            dataTime: "2024-10-29",
            address: "杭州市拱墅区",
          }}
        />
        <PackageItem
          item={{
            src: "https://malimawaicode.oss-cn-hangzhou.aliyuncs.com/pic/template/791ecba3-5ff4-4f4c-bd0c-fcaeb70bf0f6.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_300/quality,q_100",
            type: "快递代取",
            dataTime: "2024-10-29",
            address: "杭州市拱墅区",
          }}
        />
      </View>
      <Tabbar />
    </Layout>
  );
}

export default Index;
