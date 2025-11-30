<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">
        Airport Flight Management Admin
      </h1>
      <button
        @click="openCreateForm"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
      >
        Add Flight
      </button>
    </div>

    <!-- Filter Bar -->
    <FlightFilterBar
      :filters="filters"
      :airline-options="airlineOptions"
      @update:filters="handleFilterChange"
    />

    <!-- Flight Table -->
    <FlightTable
      :flights="flights"
      :is-loading="isLoading"
      :error-message="errorMessage"
      @edit="openEditForm"
      @delete="handleDelete"
    />

    <!-- Flight Form Modal -->
    <FlightForm
      :visible="isFormOpen"
      :initial-data="editingFlight"
      @submit="handleFormSubmit"
      @cancel="closeForm"
    />

    <!-- Success Toast -->
    <div
      v-if="showSuccessToast"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    >
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import FlightFilterBar from '../components/FlightFilterBar.vue';
import FlightTable from '../components/FlightTable.vue';
import FlightForm from '../components/FlightForm.vue';
import {
  fetchFlights,
  createFlight,
  updateFlight,
  deleteFlight,
} from '../services/api';

const flights = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const isFormOpen = ref(false);
const editingFlight = ref(null);
const showSuccessToast = ref(false);
const successMessage = ref('');

const filters = ref({
  type: 'All',
  status: 'All',
  airline: 'All',
  q: '',
});

// Get unique airlines from flights
const airlineOptions = computed(() => {
  const airlines = new Set();
  flights.value.forEach((flight) => {
    if (flight.airline) {
      airlines.add(flight.airline);
    }
  });
  return Array.from(airlines).sort();
});

const loadFlights = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const params = {
      sortBy: 'scheduledTime',
      order: 'asc',
    };

    if (filters.value.type !== 'All') {
      params.type = filters.value.type;
    }
    if (filters.value.status !== 'All') {
      params.status = filters.value.status;
    }
    if (filters.value.airline !== 'All') {
      params.airline = filters.value.airline;
    }
    if (filters.value.q) {
      params.q = filters.value.q;
    }

    const data = await fetchFlights(params);
    flights.value = data;
  } catch (error) {
    errorMessage.value =
      error.message || 'Failed to load flights';
    console.error('Error loading flights:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleFilterChange = (newFilters) => {
  filters.value = { ...newFilters };
  loadFlights();
};

const openCreateForm = () => {
  editingFlight.value = null;
  isFormOpen.value = true;
};

const openEditForm = (flight) => {
  editingFlight.value = flight;
  isFormOpen.value = true;
};

const closeForm = () => {
  isFormOpen.value = false;
  editingFlight.value = null;
};

const handleFormSubmit = async (formData) => {
  try {
    if (editingFlight.value) {
      // Update existing flight
      await updateFlight(editingFlight.value.id, formData);
      successMessage.value = 'Flight updated successfully!';
    } else {
      // Create new flight
      await createFlight(formData);
      successMessage.value = 'Flight created successfully!';
    }

    showSuccessToast.value = true;
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);

    closeForm();
    loadFlights();
  } catch (error) {
    errorMessage.value =
      error.message || 'Failed to save flight';
    console.error('Error saving flight:', error);
  }
};

const handleDelete = async (flightId) => {
  if (!confirm('Are you sure you want to delete this flight?')) {
    return;
  }

  try {
    await deleteFlight(flightId);
    successMessage.value = 'Flight deleted successfully!';
    showSuccessToast.value = true;
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);
    loadFlights();
  } catch (error) {
    errorMessage.value =
      error.message || 'Failed to delete flight';
    console.error('Error deleting flight:', error);
  }
};

onMounted(() => {
  loadFlights();
});
</script>

