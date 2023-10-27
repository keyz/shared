export function reindent(
  template: TemplateStringsArray,
  ...argList: Array<any>
): string {
  let result = "";

  for (let i = 0; i < template.length; i++) {
    result += template[i];

    if (i < argList.length) {
      result += String(argList[i]);
    }
  }

  const lineList = result.split("\n");

  if (lineList.length < 3) {
    // Too short
    return result;
  } else if (lineList[0].trim() !== "") {
    // First line not empty
    return result;
  } else if (lineList[lineList.length - 1].trim() !== "") {
    // Last line not empty
    return result;
  }

  const indent = lineList[1].match(/^\s*/)?.[0];

  if (indent == null) {
    // No indent
    return result;
  }

  return lineList
    .map((line) => {
      return line.replace(new RegExp(`^${indent}`), "");
    })
    .join("\n")
    .trim();
}
