<template>
  <div>
    <h4>Slide Files</h4>
    <ul>
      <li v-for="file in slideFiles" :key="file.id">
        {{ file.zdh_slide_name }} - {{ file.file_name }}
        <button @click="downloadFile(file)">Download</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import s3Client from '@/service/aws-config';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default {
  props: ['slideId'],
  data() {
    return {
      slideFiles: [],
    };
  },
  async mounted() {
    const response = await axios.get(`http://localhost:3000/slide-files/${this.slideId}`);
    this.slideFiles = response.data;
  },
  methods: {
    async downloadFile(file) {
      const command = new GetObjectCommand({
        Bucket: file.bucket,
        Key: `${file.folder}/${file.file_name}`,
      });
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      window.open(url, '_blank');
    },
  },
};
</script>