"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let arrlist = common_vendor.reactive([{
      isSelf: true,
      text: "\u4F60\u597D\uFF0C\u6B22\u8FCE\u6765\u5230AI\u4E16\u754C\uFF0C\u6211\u53EF\u4EE5\u89E3\u7B54\u4F60\u7684\u95EE\u9898\uFF0C\u4E5F\u53EF\u4EE5\u966A\u4F60\u804A\u5929",
      image: "../../static/sgzn.png"
    }]);
    let srk = common_vendor.ref("");
    let childrenId = common_vendor.ref("");
    let swiperHeight = common_vendor.ref(0);
    common_vendor.ref(0);
    let ifs = common_vendor.ref(true);
    let ztl = common_vendor.ref(true);
    let ifsdansd = common_vendor.ref(false);
    common_vendor.onBeforeMount(() => {
      console.log("onBeforeMount\u751F\u547D\u5468\u671F");
      let port = common_vendor.index.getSystemInfoSync().platform;
      switch (port) {
        case "android":
          console.log("Android");
          break;
        case "ios":
          console.log("iOS");
          break;
        default:
          console.log("\u5C0F\u7A0B\u5E8F");
          ztl.value = false;
          break;
      }
      common_vendor.index.getSystemInfo({
        success: (res) => {
          swiperHeight.value = res.windowHeight - common_vendor.index.upx2px(160);
        }
      });
    });
    common_vendor.onMounted(() => {
      console.log("onMounted\u751F\u547D\u5468\u671F");
    });
    let subt = () => {
      if (srk.value == "" || ifs.value == false)
        return;
      arrlist.push({
        isSelf: false,
        text: srk.value,
        image: "../../static/ymw.png"
      });
      ifs.value = false;
      ifsdansd.value = true;
      common_vendor.index.request({
        url: "https://api.openai.com/v1/completions",
        method: "POST",
        header: {
          "Authorization": "Bearer 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"
        },
        data: {
          model: "text-davinci-003",
          max_tokens: 512,
          top_p: 1,
          temperature: 0.5,
          frequency_penalty: 0,
          presence_penalty: 0,
          prompt: srk.value
        },
        success: (res) => {
          arrlist.push({
            isSelf: true,
            text: res.data.choices[0].text,
            image: "../../static/sgzn.png"
          });
        },
        fail: (e) => {
          arrlist.push({
            isSelf: true,
            text: "\u7F51\u7EDC\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u518D\u5C1D\u8BD5...",
            image: "../../static/sgzn.png"
          });
        },
        complete() {
          ifs.value = true;
          ifsdansd.value = false;
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(arrlist), (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.text),
            c: "id-" + index,
            d: common_vendor.s(!item.isSelf ? "flex-direction: row-reverse;" : ""),
            e: index
          };
        }),
        b: common_vendor.unref(ifsdansd)
      }, common_vendor.unref(ifsdansd) ? {} : {}, {
        c: common_vendor.unref(childrenId),
        d: common_vendor.n(common_vendor.unref(ztl) ? "top44" : ""),
        e: common_vendor.unref(srk),
        f: common_vendor.o(($event) => common_vendor.isRef(srk) ? srk.value = $event.detail.value : srk = $event.detail.value),
        g: common_vendor.unref(srk) !== ""
      }, common_vendor.unref(srk) !== "" ? {
        h: common_vendor.o((...args) => common_vendor.unref(subt) && common_vendor.unref(subt)(...args))
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/Documents/HBuilderProjects/testjqr/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
