window.initShopifySection = function(initCallback, sectionId = null) {
  if (typeof initCallback !== 'function') return;

  const runCallback = (container = null) => {
    console.log('[initShopifySection] Running callback...', container);
    initCallback(container);
  };

  // 1. Khởi tạo lần đầu
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (sectionId) {
        const container = document.querySelector(`[data-section-id="${sectionId}"]`);
        runCallback(container);
      } else {
        runCallback();
      }
    });
  } else {
    if (sectionId) {
      const container = document.querySelector(`[data-section-id="${sectionId}"]`);
      runCallback(container);
    } else {
      runCallback();
    }
  }

  // 2. Nếu đang trong Theme Editor
  if (window.Shopify && Shopify.designMode) {
    const reinitEvents = [
      'shopify:section:load',
      'shopify:section:select',
      'shopify:section:deselect',
      'shopify:section:reorder',
      'shopify:block:select',
      'shopify:block:deselect'
    ];

    reinitEvents.forEach(eventName => {
      document.addEventListener(eventName, (e) => {
        console.log(`[initShopifySection] Event triggered: ${eventName}`, e.detail);

        if (!sectionId || e.detail.sectionId === sectionId) {
          const container = document.querySelector(`[data-section-id="${e.detail.sectionId}"]`);
          requestAnimationFrame(() => {
            runCallback(container);
          });
        }
      });
    });
  }
};
