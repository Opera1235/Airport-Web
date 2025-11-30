// 使用本地資料儲存服務替代 HTTP API
import {
  getFlights as fetchFlightsFromStore,
  getFlightById as fetchFlightByIdFromStore,
  createFlight as createFlightInStore,
  updateFlight as updateFlightInStore,
  deleteFlight as deleteFlightFromStore,
} from './flightStore.js';

// 為了保持與原有 API 介面的相容性，使用相同的函數名
export const fetchFlights = async (params = {}) => {
  try {
    return await fetchFlightsFromStore(params);
  } catch (error) {
    throw error;
  }
};

export const fetchFlightById = async (id) => {
  try {
    return await fetchFlightByIdFromStore(id);
  } catch (error) {
    throw error;
  }
};

export const createFlight = async (flightData) => {
  try {
    return await createFlightInStore(flightData);
  } catch (error) {
    throw error;
  }
};

export const updateFlight = async (id, flightData) => {
  try {
    return await updateFlightInStore(id, flightData);
  } catch (error) {
    throw error;
  }
};

export const deleteFlight = async (id) => {
  try {
    await deleteFlightFromStore(id);
  } catch (error) {
    throw error;
  }
};

export default {
  fetchFlights,
  fetchFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
};

