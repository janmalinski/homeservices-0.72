import { useAppDispatch, useAppSelector } from '@src/store';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  selectGlobalToastState,
  selectIsGlobalToastVisible,
} from './toastSelectors';
import { hideGlobalToastAction } from './toastStore';
import { ToastComponent } from './ToastComponent/ToastComponent';

const MINIMAL_SHOW_TIME = 2000;

const MINIMAL_DATE = new Date(0);

const now = () => new Date();

export const GlobalToast = () => {
  const isGlobalToastVisible = useAppSelector(selectIsGlobalToastVisible);
  const globalToastState = useAppSelector(selectGlobalToastState);

  const [isToastVisibleCore, setIsToastVisibleCore] =
    useState<typeof isGlobalToastVisible>(isGlobalToastVisible);
  const [targetToastState, setTargetToastState] =
    useState<typeof globalToastState>();

  const dispatch = useAppDispatch();

  const hideTimeout = useRef<ReturnType<typeof setTimeout>>();
  const showTime = useRef<Date>(MINIMAL_DATE);
  const wasDismissed = useRef<boolean>(false);

  useEffect(() => {
    if (isGlobalToastVisible) {
      hideTimeout.current && clearTimeout(hideTimeout.current);
      showTime.current = now();
      wasDismissed.current = false;
      setIsToastVisibleCore(true);
    } else if (wasDismissed.current) {
      setIsToastVisibleCore(false);
    } else {
      const milisecondsSinceShow = now().getTime() - showTime.current.getTime();
      const delay = Math.max(MINIMAL_SHOW_TIME - milisecondsSinceShow, 0);
      hideTimeout.current = setTimeout(() => {
        setIsToastVisibleCore(false);
      }, delay);
      showTime.current = MINIMAL_DATE;
    }
  }, [isGlobalToastVisible]);

  useEffect(() => {
    if (globalToastState && globalToastState.message) {
      setTargetToastState(globalToastState);
    }
  }, [globalToastState]);

  const onHidden = useCallback(() => {
    wasDismissed.current = true;
    dispatch(hideGlobalToastAction());
  }, [dispatch]);

  return (
    <ToastComponent
      isVisible={isToastVisibleCore}
      onHidden={onHidden}
      bottomOffset={50}
      variant={targetToastState?.variant}
      text={targetToastState?.message || ''}
      buttonText={targetToastState?.btnLabel}
      onButtonPress={targetToastState?.btnCallback}
      isDismissable={targetToastState?.isDismissable}
      autoHideTimeout={targetToastState?.autoHideTimeout}
    />
  );
};
