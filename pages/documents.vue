<template>
  <div class="documents">
    // ...existing code...
    <PdfPreview 
      v-if="selectedFile && selectedFile.type === 'pdf'"
      :pdfUrl="getPdfUrl(selectedFile)"
    />
    // ...existing code...
  </div>
</template>

<script>
import PdfPreview from '~/components/PdfPreview.vue'

export default {
  components: {
    PdfPreview
  },
  // ...existing code...
  methods: {
    getPdfUrl(file) {
      // 如果是Blob URL
      if (file.url instanceof Blob) {
        return URL.createObjectURL(file.url);
      }
      // 如果是本地文件路径，确保添加正确的域名
      if (file.url.startsWith('/')) {
        return `${process.env.BASE_URL || ''}${file.url}`;
      }
      return file.url;
    }
  }
}
</script>
