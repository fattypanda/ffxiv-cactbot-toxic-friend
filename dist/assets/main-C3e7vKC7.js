import { d as defineComponent, r as ref, c as computed, i as createBlock, w as withCtx, a as openBlock, f as createBaseVNode, e as createVNode, b as createElementBlock, g as createTextVNode, F as Fragment, p as toDisplayString, q as withDirectives, v as vShow, h as renderList, T as Transition, t as toRaw, n as nextTick, E as ElButton, x as ElButtonGroup, y as createApp } from "./zh-cn-CoCz9NQl.js";
import { B as Bus, p as parsed15or16 } from "./Bus-BHiBqukI.js";
import { u as useRules, _ as _sfc_main$1 } from "./useRules-CZ0LXt7M.js";
const _hoisted_1 = { class: "container" };
const _hoisted_2 = { class: "header" };
const _hoisted_3 = { class: "left" };
const _hoisted_4 = { class: "right" };
const _hoisted_5 = { class: "body" };
const _hoisted_6 = { class: "first" };
const _hoisted_7 = { class: "row" };
const _hoisted_8 = { class: "others" };
const _hoisted_9 = { class: "row" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const {
      rules
    } = useRules();
    const running = ref(false);
    const show = ref(false);
    const logs = ref([]);
    const first = computed(() => {
      var _a;
      return ((_a = logs.value) == null ? void 0 : _a[0]) || "";
    });
    const others = computed(() => {
      return logs.value.slice(1);
    });
    function start() {
      running.value = true;
      const _rules = rules.value.filter((v) => v.use).map((v) => toRaw(v));
      bus.start(_rules);
    }
    function stop() {
      running.value = false;
      logs.value = [];
      bus.stop();
    }
    function restart() {
      stop();
      nextTick(() => {
        start();
      });
    }
    function setting() {
      const resize = 1;
      window.open(
        "./setting.html",
        "Toxic Friend Setting",
        `width=${1200 * resize},height=${400 * resize}`
      );
    }
    function test() {
      bus.handle("[23:43:04.034] ActionEffect 15:104FFD4F:友人A:38:崩拳:40008F1A:欧米茄:00736003:39720000:F:6B8000:0:0:0:0:0:0:0:0:0:0:0:0:797663:8557964:10000:10000:::100.11:99.96:0.00:-3.12:75543:75543:10000:10000:::103.72:110.03:0.00:-2.80:000083E9:0:1", parsed15or16);
    }
    const bus = new Bus({
      echo(v) {
        logs.value = [v, ...logs.value];
      }
    });
    return (_ctx, _cache) => {
      const _component_el_button = ElButton;
      const _component_el_button_group = ElButtonGroup;
      return openBlock(), createBlock(_sfc_main$1, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                createVNode(_component_el_button_group, null, {
                  default: withCtx(() => [
                    running.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createVNode(_component_el_button, {
                        type: "primary",
                        text: "",
                        onClick: restart
                      }, {
                        default: withCtx(() => [
                          createTextVNode("重启")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, {
                        type: "primary",
                        text: "",
                        onClick: stop
                      }, {
                        default: withCtx(() => [
                          createTextVNode("停止")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, {
                        type: "primary",
                        text: "",
                        onClick: test
                      }, {
                        default: withCtx(() => [
                          createTextVNode("测试")
                        ]),
                        _: 1
                      })
                    ], 64)) : (openBlock(), createBlock(_component_el_button, {
                      key: 1,
                      type: "primary",
                      text: "",
                      onClick: start
                    }, {
                      default: withCtx(() => [
                        createTextVNode("启动")
                      ]),
                      _: 1
                    }))
                  ]),
                  _: 1
                })
              ]),
              createBaseVNode("div", _hoisted_4, [
                createVNode(_component_el_button_group, null, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      type: "primary",
                      text: "",
                      onClick: _cache[0] || (_cache[0] = () => setting())
                    }, {
                      default: withCtx(() => [
                        createTextVNode("设置")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  text: "",
                  onClick: _cache[1] || (_cache[1] = () => show.value = !show.value)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(show.value ? "折叠" : "展开"), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, toDisplayString(first.value), 1)
              ]),
              createVNode(Transition, { name: "el-zoom-in-top" }, {
                default: withCtx(() => [
                  withDirectives(createBaseVNode("div", _hoisted_8, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(others.value, (log) => {
                      return openBlock(), createElementBlock("div", _hoisted_9, toDisplayString(log), 1);
                    }), 256))
                  ], 512), [
                    [vShow, show.value]
                  ])
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
createApp(_sfc_main).mount("#app");
