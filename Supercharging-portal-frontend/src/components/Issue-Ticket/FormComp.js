import React, { useRef, useState } from 'react';
import { Form, Button, ButtonToolbar, Schema, CustomProvider, Input, Message, useToaster } from 'rsuite';
import { sendFormData } from '../../services/message.service';
import { useAuth0 } from '@auth0/auth0-react';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const { StringType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired('This field is required.'),
  type: StringType().isRequired('This field is required.')
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
      Form Successfully submitted!
    </Message>
);

const errormessage = (
  <Message showIcon type='error' closable>
    Error: Not submitted
  </Message>
);

export const FormComp = ({trt_id, site_name, issueTicketData, setissueTicketData}) => {
    const { user } = useAuth0();
    const userEmail = user.name;
    const [formValue, setFormValue] = useState({
        title:"",
        type: "",
        description: ""
    });
    const toaster = useToaster();
    const placement = 'topCenter';
    const formRef = useRef();
    const handleSubmit = (e) => {
        if(!formRef.current.check()){
            console.error("Form Error");
            return;
        }
        sendFormData({formValue, userEmail, trt_id, site_name }).then((response) => {
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
        document.getElementById("type-3").value = "";
        document.getElementById("description-3").value = "";
        
        setFormValue({
          title: "",
          type: "",
          description: ""
        });         
        setissueTicketData(!issueTicketData);
    }

    return (
        <CustomProvider theme='dark'>
        <Form ref={formRef} model={model} onChange={setFormValue} onSubmit={handleSubmit} formValue={formValue}>
        <TextField name="title" label="Title" />
        <TextField name="type" label="Type" />
        <TextField name="description" label="Description" accepter={Textarea} rows={5}/>
        <ButtonToolbar>
            <Button appearance="primary" type="submit">
            Submit
            </Button>
        </ButtonToolbar>
        </Form>
        </CustomProvider>
    );
}