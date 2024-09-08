import React, { useEffect, useRef } from 'react';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';

const FileUploader = () => {
  const dropzoneRef = useRef(null);

  useEffect(() => {
    if (dropzoneRef.current) {
      Dropzone.autoDiscover = false;

      const myDropzone = new Dropzone(dropzoneRef.current, {
        url: 'https://httpbin.org/post', // Dummy endpoint for testing
        paramName: 'file',
        maxFilesize: 2, // MB
        addRemoveLinks: true, // This adds a remove link to each file
        dictRemoveFile: 'Remove', // Customize the remove link text
        accept: function (file, done) {
          if (file.name === 'justinbieber.jpg') {
            done("Naha, you don't.");
          } else {
            done();
          }
        },
        init: function () {
          this.on('addedfile', function (file) {
            console.log('File added:', file.name);
          });
          this.on('success', function (file, response) {
            console.log('File uploaded successfully:', file.name);
            console.log('Server response:', response);
          });
          this.on('error', function (file, errorMessage) {
            console.error('Error uploading file:', file.name, errorMessage);
          });
          this.on('complete', function (file) {
            console.log('Upload complete for file:', file.name);
          });
          this.on('removedfile', function (file) {
            console.log('File removed:', file.name);
            // you can do something further here
          });
        },
      });

      return () => {
        myDropzone.destroy();
      };
    }
  }, []);

  return (
    <form
      ref={dropzoneRef}
      action="https://httpbin.org/post"
      className="dropzone"
      id="my-great-dropzone"
    >
      <div className="dz-message" data-dz-message>
        <span>Drop files here or click to upload</span>
      </div>
    </form>
  );
};

export default FileUploader;
