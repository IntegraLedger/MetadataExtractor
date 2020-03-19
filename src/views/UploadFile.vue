<template>
  <div class="dropzone-container">
    <vue-dropzone ref="myVueDropzone" id="dropzone" :useCustomSlot="true" :options="dropzoneOptions" @vdropzone-file-added="fileAdded">
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload file</h3>
        <div class="subtitle">...or click to select file</div>
        <div v-if="!failed">
          <p v-if="uploaded" class="subtitle">File: {{ fileName }}</p>
          <p v-else class="subtitle">No file selected.</p>
        </div>
        <p v-else class="error">Only docx and pdf files are acceptable.</p>
      </div>
    </vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'UploadFile',
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      uploaded: false,
      failed: false,
      fileName: '',
      dropzoneOptions: {
        url: '/',
        acceptedFiles: '.docx,.pdf'
      }
    }
  },
  methods: {
    fileAdded(file) {
      if (file.name.endsWith('.docx') || file.name.endsWith('.pdf')) {
        this.uploaded = true
        this.failed = false
        this.fileName = file.name
        this.$refs.myVueDropzone.removeAllFiles()
        this.$store.commit('document/updateDocument', file);
        let ext = 'pdf'
        if (file.name.endsWith('.docx')) ext = 'doc'
        this.$store.commit('document/updateExtension', ext)
        setTimeout(() => {
          this.$router.push('/form-fields')
        }, 500)
      } else {
        this.uploaded = false
        this.failed = true
        this.fileName = ''
        this.$refs.myVueDropzone.removeAllFiles()
      }
    }
  }
}
</script>

<style scoped>
  .dropzone-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .vue-dropzone {
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
