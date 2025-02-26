<template>
  <div>
    <h3>Slides</h3>
    <ul>
      <li v-for="slide in slides" :key="slide.id">
        {{ slide.id }}
        <button @click="showSlideFiles(slide.id)">View Files</button>
      </li>
    </ul>
    <SlideFileList v-if="selectedSlideId" :slideId="selectedSlideId" />
  </div>
</template>


<script>
import axios from 'axios';
import SlideFileList from './SlideFileList.vue';

export default {
  components: { SlideFileList },
  props: ['presentationId'],
  data() {
    return {
      slides: [],
      selectedSlideId: null,
    };
  },
  async mounted() {
    const response = await axios.get(`http://localhost:3000/slides/${this.presentationId}`);
    this.slides = response.data;
  },
  methods: {
    showSlideFiles(slideId) {
      this.selectedSlideId = slideId;
    },
  },
};
</script>