import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, ButtonToolbar, Schema, CustomProvider, Input, Message, useToaster, Radio, RadioGroup } from 'rsuite';
import { getContactInfo } from '../../services/message.service';
import { useAuth0 } from '@auth0/auth0-react';
import { updateContactInfo } from '../../services/message.service';

const { StringType } = Schema.Types;

const model = Schema.Model({
  firstName: StringType().isRequired('This field is required.'),
  lastName: StringType().isRequired('This field is required.'),
  phone: StringType().isRequired('This field is required.'), 
  email: StringType().isRequired('This field is required'),
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
      Contact will be updated in 48 hours!
    </Message>
);

const errormessage = (
  <Message showIcon type='error' closable>
    Error: Not submitted
  </Message>
);

export const ContactInformation = ({trt_id}) => {
    const { user } = useAuth0();
    const userEmail = user.name;
    const [message, setMessage] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    const [contactType, setContactType] = useState("Business Partner");
    const [formValue, setFormValue] = useState({
        firstName:"",
        lastName: "",
        phone: "",
        email: "",
        address: ""
    });
    const toaster = useToaster();
    const placement = 'topCenter';
    const formRef = useRef();
    useEffect(() => {
        let isMounted = true;
        const getMessage = async () => {
          const {data, error} = await getContactInfo({trt_id, contactType});
          if(!isMounted){
            return;
          }
    
          if(data){
            setMessage(data);
            setFormValue(data);
          }
    
          if(error){
            setMessage(data);
          }
        };
    
        getMessage();
    
        return () => {
          isMounted = false;
        };
    }, [contactType, trt_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formRef.current.check()){
            console.error("Form Error");
            return;
        }
        // console.log("inside_handleSubmit", formValue, contactType);

        updateContactInfo({trt_id, contactType, formValue}).then((response) => {
            console.log("#############", response.data.firstName);
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

    }

    return (
        <CustomProvider theme='dark'>
            <Form.Group controlId="contactType">
                <RadioGroup name="contactType" inline value={contactType} onChange={setContactType}>
                    <Radio value="Business Partner">Business Partner</Radio>
                    <Radio value="Legal Notice Address">Legal Notice Address</Radio>
                    <Radio value="Emergency">Emergency</Radio>
                    <Radio value="Prop Mgt"> Prop Mgt </Radio>
                </RadioGroup>
            </Form.Group>
            <Form ref={formRef} model={model} onChange={formValue => setFormValue(formValue)} formValue={formValue} readOnly={readOnly}>
                <TextField name="firstName" label="First Name" />
                <TextField name="lastName" label="Last Name" />
                <TextField name="phone" label="Phone" />
                <TextField name="email" label="Email" />
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