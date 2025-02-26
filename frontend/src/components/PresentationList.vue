<template>
  <div>
    <h2>Presentations</h2>
    <ul>
      <li v-for="presentation in presentations" :key="presentation.id">
        {{ presentation.public_content_name }} ({{ presentation.version }} - {{ presentation.status }})
        <button @click="showSlides(presentation.id)">View Slides</button>
      </li>
    </ul>
    <SlideList v-if="selectedPresentationId" :presentationId="selectedPresentationId" />
  </div>
</template>

<script>
import axios from 'axios';
import SlideList from './SlideList.vue';

export default {
  components: { SlideList },
  data() {
    return {
      presentations: [],
      selectedPresentationId: null,
    };
  },
  async mounted() {
    const response = await axios.get('http://localhost:3000/presentations');
    this.presentations = response.data;
  },
  methods: {
    showSlides(presentationId) {
      this.selectedPresentationId = presentationId;
    },
  },
};
</script>