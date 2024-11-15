import { NoticeBar } from "@nutui/nutui-react-taro";

export const Notice = ({ style }) => {
  console.log("🚀 ~ Notice ~ style:", style);
  return (
    <NoticeBar
      direction="vertical"
      list={style?.options.map((v) => v?.title)}
      speed={10}
      duration={1000}
      height={style.height / 2}
      onClick={(e) => {
        go(e.target.innerHtml);
      }}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        background: style.background,
      }}
      leftIcon={null}
    />
  );
};
