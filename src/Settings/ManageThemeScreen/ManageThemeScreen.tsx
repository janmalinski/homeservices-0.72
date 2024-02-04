import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  ColorSchemeName
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

import Colors from '@src/components/designSystem/colors';
import { get, save } from '@src/utils/StorageMMKV';
import { ThemeContext } from '@src/context/ThemeContext';
import { Checkbox } from '@src/components';

type TTheme = 'dark' | 'light' | 'default';

const ManageThemeScreen = () => {

  console.log("TEST")

  const { theme, setTheme } = useContext<any>(ThemeContext);

    const [initialValue, setInitialValue] = useState(0);

    const defaultTheme = useColorScheme();

    const getAppTheme = useCallback(async () => {

      const themeColor = await get('Theme');
      const isDefault = await get('IsDefault');
      isDefault ? themeOperations('default') : themeOperations(themeColor);
    }, []);
  
    const setThemeColor = useCallback((themeColor: ColorSchemeName, isDefault: boolean) => {
      save('Theme', theme);
      save('IsDefault', isDefault);
      setTheme(themeColor)
    }, []);

    useEffect(() => {
      getAppTheme();
    }, [getAppTheme]);

    const data = [
      {
        label: 'Light Mode',
        value: 'light',
      },
      {
        label: 'Dark Mode',
        value: 'dark',
      },
      {
        label: 'System Default',
        value: 'default',
      },
    ];

    const themeOperations = useCallback((theme: TTheme) => {
        switch (theme) {
          case 'dark':
            setThemeColor(theme, false);
            setInitialValue(2);
            return;
          case 'light':
            setThemeColor(theme, false);
            setInitialValue(1);
            return;
          case 'default':
            setThemeColor(defaultTheme, true);
            setInitialValue(3);
            return;
        }
      }, []);

      const styles = styling(theme);

  return ( 
    <View style={styles.container}>
        <Text style={styles.textStyle}>
        This is demo of default dark/light theme with switch/Buttons using asycn
        storage.
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Type here"
        placeholderTextColor={Colors[theme]?.gray}
      />
      <TouchableOpacity style={styles.touchableStyle}>
        <Text style={styles.buttonTextStyle}>Button</Text>
      </TouchableOpacity>
      {data.map(item =>(
        <Checkbox
          key={item.value}
          checked={item.value === theme && initialValue !== 3|| item.value === 'default' && initialValue === 3}
          onPress={()=>themeOperations(item?.value as TTheme)}
          label={item.label}
        />
      ))}
   
    </View>
  );
};

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Colors[theme]?.themeColor,
      paddingHorizontal: 20,
    },
    textStyle: {
      color: Colors[theme]?.white,
    },
    textInputStyle: {
      borderColor: Colors[theme]?.gray,
      padding: 10,
      borderWidth: 2,
      borderRadius: 5,
      width: '100%',
      marginTop: 20,
      color: Colors[theme]?.white,
    },
    touchableStyle: {
      padding: 10,
      borderRadius: 6,
      width: '100%',
      height: 57,
      justifyContent: 'center',
      marginTop: 20,
    },
    buttonTextStyle: {
      textAlign: 'center',
      color: Colors[theme]?.commonWhite,
      fontSize: 20,
      fontWeight: '500',
    },
  });

export default ManageThemeScreen;