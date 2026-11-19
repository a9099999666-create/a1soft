"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  type Brief,
  type BriefStatus,
  sampleBriefs,
  removeBrief,
  restoreSamples,
  updateBriefStatus,
} from "@/lib/briefs";

const STORAGE_KEY = "a1soft.briefs.v1";
const EMPTY_SNAPSHOT = JSON.stringify(sampleBriefs);

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("a1soft-briefs", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("a1soft-briefs", onStoreChange);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function getServerSnapshot() {
  return EMPTY_SNAPSHOT;
}

export function useBriefs() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const briefs = useMemo(() => {
    try {
      const parsed = JSON.parse(raw) as Brief[];
      return Array.isArray(parsed) ? parsed : sampleBriefs;
    } catch {
      return sampleBriefs;
    }
  }, [raw]);

  const setStatus = useCallback((id: string, status: BriefStatus) => {
    updateBriefStatus(id, status);
  }, []);

  const remove = useCallback((id: string) => {
    removeBrief(id);
  }, []);

  const restore = useCallback(() => {
    restoreSamples();
  }, []);

  return { briefs, ready: true, setStatus, remove, restore };
}
