import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, ButtonToolbar, Schema, CustomProvider, Input, Message, useToaster } from 'rsuite';
import { getSiteInfo } from '../../services/message.service';
import { useAuth0 } from '@auth0/auth0-react';
import { updateSiteInfo } from '../../services/message.service';

const { StringType } = Schema.Types;

const model = Schema.Model({
  siteName: StringType().isRequired('This field is required.'),
  siteWebsite: StringType().isRequired('This field is required.'),
  siteAddress: StringType().isRequired('This field is required.'), 
  phone: StringType().isRequired('This field is required.')
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
      Change will appear to Drivers in 48 hours!
    </Message>
);

const errormessage = (
  <Message showIcon type='error' closable>
    Error: Not submitted
  </Message>
);

export const SiteInfoForm = ({trt_id, setSite_name}) => {
    const { user } = useAuth0();
    const userEmail = user.name;
    const [message, setMessage] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    const [formValue, setFormValue] = useState({
        siteName:"",
        siteWebsite: "",
        siteAddress: "",
        phone: ""
    });
    const toaster = useToaster();
    const placement = 'topCenter';
    const formRef = useRef();
    useEffect(() => {
        let isMounted = true;
        const getMessage = async () => {
          const {data, error} = await getSiteInfo({userEmail, trt_id});
          if(!isMounted){
            return;
          }
    
          if(data){
            setMessage(data);
            setFormValue({
                siteName: data.siteName,
                siteWebsite: data.siteWebsite,
                siteAddress: data.siteAddress,
                phone: data.phone
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
    }, [userEmail, trt_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formRef.current.check()){
            console.error("Form Error");
            return;
        }
        console.log("inside_handleSubmit", formValue);

        updateSiteInfo({userEmail, trt_id, formValue}).then((response) => {
            if(response.data == null || response.data.error){
                toaster.push(errormessage,{placement, duration: 5000} );
                return;
            }
            else{
                console.log(response);
                setFormValue({
                    siteName: response.data[0].siteName,
                    siteWebsite: response.data[0].siteWebsite,
                    siteAddress: response.data[0].siteAddress,
                    phone: response.data[0].phone
                })
                setSite_name(response.data[0].siteName);
                toaster.push(successmessage, {placement, duration: 5000});
                setReadOnly(!readOnly);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <CustomProvider theme='dark'>
            <Form ref={formRef} model={model} onChange={setFormValue} formValue={formValue} readOnly={readOnly}>
                <TextField name="siteName" label="Property Name" />
                <TextField name="siteWebsite" label="Commerical Website" />
                <TextField name="siteAddress" label="Site Address" />
                <TextField name="phone" label="Phone" />
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