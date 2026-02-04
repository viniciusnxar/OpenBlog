import { PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/lib/edgestore';
import './editor.css';

interface BlockNoteEditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const BlockNoteEditor = ({
  onChange,
  initialContent,
  editable,
}: BlockNoteEditorProps) => {
  const { edgestore } = useEdgeStore();
  const handleImageUploads = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });

    return res.url;
  };
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleImageUploads,
  });
  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      onChange={
        onChange
          ? () => {
              onChange(JSON.stringify(editor.document));
            }
          : () => {}
      }
      editable={editable}
    />
  );
};

export default BlockNoteEditor;
