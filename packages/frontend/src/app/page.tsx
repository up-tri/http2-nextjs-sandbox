export default async function Home() {
  const texts: string[] = [];

  const pump = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
    const content = await reader.read();
    if (content.done) {
      return;
    }

    const value = new TextDecoder().decode(content.value);
    texts.push(value);

    await pump(reader);
  };

  const res = await fetch("http://localhost:8000/hello");
  const reader = res.body?.getReader();
  if (reader) {
    await pump(reader);
  }

  return (
    <div style={{ padding: "20px" }}>
      {texts.map((text, i) => (
        <p key={i} style={{ margin: "10px 0" }}>
          {text}
        </p>
      ))}
    </div>
  );
}
