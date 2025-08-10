function capitalize(text: string) {
  if (text.length === 0) return ""

  return text.at(0)?.toUpperCase() + text.slice(1).toLowerCase();
}

export { capitalize };
