// Utility functions
function showStatus(elementId, message, type) {
  const statusDiv = document.getElementById(elementId);
  if (!statusDiv) return;

  statusDiv.innerHTML = `<div class="status ${type}">${message}</div>`;

  if (type === "success" || type === "error") {
    setTimeout(() => {
      statusDiv.innerHTML = "";
    }, 5000);
  }
}

function setLoading(button, isLoading) {
  if (!button) return;

  button.disabled = isLoading;
  const originalContent = button.innerHTML;

  if (isLoading) {
    button.dataset.originalContent = originalContent;
    button.innerHTML = '<span class="spinner"></span> <span>Loading...</span>';
  } else {
    button.innerHTML = button.dataset.originalContent || originalContent;
  }
}

// GitHub form handling
const githubForm = document.getElementById("githubForm");
if (githubForm) {
  githubForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const urlInput = document.getElementById("githubUrl");
    const submitBtn = document.getElementById("submitGithub");
    const githubStatusId = "githubStatus";

    const url = urlInput.value.trim();

    // Basic client-side pattern validation
    const repoRegex = /^https?:\/\/github\.com\/[^\s\/]+\/[^\s\/]+(?:\/.+)?$/i;
    if (!repoRegex.test(url)) {
      showStatus(
        githubStatusId,
        "Please enter a valid GitHub repo URL (https://github.com/owner/repo)",
        "error"
      );
      return;
    }

    setLoading(submitBtn, true);
    showStatus(githubStatusId, "Fetching repository data...", "info");

    try {
      // Demo mode - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In production, uncomment this:
      /*
            const res = await fetch("/ai/generate-readMe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
              const errMsg = data.error || `HTTP error ${res.status}`;
              throw new Error(errMsg);
            }

            const message = data.message || "Repository loaded successfully.";
            showStatus(githubStatusId, message, "success");
            console.log("GitHub fetch result:", data);
            */

      // Demo success message
      showStatus(
        githubStatusId,
        "Repository loaded successfully! (Demo mode)",
        "success"
      );
    } catch (err) {
      console.error("GitHub fetch error:", err);
      showStatus(githubStatusId, `Error: ${err.message}`, "error");
    } finally {
      setLoading(submitBtn, false);
    }
  });
}
