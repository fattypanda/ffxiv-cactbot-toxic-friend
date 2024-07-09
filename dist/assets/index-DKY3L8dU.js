import { d as defineComponent, s as shallowRef, r as ref, c as computed, o as onMounted, a as openBlock, b as createElementBlock, e as createVNode, w as withCtx, f as createBaseVNode, u as unref, g as createTextVNode, F as Fragment, h as renderList, n as nextTick, m as map, E as ElButton, i as createBlock, j as uniqueId, t as toRaw, k as unset, l as ElConfigProvider, p as toDisplayString, q as withDirectives, v as vShow, T as Transition, z as zhCn, x as ElButtonGroup, y as createApp } from "./zh-cn-CoCz9NQl.js";
import { B as Bus, p as parsed15or16 } from "./Bus-BHiBqukI.js";
import { r as rowToRule, o as options, A as AInputAction, E as ElCheckbox, a as ElTableColumn, b as ElTable, c as ElSelect, d as ElInput, e as ElFormItem, f as ElForm, g as ElDialog, s as showOpenFilePicker, h as ElMessage, i as download, j as ElOption, _ as _export_sfc } from "./support-Blx7VymJ.js";
const _hoisted_1$1 = ["innerHTML"];
const _hoisted_2$1 = {
  style: {
    "width": "100%",
    "display": "grid",
    "grid-template-columns": "100px 1fr",
    "grid-gap": "16px"
  }
};
const _hoisted_3$1 = ["innerHTML"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "list",
  setup(__props, {
    expose: __expose
  }) {
    const createId = () => uniqueId("id-");
    const createForm = (row, cid = true) => ({
      ...cid ? {
        id: createId()
      } : {},
      use: false,
      echo: `/p \${player} 使用了 \${skill} ，直暴了 \${damage} 点伤害。`,
      player: "",
      skill: "",
      damage: "10000",
      flag: "60",
      than: ">",
      ...row
    });
    const defaults = {
      form(cid = false) {
        return createForm({}, cid);
      }
    };
    const refTable = shallowRef();
    const data = ref([]);
    const all = computed(() => {
      return data.value.length === 0 ? false : data.value.every(({
        use
      }) => use);
    });
    const indeterminate = computed(() => {
      return data.value.some(({
        use
      }) => use);
    });
    function handleAll(v) {
      if (v) {
        data.value.map((v2) => v2.use = true);
      } else {
        data.value.map((v2) => v2.use = false);
      }
    }
    const visible = ref(false);
    const form = ref({});
    function open(row) {
      visible.value = true;
      form.value = Object.assign({}, defaults.form(), row ? unref(row) : {});
    }
    function copy(row) {
      visible.value = true;
      form.value = Object.assign({}, row ? unref(row) : {}, {
        id: void 0
      });
    }
    function del(row) {
      data.value = data.value.filter((v) => v.id !== row.id);
    }
    function close() {
      visible.value = false;
      form.value = {};
    }
    function submit() {
      const rows = unref(data);
      if (form.value.id) {
        const i = rows.findIndex((v) => v.id === form.value.id);
        if (i > -1)
          rows[i] = Object.assign({}, unref(form));
      } else {
        form.value.id = createId();
        rows.push(Object.assign({}, unref(form)));
      }
      data.value = rows;
      nextTick(() => {
        visible.value = false;
        form.value = {};
      });
    }
    function getUseRows() {
      return data.value.filter((v) => v.use).map((v) => toRaw(v));
    }
    function getData() {
      return data.value.map((v) => {
        const row = {
          ...toRaw(v)
        };
        unset(row, "id");
        return row;
      });
    }
    function setData(_data) {
      data.value = map(_data, (row) => ({
        ...row,
        id: createId()
      }));
    }
    function save() {
      localStorage.setItem("rules", JSON.stringify(getData()));
    }
    function importData() {
      try {
        showOpenFilePicker({
          types: [{
            accept: {
              "application/json": [".json"]
            }
          }],
          excludeAcceptAllOption: true,
          multiple: false
        }).then(async ([handle]) => {
          const file = await handle.getFile();
          const content = await file.text();
          const last = JSON.parse(content);
          setData(last);
        });
      } catch (err) {
        ElMessage.error({
          message: err.message
        });
      }
    }
    function exportData() {
      save();
      download(getData(), "rule.json");
    }
    function useDefaultData() {
      data.value = [defaults.form(true), createForm({
        use: true,
        skill: "攻击",
        flag: "60",
        damage: "0",
        than: ">",
        echo: "/p ${player} 居然浪费了宝贵的直暴在普通攻击上！而且仅仅造成了 ${damage} 点伤害。"
      }, true)];
    }
    onMounted(() => {
      const last = JSON.parse(localStorage.getItem("rules") || "[]");
      if (last.length > 0) {
        setData(last);
      } else {
        useDefaultData();
      }
    });
    const expose = {
      save,
      open,
      importData,
      exportData,
      useDefaultData,
      getUseRows
    };
    __expose(expose);
    return (_ctx, _cache) => {
      const _component_el_checkbox = ElCheckbox;
      const _component_el_table_column = ElTableColumn;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_option = ElOption;
      const _component_el_select = ElSelect;
      const _component_el_input = ElInput;
      const _component_el_form_item = ElFormItem;
      const _component_el_form = ElForm;
      const _component_el_dialog = ElDialog;
      return openBlock(), createElementBlock(Fragment, null, [createVNode(_component_el_table, {
        ref_key: "refTable",
        ref: refTable,
        data: data.value,
        border: ""
      }, {
        default: withCtx(() => [createVNode(_component_el_table_column, {
          width: "30",
          align: "center",
          fixed: "left"
        }, {
          header: withCtx(() => [createVNode(_component_el_checkbox, {
            "model-value": all.value,
            indeterminate: all.value ? false : indeterminate.value,
            onChange: handleAll
          }, null, 8, ["model-value", "indeterminate"])]),
          default: withCtx(({
            row
          }) => [createVNode(_component_el_checkbox, {
            modelValue: row.use,
            "onUpdate:modelValue": ($event) => row.use = $event
          }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
          _: 1
        }), createVNode(_component_el_table_column, {
          label: "规则",
          "min-width": "300",
          align: "center"
        }, {
          default: withCtx(({
            row
          }) => [createBaseVNode("div", {
            innerHTML: unref(rowToRule)(row)
          }, null, 8, _hoisted_1$1)]),
          _: 1
        }), createVNode(_component_el_table_column, {
          label: "行为",
          prop: "echo",
          "min-width": "300",
          align: "center"
        }), createVNode(_component_el_table_column, {
          label: "操作",
          width: "160",
          align: "center",
          fixed: "right"
        }, {
          default: withCtx(({
            row
          }) => [createVNode(_component_el_button, {
            type: "primary",
            text: "",
            onClick: () => open(row)
          }, {
            default: withCtx(() => [createTextVNode("编辑")]),
            _: 2
          }, 1032, ["onClick"]), createVNode(_component_el_button, {
            type: "warning",
            text: "",
            onClick: () => copy(row)
          }, {
            default: withCtx(() => [createTextVNode("复制")]),
            _: 2
          }, 1032, ["onClick"]), createVNode(_component_el_button, {
            type: "danger",
            text: "",
            onClick: () => del(row)
          }, {
            default: withCtx(() => [createTextVNode("删除")]),
            _: 2
          }, 1032, ["onClick"])]),
          _: 1
        })]),
        _: 1
      }, 8, ["data"]), createVNode(_component_el_dialog, {
        modelValue: visible.value,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => visible.value = $event),
        width: "80%",
        "show-close": false,
        "align-center": ""
      }, {
        footer: withCtx(() => [createVNode(_component_el_button, {
          onClick: close
        }, {
          default: withCtx(() => [createTextVNode("取消")]),
          _: 1
        }), createVNode(_component_el_button, {
          type: "primary",
          onClick: submit
        }, {
          default: withCtx(() => [createTextVNode("确认")]),
          _: 1
        })]),
        default: withCtx(() => [createVNode(_component_el_form, {
          model: form.value
        }, {
          default: withCtx(() => [createVNode(_component_el_form_item, {
            label: "伤害"
          }, {
            default: withCtx(() => [createBaseVNode("div", _hoisted_2$1, [createVNode(_component_el_select, {
              modelValue: form.value.than,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.value.than = $event),
              placeholder: "",
              style: {
                "width": "100px"
              }
            }, {
              default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(options).than, (v) => {
                return openBlock(), createBlock(_component_el_option, {
                  value: v.value,
                  label: v.label
                }, null, 8, ["value", "label"]);
              }), 256))]),
              _: 1
            }, 8, ["modelValue"]), createVNode(_component_el_input, {
              modelValue: form.value.damage,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.value.damage = $event),
              formatter: (str) => str.replace(/\D/g, "")
            }, null, 8, ["modelValue", "formatter"])])]),
            _: 1
          }), createVNode(_component_el_form_item, {
            label: "直暴"
          }, {
            default: withCtx(() => [createVNode(_component_el_select, {
              modelValue: form.value.flag,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.value.flag = $event),
              placeholder: ""
            }, {
              default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(options).flag, (v) => {
                return openBlock(), createBlock(_component_el_option, {
                  value: v.value,
                  label: v.label
                }, null, 8, ["value", "label"]);
              }), 256))]),
              _: 1
            }, 8, ["modelValue"])]),
            _: 1
          }), createVNode(_component_el_form_item, {
            label: "玩家"
          }, {
            default: withCtx(() => [createVNode(_component_el_input, {
              modelValue: form.value.player,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.value.player = $event),
              clearable: ""
            }, null, 8, ["modelValue"])]),
            _: 1
          }), createVNode(_component_el_form_item, {
            label: "技能"
          }, {
            default: withCtx(() => [createVNode(_component_el_input, {
              modelValue: form.value.skill,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.value.skill = $event),
              clearable: ""
            }, null, 8, ["modelValue"])]),
            _: 1
          }), createVNode(_component_el_form_item, {
            label: "规则"
          }, {
            default: withCtx(() => [createBaseVNode("div", {
              innerHTML: unref(rowToRule)(form.value)
            }, null, 8, _hoisted_3$1)]),
            _: 1
          }), createVNode(_component_el_form_item, {
            label: "提示"
          }, {
            default: withCtx(() => [createVNode(unref(AInputAction), {
              modelValue: form.value.echo,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.value.echo = $event)
            }, null, 8, ["modelValue"])]),
            _: 1
          })]),
          _: 1
        }, 8, ["model"])]),
        _: 1
      }, 8, ["modelValue"])], 64);
    };
  }
});
const _hoisted_1 = {
  class: "container"
};
const _hoisted_2 = {
  class: "header"
};
const _hoisted_3 = {
  class: "left"
};
const _hoisted_4 = {
  class: "right"
};
const _hoisted_5 = {
  class: "body"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const refList = shallowRef();
    const running = ref(false);
    const show = ref(false);
    function start() {
      var _a;
      running.value = true;
      save();
      const rules = (_a = refList.value) == null ? void 0 : _a.getUseRows();
      bus.start(rules);
    }
    function restart() {
      stop();
      nextTick(() => {
        start();
      });
    }
    function stop() {
      running.value = false;
      bus.stop();
    }
    function save() {
      var _a;
      (_a = refList.value) == null ? void 0 : _a.save();
    }
    function open() {
      var _a;
      (_a = refList.value) == null ? void 0 : _a.open();
    }
    function importData() {
      var _a;
      (_a = refList.value) == null ? void 0 : _a.importData();
    }
    function exportData() {
      var _a;
      (_a = refList.value) == null ? void 0 : _a.exportData();
    }
    function test() {
      bus.handle("[23:43:04.034] ActionEffect 15:104FFD4F:友人A:38:崩拳:40008F1A:欧米茄:00736003:39720000:F:6B8000:0:0:0:0:0:0:0:0:0:0:0:0:797663:8557964:10000:10000:::100.11:99.96:0.00:-3.12:75543:75543:10000:10000:::103.72:110.03:0.00:-2.80:000083E9:0:1", parsed15or16);
    }
    const bus = new Bus();
    return (_ctx, _cache) => {
      const _component_el_button = ElButton;
      const _component_el_button_group = ElButtonGroup;
      const _component_el_config_provider = ElConfigProvider;
      return openBlock(), createBlock(_component_el_config_provider, {
        locale: unref(zhCn),
        size: "small"
      }, {
        default: withCtx(() => [createBaseVNode("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [createBaseVNode("div", _hoisted_3, [createVNode(_component_el_button_group, null, {
          default: withCtx(() => [running.value ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createVNode(_component_el_button, {
            type: "primary",
            text: "",
            onClick: restart
          }, {
            default: withCtx(() => [createTextVNode("重启")]),
            _: 1
          }), createVNode(_component_el_button, {
            type: "primary",
            text: "",
            onClick: stop
          }, {
            default: withCtx(() => [createTextVNode("停止")]),
            _: 1
          }), createVNode(_component_el_button, {
            type: "primary",
            text: "",
            onClick: test
          }, {
            default: withCtx(() => [createTextVNode("测试")]),
            _: 1
          })], 64)) : (openBlock(), createBlock(_component_el_button, {
            key: 1,
            type: "primary",
            text: "",
            onClick: start
          }, {
            default: withCtx(() => [createTextVNode("启动")]),
            _: 1
          }))]),
          _: 1
        })]), createBaseVNode("div", _hoisted_4, [createVNode(_component_el_button_group, null, {
          default: withCtx(() => [createVNode(_component_el_button, {
            type: "primary",
            text: "",
            onClick: _cache[0] || (_cache[0] = () => importData())
          }, {
            default: withCtx(() => [createTextVNode("导入")]),
            _: 1
          }), createVNode(_component_el_button, {
            type: "primary",
            text: "",
            onClick: _cache[1] || (_cache[1] = () => exportData())
          }, {
            default: withCtx(() => [createTextVNode("导出")]),
            _: 1
          }), createVNode(_component_el_button, {
            type: "primary",
            text: "",
            onClick: _cache[2] || (_cache[2] = () => save())
          }, {
            default: withCtx(() => [createTextVNode("保存")]),
            _: 1
          }), createVNode(_component_el_button, {
            type: "primary",
            text: "",
            onClick: _cache[3] || (_cache[3] = () => open())
          }, {
            default: withCtx(() => [createTextVNode("新增")]),
            _: 1
          })]),
          _: 1
        }), createVNode(_component_el_button, {
          type: "primary",
          text: "",
          onClick: _cache[4] || (_cache[4] = () => show.value = !show.value)
        }, {
          default: withCtx(() => [createTextVNode(toDisplayString(show.value ? "折叠" : "展开"), 1)]),
          _: 1
        })])]), createVNode(Transition, {
          name: "el-zoom-in-top"
        }, {
          default: withCtx(() => [withDirectives(createBaseVNode("div", _hoisted_5, [createVNode(_sfc_main$1, {
            ref_key: "refList",
            ref: refList
          }, null, 512)], 512), [[vShow, show.value]])]),
          _: 1
        })])]),
        _: 1
      }, 8, ["locale"]);
    };
  }
});
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-967236c6"]]);
createApp(App).mount("#app");
