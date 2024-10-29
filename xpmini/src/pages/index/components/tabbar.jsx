import { Category } from "@nutui/icons-react-taro";
import { Cart } from "@nutui/icons-react-taro";
import { User } from "@nutui/icons-react-taro";
import { Find } from "@nutui/icons-react-taro";
import { Home } from "@nutui/icons-react-taro";
import { Tabbar } from "@nutui/nutui-react-taro";

export default () => {
  return (
    <Tabbar
      style={{
        position: "sticky",
        bottom: "0",
        width: "100%",
      }}
      inactiveColor="#7d7e80"
      activeColor="#5CD9C1"
      onSwitch={(value) => {
        console.log(value);
      }}
    >
      <Tabbar.Item title="首页" icon={<Home size={18} />} value={9} />
      <Tabbar.Item title="订单大厅" icon={<Find size={18} />} />
      <Tabbar.Item title="我的" icon={<User size={18} />} />
    </Tabbar>
  );
};
