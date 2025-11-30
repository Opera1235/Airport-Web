<template>
  <div class="bg-white p-4 rounded-lg shadow-md mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Flight Type Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          v-model="localFilters.type"
          @change="handleChange"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Departure">Departure</option>
          <option value="Arrival">Arrival</option>
        </select>
      </div>

      <!-- Status Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          v-model="localFilters.status"
          @change="handleChange"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="On Time">On Time</option>
          <option value="Delayed">Delayed</option>
          <option value="Boarding">Boarding</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Landed">Landed</option>
        </select>
      </div>

      <!-- Airline Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Airline
        </label>
        <select
          v-model="localFilters.airline"
          @change="handleChange"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option
            v-for="airline in airlineOptions"
            :key="airline"
            :value="airline"
          >
            {{ airline }}
          </option>
        </select>
      </div>

      <!-- Search by Flight Number -->
      <div class="lg:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Search Flight Number
        </label>
        <input
          v-model="localFilters.q"
          @input="handleChange"
          type="text"
          placeholder="Enter flight number..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  airlineOptions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:filters']);

const localFilters = ref({
  type: props.filters.type || 'All',
  status: props.filters.status || 'All',
  airline: props.filters.airline || 'All',
  q: props.filters.q || '',
});

watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = {
      type: newFilters.type || 'All',
      status: newFilters.status || 'All',
      airline: newFilters.airline || 'All',
      q: newFilters.q || '',
    };
  },
  { deep: true }
);

const handleChange = () => {
  emit('update:filters', { ...localFilters.value });
};
</script>

