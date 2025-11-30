// 使用本地数据存储服务替代HTTP API
import {
  getFlights as fetchFlightsFromStore,
  getFlightById as fetchFlightByIdFromStore,
  createFlight as createFlightInStore,
  updateFlight as updateFlightInStore,
  deleteFlight as deleteFlightFromStore,
} from './flightStore.js';

// 为了保持与原有API接口的兼容性，使用相同的函数名
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

