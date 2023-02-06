import React, {useMemo, useRef} from 'react';
import {toast} from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {uploadWebp} from '../../store/actions/uploadAction';
import {globalToasterError} from '../../utils/helper';
import {PropsRichText} from './dto/type';
export default function RichText({value, onChange}: PropsRichText) {
  const quillRef: any = useRef();
  const handleImageUpload = () => {
    const editor = quillRef.current.getEditor();
    const input: any = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      try {
        const file = input.files[0];
        if (file.size < 10000000) {
          const response = await uploadWebp(file);
          editor.insertEmbed(editor.getSelection(), 'image', response?.path);
        } else {
          toast.error('Ukuran file lebih dari 10MB');
        }
      } catch (err) {
        globalToasterError(err);
      }
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{header: [1, 2, 3, 4, 5, 6, false]}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
    }),
    [],
  );
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];
  return (
    <ReactQuill
      style={{marginBottom: '2rem', marginTop: '1rem', overflow: 'hidden'}}
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
}
