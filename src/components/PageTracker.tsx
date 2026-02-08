import { useEffect } from "react";
import { trackPageView } from "@/lib/tracking";

type PageTrackerProps = {
  title: string;
};

export default function PageTracker({ title }: PageTrackerProps) {
  useEffect(() => {
    trackPageView(window.location.pathname, title);
  }, [title]);

  return null;
}
