const fs = require("node:fs/promises");
const path = require("path");
const { ai, currentModel } = require("../utils/gemini.js");
const { readMePrompt } = require("../utils/prompt.js");
const {
  isValidGithubUrl,
  cleanMarkdownResponse,
  sanitizeGithubUrlForFilename,
  checkFileExists,
} = require("../utils/helpers.js");
const generateReadMeController = async (req, res) => {
  try {
    const githubUrl = req.body.githubUrl;

    if (!githubUrl) {
      return res.status(400).json({
        error: "GitHub link is required",
      });
    }

    if (!isValidGithubUrl(githubUrl)) {
      return res.status(400).json({
        error: "Invalid GitHub repository URL format",
      });
    }
    console.log(`Generating README for: ${githubUrl}`);

    // Generate content with timeout
    const response = await Promise.race([
      ai.models.generateContent({
        model: currentModel,
        contents: readMePrompt(githubUrl),
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 60000)
      ),
    ]);

    let generatedReadMe = response.text;

    if (!generatedReadMe) {
      throw new Error("No content generated");
    }
    generatedReadMe = cleanMarkdownResponse(generatedReadMe);

    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, "../generated-readmes");
    if (!(await checkFileExists(outputDir))) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    const sanitizedFileName = sanitizeGithubUrlForFilename(githubUrl);
    const filePath = path.join(outputDir, `ReadMe - ${sanitizedFileName}.md`);

    // Save to file
    await fs.writeFile(filePath, generatedReadMe);

    console.log(`Generated README for: ${githubUrl}`);
    console.log(`File saved at: ${filePath}`);

    res.status(200).json({
      message: "ReadMe content generated successfully",
      fileName: `ReadMe - ${sanitizedFileName}.md`,
      filePath: filePath,
      content: generatedReadMe,
    });
  } catch (error) {
    console.error("Generate README Error:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to generate README content";
    if (error.message.includes("timeout")) {
      errorMessage = "Request timeout - the repository may be too large";
    } else if (error.message.includes("API")) {
      errorMessage = "AI service error - please try again";
    }

    res.status(500).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  generateReadMeController,
};
