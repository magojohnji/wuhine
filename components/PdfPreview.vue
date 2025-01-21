<template>
  <div class="pdf-preview">
    <iframe
      v-if="pdfUrl"
      :src="processedPdfUrl"
      width="100%"
      height="100%"
      frameborder="0"
      sandbox="allow-same-origin allow-scripts allow-forms"
      type="application/pdf"
    ></iframe>
    <div v-if="!pdfUrl" class="error-message">
      PDF文件未找到
    </div>
  </div>
</template>

<script>
export default {
  name: 'PdfPreview',
  props: {
    pdfUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    processedPdfUrl() {
      // 检查是否为相对路径
      if (this.pdfUrl.startsWith('/')) {
        return `${window.location.origin}${this.pdfUrl}`;
      }
      // 如果是blob URL或完整URL则直接返回
      return this.pdfUrl;
    }
  }
}
</script>

<style scoped>
.pdf-preview {
  width: 100%;
  height: 600px;
  border: 1px solid #ddd;
  overflow: hidden;
  position: relative;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
}

iframe {
  background: #fff;
}
</style>
