import { create } from "zustand";

interface SettingsStore {

  settings:any;

  setSettings:
  (settings:any)=>void;

}

export const useSettingsStore =
create<SettingsStore>(
(set)=>({

  settings:null,

  setSettings:
  (settings)=>
  set({
    settings
  }),

})
);