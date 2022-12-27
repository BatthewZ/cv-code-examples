export function formatParagraphs(string: string) {
  const paragraphs = string.trim().split('\n\n');
  return (
    <>
      {paragraphs.map((p) => (
        <p>{formatLines(p)}</p>
      ))}
    </>
  );
}

export function formatLines(text: string) {
  if (!text.includes('\n')) return text;
  const lines = text.split('\n');
  return (
    <>
      {lines.map((l) => (
        <>
          {l}
          <br />
        </>
      ))}
    </>
  );
}
