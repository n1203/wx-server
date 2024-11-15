import React, { useEffect } from 'react'
import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import '@nutui/icons-react-taro'
import 'alova'
import 'alova/client'

// 全局样式
import './app.css'

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => { })

  // 对应 onShow
  useDidShow(() => { })

  // 对应 onHide
  useDidHide(() => { })

  return props.children
}

export default App
