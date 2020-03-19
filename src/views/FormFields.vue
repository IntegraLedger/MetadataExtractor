<template>
  <div class="page">
    {{result}}
  </div>
</template>

<script>

export default {
  name: 'FormFields',
  components: {
  },
  data() {
    return {
      result: null
    }
  },
  computed: {
    file() {
      return this.$store.state.document.file
    }
  },
  mounted() {
    this.analyzeFile(this.file)
  },
  methods: {
    analyzeFile() {
      this.$store.dispatch('document/analyze', this.file)
      .then(res => {
        console.log(res)
        if (res.succeed) {
          this.result = res.result;
        } else {
          this.result = res.message;
        }
      })
    },
  }
}
</script>
