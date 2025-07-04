<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { script } from '../core/script';

const emit = defineEmits<{
  (e: 'update:style', code: string): void;
  (e: 'update:content', code: string): void;
}>();

// ... the rest of the file is correct
</script> 