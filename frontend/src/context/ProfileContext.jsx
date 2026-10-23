import { createContext, useContext, useMemo, useState } from "react";
import { defaultProfile } from "@/data/mockData";

/**
 * Holds the student profile in React state.
 *
 * Everything here is mock/local for now, but the shape is the exact payload we
 * will later send to the backend alongside the learning question, e.g.
 *   { topic, goal, profile }
 */
const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);

  const value = useMemo(
    () => ({
      profile,
      // Merge a partial patch into the profile (used by the profile form).
      saveProfile: (patch) => setProfile((p) => ({ ...p, ...patch })),
      // Initials for the avatar, derived instead of stored.
      initials: (profile.name || "?").trim().charAt(0).toUpperCase(),
    }),
    [profile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

/** Read the student profile anywhere inside the app shell. */
export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside <ProfileProvider>");
  return ctx;
}
