import { ActivityLog, ActivityLogStatus } from 'src/redux/api/activityLogApi';

/**
 * Retrieves the latest pending activity log from the given array.
 *
 * @param {ActivityLog[]} activityLogArray - array of activity logs.
 * @returns {ActivityLog | undefined} The latest pending activity log, or undefined if not found.
 */
export const getLatestPendingActivityLog = (
  activityLogArray: ActivityLog[]
): ActivityLog | undefined =>
  activityLogArray.find((item) => item.status === ActivityLogStatus.Pending);
