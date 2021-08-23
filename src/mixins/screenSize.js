export default {
  name: "AddEditComment",
  components: {},
  props: {},
  data: function() {
    return {
      width: true
    };
  },
  watch: {},
  methods: {
    async onClose() {
      this.active = false;
      await new Promise(resolve => setTimeout(resolve, 200));
      this.$store.commit("clearChart");
    }
  }
};