import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (storageKey, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`@${storageKey}`, jsonValue);
        return true;
    } catch (e) {
        // saving error
        return false;
    }
}

export const getData = async storageKey => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@${storageKey}`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        return false;
    }
}

export const removeData = async storageKey => {
    try {
        await AsyncStorage.removeItem(`@${storageKey}`);
        return true;
    } catch (e) {
        // remove error
    }
}

export const clearData = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (e) {
        // clear error
        return false;
    }
}
