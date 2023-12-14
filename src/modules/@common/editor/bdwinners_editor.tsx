import UniditEditor from "@techzolab/zodit-react";
import "@techzolab/zodit/build/zodit.min.css";

const buttonSmall = [
  "bold",
  "italic",
  "underline",
  "align",
  "ul",
  "ol",
  "paragraph",
  "|",
  "source",
];

const buttonMedium = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "justify",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  "|",
];
const buttonLarge = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "justify",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  "|",
];

interface propTypes {
  name?: string;
  width?: any;
  height?: any;
  className?: string;
  contents?: any;
  onChange?: any;
  onBlur?: any;
  btnOptionSize?: string;
}

function TextEditor({
  name,
  width,
  height,
  className,
  contents,
  onChange,
  onBlur,
  btnOptionSize = "small",
}: propTypes) {
  const btnFn = () => {
    if (btnOptionSize == "large") {
      return buttonLarge;
    } else if (btnOptionSize == "medium") {
      return buttonMedium;
    } else {
      return buttonSmall;
    }
  };

  const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    buttons: btnFn(),
    uploader: {
      insertImageAsBase64URI: true,
    },
    width: 800,
    height: 300,
  };

  const target_name = name || "description";
  editorConfig.width = width || "auto";
  editorConfig.height = height || 300;

  return (
    <div
      style={{ margin: "0 auto" }}
      className={`zodit_editor ${className ?? null}`}
    >
      <UniditEditor
        value={contents}
        config={editorConfig}
        // onChange={(value: any) => {
        //   const target = { name: target_name, value: value, event: Event };
        //   onChange({ target, value });
        // }}
        onBlur={(value: any) => {
          const target = { name: target_name, value: value, event: Event };
          onBlur({ target, value });
        }}
      />
    </div>
  );
}

export default TextEditor;
