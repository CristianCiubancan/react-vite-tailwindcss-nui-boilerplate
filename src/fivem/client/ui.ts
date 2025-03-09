// src/fivem/client/ui.ts
/// <reference types="@citizenfx/client" />

import { createFrontView, destroyFrontView } from './camera';


interface FrontViewData {
  action: 'on' | 'off';
}

RegisterNuiCallbackType('frontview');
on('__cfx_nui:frontview', (data: FrontViewData, cb: (returnData: any) => void) => {
  if (data.action === 'on') {
    createFrontView();
    cb({ status: 'ok', message: 'Front view enabled!' });
  } else if (data.action === 'off') {
    destroyFrontView();
    cb({ status: 'ok', message: 'Front view disabled!' });
  } else {
    cb({ status: 'error', message: 'Invalid action' });
  }
});

RegisterNuiCallbackType('openUI');
on('__cfx_nui:openUI', (_data: any, cb: (returnData: any) => void) => {
  console.log('Focusing NUI for openUI event');
  SetNuiFocus(true, true);
  cb({ status: 'ok', message: 'NUI focus set' });
});

RegisterNuiCallbackType('closeUI');
on('__cfx_nui:closeUI', (_data: any, cb: (returnData: any) => void) => {
  console.log('Removing NUI focus');
  SetNuiFocus(false, false);
  cb({ status: 'ok', message: 'NUI focus removed' });
});