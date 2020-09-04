import AsyncStorage from '@react-native-community/async-storage';

const iap_key = 'kemetic_sidereal_calendar';
const welcome_key = 'kemetic_sidereal_calendar_welcome';

let isPurchased = false;
let isVisitedWelcome = false;

export const isPaidVersion = () => {
  return isPurchased;
};

export const isVisitedPaidWelcome = () => {
  return isVisitedWelcome;
};

export const saveStorageData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {}
};

export const getStorageData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {}
};

export const removeStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};

export const removePurchasedFromStorage = () => {
  removeStorageData(iap_key);
};

export async function savePurchasedOnStorage() {
  try {
    await AsyncStorage.setItem(iap_key, 'PAID');
    isPurchased = true;
    return isPurchased;
  } catch (error) {}
}

export async function syncPurchasedFromStorage() {
  try {
    const value = await AsyncStorage.getItem(iap_key);
    isPurchased = !!value;
    return value;
  } catch (error) {
    return null;
  }
}

export const removeShownPaidWelcome = () => {
  removeStorageData(welcome_key);
};

export async function saveShownPaidWelcome() {
  try {
    await AsyncStorage.setItem(welcome_key, 'VISITED');
    isVisitedWelcome = true;
    return isVisitedWelcome;
  } catch (error) {}
}

export async function syncShownPaidWelcome() {
  try {
    const value = await AsyncStorage.getItem(welcome_key);
    isVisitedWelcome = !!value;
    return value;
  } catch (error) {
    return null;
  }
}
