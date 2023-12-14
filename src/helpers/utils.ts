export const splitNameWithLastDot = (name: string) => {
  const lastDotIndex = name.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    const fileName = name.substring(0, lastDotIndex);
    const fileExtension = name.substring(lastDotIndex + 1);
    return [fileName, fileExtension];
  }
  // If there is no dot in the name
  return [name, ""];
};

export const formatBytes = (bytes: number) => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

//remove tags
export const remove_tags = (_html: any) => {
  let html = _html.toString();
  let strippedString = html.replace(/(<([^>]+)>)/gi, "");
  return strippedString;
};
//printe excerpt
export const excerpt = (_html: any, count = 100) => {
  const text = remove_tags(_html).toString().replaceAll("&nbsp;", " ");
  return text.slice(0, count) + (text.length > count ? "..." : "");
};
