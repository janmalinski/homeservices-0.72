import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationProp, useNavigation, useNavigationState } from '@react-navigation/native';

import { Button, FullScreenTemplate } from '@src/components';
import { LoginForm, ILoginFormData } from './LoginForm';
import { useAppDispatch } from '@src/store';
import { loginThunk } from '../authStore';
import { TRootNavigatorParams } from '@src/navigation/RootNavigator';
import { headerOptions } from '@src/navigation/RootNavigator';

const initialValues: ILoginFormData = {
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const navigation =
    useNavigation<NavigationProp<TRootNavigatorParams, 'Login'>>();

  const [isPending, setIsPending] = useState(false);

  const dispatch = useAppDispatch();

  const [t] = useTranslation();

  const routes = useNavigationState(state => state.routes);

  useEffect(() => {
    if(routes[routes.length - 2]?.name !== 'VerifyRegistrationCode'){
      navigation.setOptions({
        ...headerOptions
       })
    } else {
      navigation.setOptions({headerShown: false});
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      });
    }
  }, [navigation, routes])
  
  const loginHandler = useCallback(
    async (values: ILoginFormData) => {
      setIsPending(true)
      try {
        const res = await dispatch(loginThunk(values)).unwrap();
        if(res){
          setIsPending(false)
        }
      } catch (error) {
          console.log("ERROR", error);
          setIsPending(false);
      }
    },
    [dispatch],
  );

  const navigateToResetPassword = useCallback(() => {
    navigation.navigate('ResetPassword');
  }, [navigation]);
  console.log('IS_PENDING', isPending)

  return (
    <FullScreenTemplate safeArea paddedHotizontaly>
      <LoginForm
        initialValues={initialValues}
        onSubmit={loginHandler}
        isPending={isPending}
      />
      <View style={styles.row}>
        <Button
          variant="PRIMARY"
          title={t('login.forgotPassword')}
          onPress={navigateToResetPassword}
        />
      </View>
    </FullScreenTemplate>
  );
};

interface IStyles {
  row: ViewStyle;
}

const stylesDef: IStyles = {
  row: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
};

const styles = StyleSheet.create(stylesDef);
