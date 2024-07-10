import { d as defineComponent, i as createBlock, w as withCtx, u as unref, l as ElConfigProvider, a as openBlock, br as renderSlot, z as zhCn, r as ref, o as onMounted, c_ as onUnmounted, j as uniqueId, t as toRaw, k as unset, m as map, c as computed } from "./zh-cn-CoCz9NQl.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "el-global-config",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_el_config_provider = ElConfigProvider;
      return openBlock(), createBlock(_component_el_config_provider, {
        locale: unref(zhCn),
        size: "small"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["locale"]);
    };
  }
});
const storage = {
  get() {
    return JSON.parse(localStorage.getItem("rules") || "[]");
  },
  set(v) {
    localStorage.setItem("rules", JSON.stringify(v));
  }
};
const actions = {
  createId() {
    return uniqueId("id-");
  },
  createRule(row, cid = true) {
    return {
      ...cid ? { id: actions.createId() } : {},
      use: false,
      echo: `/p \${player} 使用了 \${skill} ，直暴了 \${damage} 点伤害。<se.1>`,
      player: "",
      skill: "",
      damage: "10000",
      flag: "60",
      than: ">",
      ...row
    };
  },
  stringify(data) {
    return data.map((v) => {
      const row = { ...toRaw(v) };
      unset(row, "id");
      return row;
    });
  },
  parse(data) {
    return map(data, (row) => ({
      use: false,
      echo: "",
      player: "",
      skill: "",
      damage: "1",
      flag: "60",
      than: ">",
      ...row,
      id: actions.createId()
    }));
  }
};
function useRules() {
  const rules = ref([]);
  function handleMessage(e) {
    if (e.data === "resetting") {
      rules.value = actions.parse(storage.get());
    }
  }
  onMounted(() => {
    window.addEventListener("message", handleMessage);
    rules.value = actions.parse(storage.get());
  });
  onUnmounted(() => {
    window.removeEventListener("message", handleMessage);
  });
  return {
    rules
  };
}
function useRulesSelect(rules) {
  const all = computed(() => {
    return rules.value.length === 0 ? false : rules.value.every(({ use }) => use);
  });
  const indeterminate = computed(() => {
    return rules.value.some(({ use }) => use);
  });
  function changeAll(v) {
    if (v) {
      rules.value.map((v2) => v2.use = true);
    } else {
      rules.value.map((v2) => v2.use = false);
    }
  }
  return {
    all,
    indeterminate,
    changeAll
  };
}
export {
  _sfc_main as _,
  useRulesSelect as a,
  actions as b,
  storage as s,
  useRules as u
};
