import React, { useRef, useState } from 'react';
import { Form, Button, ButtonToolbar, Schema, CustomProvider, Input, Message, useToaster, Uploader } from 'rsuite';
import { sendFormData } from '../../services/message.service';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const customLocale = {
  fileType: 'File type is not supported',
  fileSize: 'File size exceeds the limit',
  chooseFile: 'Select File',
  upload: 'Upload',
  uploading: 'Uploading...',
  uploaded: 'Uploaded',
  uploadFailed: 'Upload failed',
  cancel: 'Cancel',
  retry: 'Retry',
  delete: 'Delete',
  preview: 'Preview',
  drag: 'Drag files here',
  dragTips: 'Release to upload',
};

const { StringType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired('This field is required.'),
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}

const message = (
    <Message showIcon type='success' closable>
      Ticket Form Successfully submitted!
    </Message>
);

const errormessage = (
  <Message showIcon type='error' closable>
    Error: Not submitted
  </Message>
);

const maxFileErrormessage = (
  <Message showIcon type='error' closable>
    Error: File size exceeds the limit of 2MB.
  </Message>
);

export const FormComp = ({trt_id, site_name, issueTicketData, setissueTicketData, userEmail}) => {
    // const { user } = useAuth0();
    // const userEmail = user.name;
    const [formValue, setFormValue] = useState({
        title:"",
        description: ""
    });
    const [filelist, setFilelist] = useState(null);
    const toaster = useToaster();
    const placement = 'topEnd';
    const formRef = useRef();
    const handleFileUpload = (file) => {
      console.log(file);
      if(file.length > 0){
      console.log(file.size);
      setFilelist(file[0].blobFile);
      // setFilelist(file.blobFile);
      }
      else{
        setFilelist(null);
      }
    };

    const handleShouldUpload = (file) => {
      console.log(file[0].blobFile.size);
      if(file[0].blobFile.size > 2 * 1024 * 1024){
        toaster.push(maxFileErrormessage,{placement, duration: 5000} );
        return false;
      }
      return true;
    }
    const handleSubmit = (e) => {
        if(!formRef.current.check()){
            console.error("Form Error");
            return;
        }
        sendFormData({formValue, userEmail, trt_id, site_name, filelist }).then((response) => {
          setissueTicketData(!issueTicketData);
          if(response.data == null){
            toaster.push(errormessage,{placement, duration: 5000} );
          }
          else{
          toaster.push(message, {placement, duration: 5000});
          }
            
          }).catch((error) => {
          console.log(error);
        });

        document.getElementById("title-3").value = "";
        document.getElementById("description-3").value = "";
        
        setFormValue({
          title: "",
          description: ""
          // file: null
        });         

    }

    return (
        <CustomProvider theme='lite'>
        <Form ref={formRef} model={model} onChange={setFormValue} onSubmit={handleSubmit} formValue={formValue}>
        <TextField name="title" label="Title" />
        <TextField name="description" label="Description" accepter={Textarea} rows={5}/>
        {/* <Uploader action="" onChange={handleFileUpload} multiple={false} /> */}
        <TextField name="file" label="Attachment" accepter={Uploader} onChange={handleFileUpload} action="#" autoUpload={false} shouldQueueUpdate={handleShouldUpload} />
        <ButtonToolbar>
            <Button appearance="primary" type="submit">
            Submit
            </Button>
        </ButtonToolbar>
        </Form>
        </CustomProvider>
    );
}