// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';
import { FlatList } from 'react-native';
jest.mock('react-native-push-notification', () => ({
    onRegister: jest.fn(),
    onNotification: jest.fn(),
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
}));
jest.mock('@react-native-community/push-notification-ios', () => {
    return {
        addEventListener: jest.fn(),
        requestPermissions: jest.fn(() => Promise.resolve()),
        getInitialNotification: jest.fn(() => Promise.resolve()),
    }
});
jest.mock('@react-native-firebase/messaging', () => ({
    messaging: jest.fn(() => ({
        hasPermission: jest.fn(() => Promise.resolve(true)),
        subscribeToTopic: jest.fn(),
        unsubscribeFromTopic: jest.fn(),
        requestPermission: jest.fn(() => Promise.resolve(true)),
        getToken: jest.fn(() => Promise.resolve('myMockToken')),
    })),
    notifications: jest.fn(() => ({
        onNotification: jest.fn(),
        onNotificationDisplayed: jest.fn(),
    })),
    analytics: jest.fn(() => ({
        logEvent: jest.fn(),
    })),
}));
jest.mock("@react-native-community/netinfo", () => ({
    fetch: () => Promise.resolve(jest.fn()),
    addEventListener: jest.fn(),
}));

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }) => children;
    return { KeyboardAwareScrollView };
});