import type { DummyData } from "@/business/types";
import { create } from "zustand";

type State = {
  dummyData: DummyData;
  inSyncWithForm: boolean;
};

type Action = {
  setDummyData: (dummyData: State["dummyData"]) => void;
  clearDummyData: () => void;
  setInSyncWithForm: (inSyncWithForm: boolean) => void;
};

export const useDummyData = create<State & Action>((set) => ({
  dummyData: {},
  inSyncWithForm: true,
  setDummyData: (dummyData: DummyData) => set({ dummyData }),
  clearDummyData: () => set({ dummyData: {} }),
  setInSyncWithForm: (inSyncWithForm: boolean) => set({ inSyncWithForm }),
}));
