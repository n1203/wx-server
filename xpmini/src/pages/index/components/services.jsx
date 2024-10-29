import { Image, Text, View } from "@tarojs/components";

const Buttons = [
  {
    src: "https://malimawaicode.oss-cn-hangzhou.aliyuncs.com/pic/template/791ecba3-5ff4-4f4c-bd0c-fcaeb70bf0f6.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_300/quality,q_100",
  },
  {
    src: "https://malimawaicode.oss-cn-hangzhou.aliyuncs.com/pic/template/791ecba3-5ff4-4f4c-bd0c-fcaeb70bf0f6.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_300/quality,q_100",
  },
  {
    src: "https://malimawaicode.oss-cn-hangzhou.aliyuncs.com/pic/template/791ecba3-5ff4-4f4c-bd0c-fcaeb70bf0f6.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_300/quality,q_100",
  },
];

export default () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        overflow: "hidden",
        gap: "8px",
      }}
    >
      {Buttons.map((item) => (
        <View
          style={{ display: "flex", flexDirection: "column", width: "50%" }}
        >
          <Image
            src={item.src}
            style={{
              height: "68px",
              width: "100%",
            }}
          />
        </View>
      ))}
    </View>
  );
};
