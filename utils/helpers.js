const fs = require("node:fs/promises");
const { URL } = require("node:url");

// Helper function to check if a file exists
const checkFileExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

// Validate GitHub URL format
function isValidGithubUrl(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== "github.com") {
      return false;
    }

    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
    // Should have at least owner/repo
    return pathParts.length >= 2;
  } catch {
    return false;
  }
}

// Function to clean markdown code blocks from response
function cleanMarkdownResponse(text) {
  if (!text) return text;

  // Remove ```markdown and ``` code blocks
  let cleaned = text
    .replace(/```markdown\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  // Remove any remaining code block wrappers
  //   cleaned = cleaned.replace(/^```[\w]*\n?|\n?```$/g, "").trim();

  return cleaned;
}

// Helper function to sanitize GitHub URL for filename
function sanitizeGithubUrlForFilename(url) {
  try {
    const parsedUrl = new URL(url);
    let repoPath = parsedUrl.pathname;

    // Remove leading/trailing slashes and replace remaining slashes with hyphens
    repoPath = repoPath.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");

    // Remove problematic characters
    repoPath = repoPath.replace(/[<>:"|?*]/g, "");

    return repoPath || "repository";
  } catch (error) {
    // Fallback to basic sanitization
    return url.replace(/[^a-zA-Z0-9-._]/g, "_").substring(0, 50);
  }
}

module.exports = {
  isValidGithubUrl,
  cleanMarkdownResponse,
  sanitizeGithubUrlForFilename,
  checkFileExists,
};
