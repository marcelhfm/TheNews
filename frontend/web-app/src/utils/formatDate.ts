import { t } from "i18next";

export const formatDate = (date: Date): string => {
  const minutesText = t("IndexPage.Authenticated.MinutesAgo");

  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();

  if (diffInMilliseconds < 60 * 60 * 1000) {
    // Less than an hour ago
    const minutesAgo = Math.floor(diffInMilliseconds / (60 * 1000));
    return minutesText.replace("XXX", minutesAgo.toString());
  } else if (
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear()
  ) {
    // Today
    const formatter = new Intl.DateTimeFormat("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formatter.format(date);
  } else {
    // Older than today
    const formatter = new Intl.DateTimeFormat("de-DE", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formatter.format(date);
  }
};
