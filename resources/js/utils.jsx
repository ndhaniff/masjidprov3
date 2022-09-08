import Data from "./Config/Forms";

export const _i = (key, value) => {
    let splitKey = key.split(".");
    if (!value) {
        return "N/A";
    }
    if (splitKey.length > 1) {
        return Data[splitKey[0]][splitKey[1]].find((data) => {
            return data.value == value;
        }).text;
    } else {
        return Data[key].find((data) => {
            return data.value == value;
        }).text;
    }
};
