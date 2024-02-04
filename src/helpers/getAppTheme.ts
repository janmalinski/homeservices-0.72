import { get } from "@src/utils/StorageMMKV";
import { useCallback } from "react";



// export const getAppTheme = useCallback(async () => {
//     const theme = await get('Theme');
//     const isDefault = await get('IsDefault');
//     isDefault ? themeOperations('default') : themeOperations(theme);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);