export const thinkReplacement = (text: string) => {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
};

export function formatLLMTextToHTML(input: string): string {
  let formatted = input;

  // Convert **bold** to <strong>
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Convert numbered list to <ol><li>...</li></ol>
  formatted = formatted.replace(
    /(\d+)\.\s(.+?)(?=\d+\.|\n|$)/gs,
    (_, num, item) => {
      const lines = item
        .trim()
        .split("\n")
        .map((line) => `<li>${line.trim()}</li>`)
        .join("");
      return `<ol start="${num}">${lines}</ol>`;
    }
  );

  // Convert bullet points to <ul><li>...</li></ul>
  formatted = formatted.replace(
    /(?:^|\n)[-–•]\s(.+?)(?=\n[-–•]|\n\d+\.|\n|$)/gs,
    (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((line) => {
          const cleaned = line.replace(/^[-–•]\s/, "");
          return `<li>${cleaned}</li>`;
        })
        .join("");
      return `<ul>${items}</ul>`;
    }
  );

  // Replace newlines with <br> for spacing (optional)
  formatted = formatted.replace(/\n+/g, "<br/>");

  return formatted.trim();
}
