import { useEffect } from "react";

/**
 * Hook to monitor performance metrics
 * @param {string} componentName - Name of the component to monitor
 */
export const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Log render time in development
      if (process.env.NODE_ENV === "development") {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }

      // In production, you might want to send this to analytics
      if (process.env.NODE_ENV === "production" && renderTime > 100) {
        // Example: Send slow render metrics to analytics
        // analytics.track('slow_render', { component: componentName, renderTime });
      }
    };
  });

  useEffect(() => {
    // Monitor memory usage if available
    if (performance.memory) {
      const memoryInfo = {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      };

      if (process.env.NODE_ENV === "development") {
        console.log(`${componentName} memory usage:`, memoryInfo);
      }
    }
  }, [componentName]);
};
