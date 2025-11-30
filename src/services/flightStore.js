import { initialFlights } from '../data/flights.js';
import { validateFlight } from '../utils/validators.js';

const STORAGE_KEY = 'airport_flights';
const NEXT_ID_KEY = 'airport_next_id';

// 从localStorage加载数据，如果没有则使用初始数据
function loadFlights() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading flights from localStorage:', error);
  }
  return [...initialFlights];
}

// 保存数据到localStorage
function saveFlights(flights) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flights));
  } catch (error) {
    console.error('Error saving flights to localStorage:', error);
  }
}

// 获取下一个ID
function getNextId() {
  try {
    const stored = localStorage.getItem(NEXT_ID_KEY);
    if (stored) {
      return parseInt(stored, 10);
    }
  } catch (error) {
    console.error('Error loading next ID from localStorage:', error);
  }
  const flights = loadFlights();
  const maxId = Math.max(...flights.map(f => f.id), 0);
  return maxId + 1;
}

// 保存下一个ID
function saveNextId(id) {
  try {
    localStorage.setItem(NEXT_ID_KEY, id.toString());
  } catch (error) {
    console.error('Error saving next ID to localStorage:', error);
  }
}

// 获取所有航班（带过滤和排序）
export function getFlights(params = {}) {
  return new Promise((resolve) => {
    let filteredFlights = [...loadFlights()];

    // Filter by type
    if (params.type && params.type !== 'All') {
      filteredFlights = filteredFlights.filter(f => f.type === params.type);
    }

    // Filter by airline
    if (params.airline && params.airline !== 'All') {
      filteredFlights = filteredFlights.filter(f => f.airline === params.airline);
    }

    // Filter by status
    if (params.status && params.status !== 'All') {
      filteredFlights = filteredFlights.filter(f => f.status === params.status);
    }

    // Search by flight number (case-insensitive)
    if (params.q) {
      const searchTerm = params.q.toLowerCase();
      filteredFlights = filteredFlights.filter(f =>
        f.flightNumber.toLowerCase().includes(searchTerm)
      );
    }

    // Sort
    if (params.sortBy === 'scheduledTime') {
      filteredFlights.sort((a, b) => {
        const timeA = new Date(a.scheduledTime).getTime();
        const timeB = new Date(b.scheduledTime).getTime();
        if (params.order === 'desc') {
          return timeB - timeA;
        }
        return timeA - timeB;
      });
    }

    // 模拟API延迟
    setTimeout(() => {
      resolve(filteredFlights);
    }, 100);
  });
}

// 根据ID获取单个航班
export function getFlightById(id) {
  return new Promise((resolve, reject) => {
    const flights = loadFlights();
    const flight = flights.find(f => f.id === parseInt(id, 10));

    setTimeout(() => {
      if (!flight) {
        reject({ message: 'Flight not found' });
      } else {
        resolve(flight);
      }
    }, 100);
  });
}

// 创建新航班
export function createFlight(flightData) {
  return new Promise((resolve, reject) => {
    const validation = validateFlight(flightData, false);

    if (!validation.isValid) {
      setTimeout(() => {
        reject({
          message: 'Validation failed',
          errors: validation.errors,
        });
      }, 100);
      return;
    }

    const flights = loadFlights();
    const nextId = getNextId();

    const newFlight = {
      id: nextId,
      flightNumber: flightData.flightNumber.trim(),
      airline: flightData.airline.trim(),
      type: flightData.type,
      origin: flightData.origin.trim().toUpperCase(),
      destination: flightData.destination.trim().toUpperCase(),
      scheduledTime: new Date(flightData.scheduledTime).toISOString(),
      gate: flightData.gate ? flightData.gate.trim() : '',
      status: flightData.status,
    };

    flights.push(newFlight);
    saveFlights(flights);
    saveNextId(nextId + 1);

    setTimeout(() => {
      resolve(newFlight);
    }, 100);
  });
}

// 更新航班
export function updateFlight(id, flightData) {
  return new Promise((resolve, reject) => {
    const flights = loadFlights();
    const flightIndex = flights.findIndex(f => f.id === parseInt(id, 10));

    if (flightIndex === -1) {
      setTimeout(() => {
        reject({ message: 'Flight not found' });
      }, 100);
      return;
    }

    const existingFlight = flights[flightIndex];
    const updatedData = { ...existingFlight, ...flightData };

    const validation = validateFlight(updatedData, false);

    if (!validation.isValid) {
      setTimeout(() => {
        reject({
          message: 'Validation failed',
          errors: validation.errors,
        });
      }, 100);
      return;
    }

    const updatedFlight = {
      ...updatedData,
      id: parseInt(id, 10),
      flightNumber: updatedData.flightNumber.trim(),
      airline: updatedData.airline.trim(),
      origin: updatedData.origin.trim().toUpperCase(),
      destination: updatedData.destination.trim().toUpperCase(),
      scheduledTime: new Date(updatedData.scheduledTime).toISOString(),
      gate: updatedData.gate ? updatedData.gate.trim() : '',
    };

    flights[flightIndex] = updatedFlight;
    saveFlights(flights);

    setTimeout(() => {
      resolve(updatedFlight);
    }, 100);
  });
}

// 删除航班
export function deleteFlight(id) {
  return new Promise((resolve, reject) => {
    const flights = loadFlights();
    const flightIndex = flights.findIndex(f => f.id === parseInt(id, 10));

    if (flightIndex === -1) {
      setTimeout(() => {
        reject({ message: 'Flight not found' });
      }, 100);
      return;
    }

    flights.splice(flightIndex, 1);
    saveFlights(flights);

    setTimeout(() => {
      resolve();
    }, 100);
  });
}

