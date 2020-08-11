import { Platform, Dimensions } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const DONATE_URL = 'https://www.theearthcenter.org/help-us/Donate';
export const JOIN_URL = 'https://www.theearthcenter.org/membership';
export const ABOUT_URL = 'https://www.theearthcenter.org/';
