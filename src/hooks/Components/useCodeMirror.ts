import { useEffect, useRef, useState } from "react";
import { basicSetup, EditorView, EditorState } from "codemirror";
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from "@codemirror/lang-markdown";
import { keymap } from "@codemirror/view";
import { useRecoilState } from "recoil";
import { liveCodeContentSetter } from "@/store/liveCode";

interface PropType {
  updateHandler: any;
}

const useCodeMirror = ({ updateHandler }: PropType) => {
  const [view, setView] = useState<EditorView | null>(null);
  const [, setliveCodeSetter] = useRecoilState(liveCodeContentSetter);

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
        // mode: "python",
      });
      setView(view);
    }

    setliveCodeSetter({
      func: (code: string) => {
        console.log(code);
        console.log(view);

        view.dispatch({
          changes: [{ from: 0, to: view.state.doc.length, insert: code }],
        });
      },
    });
  }, [view]);

  return { view, editorRef, setView };
};

export default useCodeMirror;
