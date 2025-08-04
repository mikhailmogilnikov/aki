import { LocalStorageService } from "~/shared/lib/services/storage/local-storage";
import type { Profile } from "./profile-provider";

const MAX_SNAPSHOTS = 10;

class ProfileSnapshotService {
  public capture(profile: Profile) {
    const timestamp = Date.now();

    const snapshots =
      LocalStorageService.getItem("profileSnapshots", "safe") || {};

    const snapshotCount = this.countSnapshots();

    if (snapshotCount >= MAX_SNAPSHOTS) {
      const oldestSnapshot = Object.keys(snapshots).sort()[0];
      delete snapshots[oldestSnapshot as keyof typeof snapshots];
    }

    LocalStorageService.setItem("profileSnapshots", {
      ...snapshots,
      [timestamp]: profile,
    });

    return timestamp;
  }

  private countSnapshots(): number {
    const snapshots =
      LocalStorageService.getItem("profileSnapshots", "safe") || {};

    return Object.keys(snapshots).length;
  }

  public getSnapshot(timestamp: string): Profile | null {
    const snapshots =
      LocalStorageService.getItem("profileSnapshots", "safe") || {};

    return snapshots[timestamp] ?? null;
  }

  public getLatestSnapshot(): Profile | null {
    const snapshots =
      LocalStorageService.getItem("profileSnapshots", "safe") || {};

    const sortedSnapshots = Object.keys(snapshots).sort();

    return (
      snapshots[
        sortedSnapshots[sortedSnapshots.length - 1] as keyof typeof snapshots
      ] ?? null
    );
  }

  public clearAllSnapshots() {
    LocalStorageService.setItem("profileSnapshots", {});
  }

  public clearLatestSnapshot() {
    const snapshots =
      LocalStorageService.getItem("profileSnapshots", "safe") || {};

    const sortedSnapshots = Object.keys(snapshots).sort();

    delete snapshots[
      sortedSnapshots[sortedSnapshots.length - 1] as keyof typeof snapshots
    ];

    LocalStorageService.setItem("profileSnapshots", snapshots);
  }
}

export const ProfileSnapshots = new ProfileSnapshotService();
