<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('cancel')"
  >
    <div
      class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-6">
          {{ initialData ? 'Edit Flight' : 'Add Flight' }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <!-- Flight Number -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Flight Number <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.flightNumber"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.flightNumber }"
            />
            <p v-if="errors.flightNumber" class="mt-1 text-sm text-red-500">
              {{ errors.flightNumber }}
            </p>
          </div>

          <!-- Airline -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Airline <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.airline"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.airline }"
            />
            <p v-if="errors.airline" class="mt-1 text-sm text-red-500">
              {{ errors.airline }}
            </p>
          </div>

          <!-- Type -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Type <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.type }"
            >
              <option value="Departure">Departure</option>
              <option value="Arrival">Arrival</option>
            </select>
            <p v-if="errors.type" class="mt-1 text-sm text-red-500">
              {{ errors.type }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Origin -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Origin (IATA) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.origin"
                type="text"
                maxlength="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                :class="{ 'border-red-500': errors.origin }"
              />
              <p v-if="errors.origin" class="mt-1 text-sm text-red-500">
                {{ errors.origin }}
              </p>
            </div>

            <!-- Destination -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Destination (IATA) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.destination"
                type="text"
                maxlength="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                :class="{ 'border-red-500': errors.destination }"
              />
              <p v-if="errors.destination" class="mt-1 text-sm text-red-500">
                {{ errors.destination }}
              </p>
            </div>
          </div>

          <!-- Scheduled Time -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Scheduled Time <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.scheduledTime"
              type="datetime-local"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.scheduledTime }"
            />
            <p v-if="errors.scheduledTime" class="mt-1 text-sm text-red-500">
              {{ errors.scheduledTime }}
            </p>
          </div>

          <!-- Gate -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Gate
            </label>
            <input
              v-model="form.gate"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Status -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Status <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.status }"
            >
              <option value="On Time">On Time</option>
              <option value="Delayed">Delayed</option>
              <option value="Boarding">Boarding</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Landed">Landed</option>
            </select>
            <p v-if="errors.status" class="mt-1 text-sm text-red-500">
              {{ errors.status }}
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="$emit('cancel')"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {{ initialData ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['submit', 'cancel']);

const form = ref({
  flightNumber: '',
  airline: '',
  type: 'Departure',
  origin: '',
  destination: '',
  scheduledTime: '',
  gate: '',
  status: 'On Time',
});

const errors = ref({});

// Watch for initialData changes to populate form
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      const date = new Date(newData.scheduledTime);
      const localDateTime = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      form.value = {
        flightNumber: newData.flightNumber || '',
        airline: newData.airline || '',
        type: newData.type || 'Departure',
        origin: newData.origin || '',
        destination: newData.destination || '',
        scheduledTime: localDateTime,
        gate: newData.gate || '',
        status: newData.status || 'On Time',
      };
    } else {
      // Reset form for new flight
      form.value = {
        flightNumber: '',
        airline: '',
        type: 'Departure',
        origin: '',
        destination: '',
        scheduledTime: '',
        gate: '',
        status: 'On Time',
      };
    }
    errors.value = {};
  },
  { immediate: true }
);

// Watch for visible prop to reset form when closed
watch(
  () => props.visible,
  (isVisible) => {
    if (!isVisible) {
      errors.value = {};
    }
  }
);

const validate = () => {
  errors.value = {};

  if (!form.value.flightNumber.trim()) {
    errors.value.flightNumber = 'Flight Number is required';
  } else if (!/^[A-Z0-9]+$/i.test(form.value.flightNumber.trim())) {
    errors.value.flightNumber = 'Flight Number must be alphanumeric';
  }

  if (!form.value.airline.trim()) {
    errors.value.airline = 'Airline is required';
  }

  if (!form.value.type) {
    errors.value.type = 'Type is required';
  }

  if (!form.value.origin.trim()) {
    errors.value.origin = 'Origin is required';
  } else if (form.value.origin.trim().length !== 3) {
    errors.value.origin = 'Origin must be 3 characters (IATA code)';
  }

  if (!form.value.destination.trim()) {
    errors.value.destination = 'Destination is required';
  } else if (form.value.destination.trim().length !== 3) {
    errors.value.destination = 'Destination must be 3 characters (IATA code)';
  }

  if (!form.value.scheduledTime) {
    errors.value.scheduledTime = 'Scheduled Time is required';
  }

  if (!form.value.status) {
    errors.value.status = 'Status is required';
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (!validate()) {
    return;
  }

  const submitData = {
    flightNumber: form.value.flightNumber.trim(),
    airline: form.value.airline.trim(),
    type: form.value.type,
    origin: form.value.origin.trim().toUpperCase(),
    destination: form.value.destination.trim().toUpperCase(),
    scheduledTime: new Date(form.value.scheduledTime).toISOString(),
    gate: form.value.gate.trim(),
    status: form.value.status,
  };

  emit('submit', submitData);
};
</script>

