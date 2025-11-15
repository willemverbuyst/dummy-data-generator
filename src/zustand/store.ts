import type { DummyData } from "@/lib/types";
import { create } from "zustand";

export type State = {
  dummyData: DummyData;
  inSyncWithForm: boolean;
  isGenerating: boolean;
};

export type Action = {
  setDummyData: (dummyData: State["dummyData"]) => void;
  clearDummyData: () => void;
  setInSyncWithForm: (inSyncWithForm: boolean) => void;
  setIsGenerating: (isGenerating: boolean) => void;
};

export const useDummyData = create<State & Action>((set) => ({
  dummyData: {},
  inSyncWithForm: true,
  isGenerating: false,
  setDummyData: (dummyData: DummyData) => set({ dummyData }),
  clearDummyData: () => set({ dummyData: {} }),
  setInSyncWithForm: (inSyncWithForm: boolean) => set({ inSyncWithForm }),
  setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
}));
