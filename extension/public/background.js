// EchoGPT side-panel service worker (Manifest V3).
// Clicking the toolbar icon opens the real Chrome Side Panel.
// No UI changes here — the React app in index.html is untouched.

const PANEL_PATH = "index.html";

async function enableSidePanel() {
  try {
    if (chrome?.sidePanel?.setOptions) {
      await chrome.sidePanel.setOptions({
        path: PANEL_PATH,
        enabled: true
      });
    }
  } catch (e) {
    // Older Chrome without sidePanel options — panel still works via manifest default_path.
  }

  try {
    // Preferred: toolbar click opens the side panel instead of a popup.
    if (chrome?.sidePanel?.setPanelBehavior) {
      await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    }
  } catch (e) {
    // Ignore — fallback below handles the click manually.
  }
}

chrome.runtime.onInstalled.addListener(() => {
  enableSidePanel();
});

chrome.runtime.onStartup.addListener(() => {
  enableSidePanel();
});

// Fallback for Chrome versions that do not honor openPanelOnActionClick:
// open the panel explicitly when the toolbar icon is clicked.
if (chrome?.action?.onClicked) {
  chrome.action.onClicked.addListener(async (tab) => {
    try {
      if (chrome?.sidePanel?.open && tab?.windowId !== undefined) {
        await chrome.sidePanel.open({ windowId: tab.windowId });
        return;
      }
    } catch (e) {
      // No-op: panel can still be opened from the Side panels menu.
    }
  });
}

enableSidePanel();
