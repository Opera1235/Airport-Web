<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4"
    >
      <p class="font-bold">Error</p>
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-8 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Loading flights...</p>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!isLoading && flights.length === 0"
      class="p-8 text-center text-gray-500"
    >
      <p class="text-lg">No flights found for current filters</p>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Flight
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Airline
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Origin
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Destination
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Gate
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="flight in flights"
            :key="flight.id"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ flight.flightNumber }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
              {{ flight.airline }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
              <span
                :class="{
                  'bg-blue-100 text-blue-800': flight.type === 'Departure',
                  'bg-green-100 text-green-800': flight.type === 'Arrival',
                }"
                class="px-2 py-1 text-xs font-semibold rounded-full"
              >
                {{ flight.type }}
              </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
              {{ flight.origin }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
              {{ flight.destination }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
              {{ formatDateTime(flight.scheduledTime) }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
              {{ flight.gate || '-' }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm">
              <span
                :class="getStatusClass(flight.status)"
                class="px-2 py-1 text-xs font-semibold rounded-full"
              >
                {{ flight.status }}
              </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="$emit('edit', flight)"
                class="text-blue-600 hover:text-blue-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="$emit('delete', flight.id)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  flights: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

defineEmits(['edit', 'delete']);

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getStatusClass = (status) => {
  const classes = {
    'On Time': 'bg-green-100 text-green-800',
    Delayed: 'bg-yellow-100 text-yellow-800',
    Boarding: 'bg-blue-100 text-blue-800',
    Cancelled: 'bg-red-100 text-red-800',
    Landed: 'bg-gray-100 text-gray-800',
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};
</script>

