import { Extension } from '@tiptap/core';
import { PluginKey, Plugin } from '@tiptap/pm/state';
import { upload } from '../../../api/upload/upload';

const uploadImages = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('photos', file);
  });
  const response = await upload(formData);
  return response.data;
};

export const DropUploadImageExtension = Extension.create({
  name: 'dropUploadImage',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('dropUploadImage'),
        props: {
          handleDrop: (view, event) => {
            const files = event.dataTransfer?.files;
            if (!files || files.length === 0) return false;

            // Filter image files
            const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
            if (imageFiles.length === 0) return false;

            event.preventDefault();
            // Upload images to aws s3
            uploadImages(imageFiles)
              .then((data) => {
                if (data?.length) {
                  const { editor } = this;
                  const { state } = editor;
                  let { tr } = state;

                  // Insert images to the editor
                  data.forEach((fileData) => {
                    const { location } = fileData;
                    const node = editor.state.schema.nodes.image.create({ src: location });
                    tr = tr.insert(editor.state.selection.anchor, node);
                  });

                  // Dispatch the changes
                  view.dispatch(tr);
                }
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.error('Error handling image drops:', error);
              });
            return true;
          }
        }
      })
    ];
  }
});
