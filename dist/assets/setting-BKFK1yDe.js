import { bo as buildProps, d as defineComponent, bp as useNamespace, c as computed, bq as h, br as renderSlot, r as ref, bs as watchEffect, bt as isArray, bu as isNumber, e as createVNode, bv as isVNode, g as createTextVNode, bw as definePropType, bx as isString, by as componentSizes, bz as withInstall, s as shallowRef, o as onMounted, i as createBlock, w as withCtx, a as openBlock, u as unref, f as createBaseVNode, b as createElementBlock, h as renderList, F as Fragment, n as nextTick, E as ElButton, x as ElButtonGroup, y as createApp } from "./zh-cn-CoCz9NQl.js";
import { P as PatchFlags, k as isFragment, l as isValidElementNode, r as rowToRule, o as options, A as AInputAction, s as showOpenFilePicker, h as ElMessage, i as download, E as ElCheckbox, a as ElTableColumn, b as ElTable, c as ElSelect, d as ElInput, e as ElFormItem, f as ElForm, g as ElDialog, j as ElOption } from "./support-Blx7VymJ.js";
import { u as useRules, a as useRulesSelect, _ as _sfc_main$1, b as actions, s as storage } from "./useRules-CZ0LXt7M.js";
const spaceItemProps = buildProps({
  prefixCls: {
    type: String
  }
});
const SpaceItem = defineComponent({
  name: "ElSpaceItem",
  props: spaceItemProps,
  setup(props, { slots }) {
    const ns = useNamespace("space");
    const classes = computed(() => `${props.prefixCls || ns.b()}__item`);
    return () => h("div", { class: classes.value }, renderSlot(slots, "default"));
  }
});
const SIZE_MAP = {
  small: 8,
  default: 12,
  large: 16
};
function useSpace(props) {
  const ns = useNamespace("space");
  const classes = computed(() => [ns.b(), ns.m(props.direction), props.class]);
  const horizontalSize = ref(0);
  const verticalSize = ref(0);
  const containerStyle = computed(() => {
    const wrapKls = props.wrap || props.fill ? { flexWrap: "wrap" } : {};
    const alignment = {
      alignItems: props.alignment
    };
    const gap = {
      rowGap: `${verticalSize.value}px`,
      columnGap: `${horizontalSize.value}px`
    };
    return [wrapKls, alignment, gap, props.style];
  });
  const itemStyle = computed(() => {
    return props.fill ? { flexGrow: 1, minWidth: `${props.fillRatio}%` } : {};
  });
  watchEffect(() => {
    const { size = "small", wrap, direction: dir, fill } = props;
    if (isArray(size)) {
      const [h2 = 0, v = 0] = size;
      horizontalSize.value = h2;
      verticalSize.value = v;
    } else {
      let val;
      if (isNumber(size)) {
        val = size;
      } else {
        val = SIZE_MAP[size || "small"] || SIZE_MAP.small;
      }
      if ((wrap || fill) && dir === "horizontal") {
        horizontalSize.value = verticalSize.value = val;
      } else {
        if (dir === "horizontal") {
          horizontalSize.value = val;
          verticalSize.value = 0;
        } else {
          verticalSize.value = val;
          horizontalSize.value = 0;
        }
      }
    }
  });
  return {
    classes,
    containerStyle,
    itemStyle
  };
}
const spaceProps = buildProps({
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  class: {
    type: definePropType([
      String,
      Object,
      Array
    ]),
    default: ""
  },
  style: {
    type: definePropType([String, Array, Object]),
    default: ""
  },
  alignment: {
    type: definePropType(String),
    default: "center"
  },
  prefixCls: {
    type: String
  },
  spacer: {
    type: definePropType([Object, String, Number, Array]),
    default: null,
    validator: (val) => isVNode(val) || isNumber(val) || isString(val)
  },
  wrap: Boolean,
  fill: Boolean,
  fillRatio: {
    type: Number,
    default: 100
  },
  size: {
    type: [String, Array, Number],
    values: componentSizes,
    validator: (val) => {
      return isNumber(val) || isArray(val) && val.length === 2 && val.every(isNumber);
    }
  }
});
const Space = defineComponent({
  name: "ElSpace",
  props: spaceProps,
  setup(props, { slots }) {
    const { classes, containerStyle, itemStyle } = useSpace(props);
    function extractChildren(children, parentKey = "", extractedChildren = []) {
      const { prefixCls } = props;
      children.forEach((child, loopKey) => {
        if (isFragment(child)) {
          if (isArray(child.children)) {
            child.children.forEach((nested, key) => {
              if (isFragment(nested) && isArray(nested.children)) {
                extractChildren(nested.children, `${parentKey + key}-`, extractedChildren);
              } else {
                extractedChildren.push(createVNode(SpaceItem, {
                  style: itemStyle.value,
                  prefixCls,
                  key: `nested-${parentKey + key}`
                }, {
                  default: () => [nested]
                }, PatchFlags.PROPS | PatchFlags.STYLE, ["style", "prefixCls"]));
              }
            });
          }
        } else if (isValidElementNode(child)) {
          extractedChildren.push(createVNode(SpaceItem, {
            style: itemStyle.value,
            prefixCls,
            key: `LoopKey${parentKey + loopKey}`
          }, {
            default: () => [child]
          }, PatchFlags.PROPS | PatchFlags.STYLE, ["style", "prefixCls"]));
        }
      });
      return extractedChildren;
    }
    return () => {
      var _a;
      const { spacer, direction } = props;
      const children = renderSlot(slots, "default", { key: 0 }, () => []);
      if (((_a = children.children) != null ? _a : []).length === 0)
        return null;
      if (isArray(children.children)) {
        let extractedChildren = extractChildren(children.children);
        if (spacer) {
          const len = extractedChildren.length - 1;
          extractedChildren = extractedChildren.reduce((acc, child, idx) => {
            const children2 = [...acc, child];
            if (idx !== len) {
              children2.push(createVNode("span", {
                style: [
                  itemStyle.value,
                  direction === "vertical" ? "width: 100%" : null
                ],
                key: idx
              }, [
                isVNode(spacer) ? spacer : createTextVNode(spacer, PatchFlags.TEXT)
              ], PatchFlags.STYLE));
            }
            return children2;
          }, []);
        }
        return createVNode("div", {
          class: classes.value,
          style: containerStyle.value
        }, extractedChildren, PatchFlags.STYLE | PatchFlags.CLASS);
      }
      return children.children;
    };
  }
});
const ElSpace = withInstall(Space);
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = {
  style: {
    "width": "100%",
    "display": "grid",
    "grid-template-columns": "100px 1fr",
    "grid-gap": "16px"
  }
};
const _hoisted_3 = ["innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const {
      rules
    } = useRules();
    const {
      all,
      indeterminate,
      changeAll
    } = useRulesSelect(rules);
    const defaults = {
      form(cid = false) {
        return actions.createRule({}, cid);
      }
    };
    const refTable = shallowRef();
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
      rules.value = rules.value.filter((v) => v.id !== row.id);
    }
    function close() {
      visible.value = false;
      form.value = {};
    }
    function submit() {
      const rows = unref(rules);
      const data = unref(form);
      if (form.value.id) {
        const i = rows.findIndex((v) => v.id === form.value.id);
        if (i > -1)
          rows[i] = Object.assign({}, data);
      } else {
        form.value.id = actions.createId();
        rows.push(Object.assign({}, data));
      }
      rules.value = rows;
      nextTick(() => {
        visible.value = false;
        form.value = {};
      });
    }
    function getData() {
      return actions.stringify(rules.value);
    }
    function setData(_data) {
      rules.value = actions.parse(_data);
    }
    function save() {
      var _a;
      storage.set(actions.stringify(rules.value));
      (_a = window.opener) == null ? void 0 : _a.postMessage("resetting", "*");
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
      rules.value = [defaults.form(true), actions.createRule({
        use: true,
        skill: "攻击",
        flag: "60",
        damage: "0",
        than: ">",
        echo: "/p ${player} 居然浪费了宝贵的直暴在普通攻击上！而且仅仅造成了 ${damage} 点伤害。<se.11>"
      }, true), actions.createRule({
        use: true,
        skill: "",
        flag: "60",
        damage: "5000",
        than: "<",
        echo: `/p \${player} 的 \${skill} 直暴了 \${damage} 点伤害。<se.11>`
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
    return (_ctx, _cache) => {
      const _component_el_button = ElButton;
      const _component_el_button_group = ElButtonGroup;
      const _component_el_space = ElSpace;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_table_column = ElTableColumn;
      const _component_el_table = ElTable;
      const _component_el_option = ElOption;
      const _component_el_select = ElSelect;
      const _component_el_input = ElInput;
      const _component_el_form_item = ElFormItem;
      const _component_el_form = ElForm;
      const _component_el_dialog = ElDialog;
      return openBlock(), createBlock(_sfc_main$1, null, {
        default: withCtx(() => [createVNode(_component_el_space, {
          style: {
            "width": "100%",
            "justify-content": "space-between"
          }
        }, {
          default: withCtx(() => [createVNode(_component_el_button_group, {
            style: {
              "padding": "4px 4px"
            }
          }, {
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
            })]),
            _: 1
          }), createVNode(_component_el_button_group, {
            style: {
              "padding": "4px 4px"
            }
          }, {
            default: withCtx(() => [createVNode(_component_el_button, {
              type: "primary",
              text: "",
              onClick: _cache[3] || (_cache[3] = () => open())
            }, {
              default: withCtx(() => [createTextVNode("新增")]),
              _: 1
            })]),
            _: 1
          })]),
          _: 1
        }), createVNode(_component_el_table, {
          ref_key: "refTable",
          ref: refTable,
          data: unref(rules),
          border: ""
        }, {
          default: withCtx(() => [createVNode(_component_el_table_column, {
            width: "30",
            align: "center",
            fixed: "left"
          }, {
            header: withCtx(() => [createVNode(_component_el_checkbox, {
              "model-value": unref(all),
              indeterminate: unref(all) ? false : unref(indeterminate),
              onChange: unref(changeAll)
            }, null, 8, ["model-value", "indeterminate", "onChange"])]),
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
            }, null, 8, _hoisted_1)]),
            _: 1
          }), createVNode(_component_el_table_column, {
            label: "行为",
            prop: "echo",
            "min-width": "300",
            align: "center"
          }), createVNode(_component_el_table_column, {
            label: "操作",
            width: "105",
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
          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => visible.value = $event),
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
              default: withCtx(() => [createBaseVNode("div", _hoisted_2, [createVNode(_component_el_select, {
                modelValue: form.value.than,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.value.than = $event),
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
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.value.damage = $event),
                formatter: (str) => str.replace(/\D/g, "")
              }, null, 8, ["modelValue", "formatter"])])]),
              _: 1
            }), createVNode(_component_el_form_item, {
              label: "直暴"
            }, {
              default: withCtx(() => [createVNode(_component_el_select, {
                modelValue: form.value.flag,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => form.value.flag = $event),
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
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => form.value.player = $event),
                clearable: ""
              }, null, 8, ["modelValue"])]),
              _: 1
            }), createVNode(_component_el_form_item, {
              label: "技能"
            }, {
              default: withCtx(() => [createVNode(_component_el_input, {
                modelValue: form.value.skill,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => form.value.skill = $event),
                clearable: ""
              }, null, 8, ["modelValue"])]),
              _: 1
            }), createVNode(_component_el_form_item, {
              label: "规则"
            }, {
              default: withCtx(() => [createBaseVNode("div", {
                innerHTML: unref(rowToRule)(form.value)
              }, null, 8, _hoisted_3)]),
              _: 1
            }), createVNode(_component_el_form_item, {
              label: "提示"
            }, {
              default: withCtx(() => [createVNode(unref(AInputAction), {
                modelValue: form.value.echo,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => form.value.echo = $event)
              }, null, 8, ["modelValue"])]),
              _: 1
            })]),
            _: 1
          }, 8, ["model"])]),
          _: 1
        }, 8, ["modelValue"])]),
        _: 1
      });
    };
  }
});
createApp(_sfc_main).mount("#app");
