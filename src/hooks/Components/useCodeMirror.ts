import { useEffect, useRef, useState } from "react";
import { basicSetup, EditorView } from "codemirror";
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from "@codemirror/lang-markdown";
import { keymap } from "@codemirror/view";

interface PropType {
  updateHandler: any;
}

const useCodeMirror = ({ updateHandler }: PropType) => {
  const [view, setView] = useState<EditorView | null>(null);

  const editorRef = useRef();

  useEffect(() => {
    if (!view) {
      const view = new EditorView({
        doc: "",
        extensions: [
          basicSetup,
          markdown({ base: markdownLanguage }),
          keymap.of(markdownKeymap),
          updateHandler,
        ],
        parent: editorRef.current,
      });
      setView(view);
    }
  }, []);

  return { view, editorRef, setView };
};

export default useCodeMirror;
