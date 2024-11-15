import { useAutoRequest } from "alova/client";
import { orderApi } from "../../../endpoint";
import PackageItem from "./package-item";
import {
  Button,
  ConfigProvider,
  Empty,
  Loading,
} from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { useMemo } from "react";

export default function Packages({ data }) {
  const listElements = useMemo(() => {
    return data?.map((item) => <PackageItem key={item.orderNo} item={item} />);
  }, [data]);

  // if (list.loading) {
  //   return (
  //     <View className="py-8 flex justify-center items-center">
  //       <ConfigProvider theme={{ nutuiLoadingIconSize: "28px" }}>
  //         <Loading type="spinner" />
  //       </ConfigProvider>
  //     </View>
  //   );
  // }

  if (data?.length === 0) {
    return (
      <Empty status="error" description="加载失败" className="rounded-lg">
        {/* <View className="h-2"></View>
        <Button
          icon="refresh"
          type="success"
          size="small"
          loading={list.loading}
          onClick={() => list.send()}
        >
          重试
        </Button> */}
      </Empty>
    );
  }

  return <View className="flex flex-col gap-2">{listElements}</View>;
}
