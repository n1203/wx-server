import { defineConfig } from '@tarojs/cli'
import devConfig from './dev'
import prodConfig from './prod'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'xpmini',
    date: '2024-10-29',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
      ['@tarojs/plugin-html', {
      }],
      ['taro-plugin-tailwind', {
        // 具体参数为 tailwind postcss 配置项，见：https://github.com/tailwindlabs/tailwindcss/blob/master/types/config.d.ts#L352
        scan: {
          dirs: ['./src'], // 只扫描 src 目录下的文件
          exclude: ['dist/**/*'], // 排除 dist 目录
        },
      }]
    ],
    defineConstants: {
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'react',

    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false
      }
    },
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },

    // compiler: {
    //   vitePlugins: [
    //     vitePluginImp({
    //       libList: [
    //         {
    //           libName: '@nutui/nutui-react-taro',
    //           style: (name) => {
    //             return `@nutui/nutui-react-taro/dist/esm/${name}/style/css`
    //           },
    //           replaceOldImport: false,
    //           camel2DashComponentName: false,
    //         }
    //       ]
    //     }),
    //     {
    //       // 通过 vite 插件加载 postcss,
    //       name: 'postcss-config-loader-plugin',
    //       config(config) {
    //         // 加载 tailwindcss
    //         if (typeof config.css?.postcss === 'object') {
    //           config.css?.postcss.plugins?.unshift(tailwindcss())
    //         }
    //       },
    //     },
    //   ],
    //   type: 'vite'
    // },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: ['nut-'],
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',

      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
