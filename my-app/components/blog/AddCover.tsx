'use client';
import { useEdgeStore } from '@/lib/edgestore';
import { ImageIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AddCoverProps {
  setUploadedCover: (cover: string) => void;
  replaceUrl?: string;
}

const AddCover = ({ setUploadedCover, replaceUrl }: AddCoverProps) => {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleButtonClick = () => imgInputRef.current?.click();
  const edgeStore = useEdgeStore();

  useEffect(() => {
    let isMounted = true;
    const uploadImage = async () => {
      if (!file) return;
      setIsUploading(true);

      try {
        const res = await edgeStore.publicFiles.upload({
          file,
          options: replaceUrl ? { replaceTargetUrl: replaceUrl } : undefined,
        });
        if (isMounted && res.url) {
          setUploadedCover(res.url);
        }
      } catch (error) {
        console.log('Upload erro:', error);
      } finally {
        if (isMounted) {
          setIsUploading(false);
        }
      }
    };
    uploadImage();
    return () => {
      isMounted = false;
    };
  }, [file, edgeStore, replaceUrl, setUploadedCover]);
  return (
    <div>
      <input
        type='file'
        accept='image/'
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        ref={imgInputRef}
        className='hidden'
      />
      <button
        type='button'
        className='flex items-center gap-2'
        onClick={handleButtonClick}
      >
        <ImageIcon size={20} />
        <span>{!!replaceUrl ? 'Alterar Cover' : 'Add Cover'}</span>
      </button>
    </div>
  );
};

export default AddCover;
