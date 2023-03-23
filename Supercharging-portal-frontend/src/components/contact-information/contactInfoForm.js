import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, ButtonToolbar, Schema, CustomProvider, Input, Message, useToaster } from 'rsuite';
import { getContactInfo } from '../../services/message.service';
import { useAuth0 } from '@auth0/auth0-react';
import { updateContactInfo } from '../../services/message.service';

const { StringType } = Schema.Types;

const model = Schema.Model({
  firstName: StringType().isRequired('This field is required.'),
  lastName: StringType().isRequired('This field is required.'),
  phone: StringType().isRequired('This field is required.'), 
  address: StringType().isRequired('This field is required.')
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

const successmessage = (
    <Message showIcon type='success' closable>
      Form Successfully submitted!
    </Message>
);

const errormessage = (
  <Message showIcon type='error' closable>
    Error: Not submitted
  </Message>
);

export const ContactInfoForm = () => {
    const { user } = useAuth0();
    const userEmail = user.name;
    const [message, setMessage] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    const [formValue, setFormValue] = useState({
        firstName:"",
        lastName: "",
        phone: "",
        address: ""
    });
    const toaster = useToaster();
    const placement = 'topCenter';
    const formRef = useRef();
    useEffect(() => {
        let isMounted = true;
        const getMessage = async () => {
          const {data, error} = await getContactInfo(userEmail);
          if(!isMounted){
            return;
          }
    
          if(data){
            setMessage(data);
            setFormValue({
                firstName: data.contact.firstName,
                lastName: data.contact.lastName,
                phone: data.contact.phone,
                address: data.contact.address
            })
          }
    
          if(error){
            setMessage(data);
          }
        };
    
        getMessage();
    
        return () => {
          isMounted = false;
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formRef.current.check()){
            console.error("Form Error");
            return;
        }

        updateContactInfo({userEmail, formValue}).then((response) => {
            if(response.data == null || response.data.error){
                toaster.push(errormessage,{placement, duration: 5000} );
                return;
            }
            else{
                setFormValue({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    phone: response.data.phone,
                    address: response.data.address
                })
                toaster.push(successmessage, {placement, duration: 5000});
                setReadOnly(!readOnly);
            }
        }).catch((error) => {
            console.log(error);
        });

        // document.getElementById("title-3").value = "";
        // document.getElementById("type-3").value = "";
        // document.getElementById("description-3").value = "";
        
        // setFormValue({
        //   title: "",
        //   type: "",
        //   description: ""
        // });         
        // setissueTicketData(!issueTicketData);
    }

    return (
        <CustomProvider theme='dark'>
            <Form ref={formRef} model={model} onChange={setFormValue} formValue={formValue} readOnly={readOnly}>
                <TextField name="firstName" label="First Name" />
                <TextField name="lastName" label="Last Name" />
                <TextField name="phone" label="Phone" />
                <TextField name="address" label="Address" />
                <ButtonToolbar>
                    {
                        readOnly ?
                        <Button onClick={() => setReadOnly(false)}>
                            Edit
                        </Button> :
                        <Button appearance='primary' type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    }
                </ButtonToolbar>
            </Form>
        </CustomProvider>
    );
}