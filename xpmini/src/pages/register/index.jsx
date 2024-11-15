import React, { useState } from "react";
import { Text, View } from "@tarojs/components";
import Layout from "../../conponents/layout";
import { Tag, Input, Button } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { noImmediate, userApis, smsApis } from "../../endpoint";
import { useRequest } from "alova/client";
import { useEffect } from "react";

function Index() {
  const [countdown, setCountdown] = useState(0);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const register = useRequest(userApis.register, noImmediate);
  const sendCode = useRequest(smsApis.sendCode, noImmediate);

  const handleSendCode = async () => {
    if (countdown > 0) return;
    if (!/^\d{11}$/.test(phone)) {
      Taro.showToast({
        title: "请输入正确的手机号",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    try {
      await sendCode.send({ mobileNumber: phone });
    } catch (error) {
      console.log(error);
    }
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRegister = async () => {
    if (!/^\d{11}$/.test(phone) || !/^\d{6}$/.test(code)) {
      Taro.showToast({
        title: "请输入正确的手机号和验证码",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    try {
      const res = await register.send({
        mobileNumber: phone,
        verifyCode: code,
      });
      console.log(res);
      if (res?.user?.userNo) {
        Taro.showToast({
          title: "注册成功",
          icon: "none",
          duration: 2000,
        });
        localStorage.setItem("userNo", res?.user?.userNo);
        Taro.switchTab({ url: "/pages/index/index" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userNo")) {
      Taro.switchTab({ url: "/pages/index/index" });
    }
  }, []);

  return (
    <Layout>
      <View
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <View style={{ padding: "36px" }}>
          <View style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Text style={{ fontSize: "36px", fontWeight: "bold" }}>Hello</Text>
            <Tag
              type="success"
              style={{ padding: "16px", fontSize: "24px", borderRadius: "8px" }}
            >
              新漂青年
            </Tag>
          </View>
          <Text style={{ fontSize: "36px", fontWeight: "bold" }}>
            👏 欢迎使用
          </Text>
        </View>
        <View
          style={{
            padding: "36px",
            backgroundColor: "#fff",
            borderRadius: "32px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <View
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: "16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Input
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e)}
              disabled={countdown > 0}
              style={{ backgroundColor: "#f5f5f5", fontSize: "18px" }}
            />
          </View>

          <View
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: "16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Input
              placeholder="请输入验证码"
              value={code}
              onChange={(e) => setCode(e)}
              style={{ backgroundColor: "#f5f5f5", fontSize: "18px" }}
            />
            <Text
              onClick={handleSendCode}
              style={{
                fontSize: "18px",
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: countdown > 0 ? "#999" : "#000",
              }}
            >
              {countdown > 0 ? `${countdown}s` : "获取验证码"}
            </Text>
          </View>

          <Button
            block
            size="xlarge"
            type="success"
            loading={register.loading}
            style={{ background: "#4fc08d", marginTop: "16px" }}
            onClick={handleRegister}
          >
            注册 / 登录
          </Button>
        </View>

        <View
          style={{ padding: "16px", marginTop: "16px", textAlign: "center" }}
        >
          <Text
            style={{ fontSize: "12px", color: "#999", textAlign: "center" }}
          >
            注册即表示同意
            <Text style={{ color: "#4fc08d" }}>《用户协议》</Text>和
            <Text style={{ color: "#4fc08d" }}>《隐私政策》</Text>
          </Text>
        </View>
      </View>
    </Layout>
  );
}

export default Index;
