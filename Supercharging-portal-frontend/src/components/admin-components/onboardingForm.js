import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, ButtonToolbar, Schema, CustomProvider, Input, Message, useToaster, TagInput } from 'rsuite';
import { createOnBoardingForm } from '../../services/message.service';


const { StringType } = Schema.Types;

const model = Schema.Model({
  userEmail: StringType().isRequired('This field is required.')
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

export const OnBoardingForm = () => {

    const [trtlist, settrtlist] = useState({
        trt_id: [],
        siteName: [],
        siteWebsite: [],
        siteAddress: [],
        phone: []
    });
    const [formValue, setFormValue] = useState({
        userEmail:""
    });
    const toaster = useToaster();
    const placement = 'topCenter';
    const formRef = useRef();

    const handleSubmit = (e) => {
        // e.preventDefault();
        if(!formRef.current.check() || trtlist.trt_id.length === 0){
            console.error("Form Error");
            return;
        }

        createOnBoardingForm({formValue, trtlist}).then((response) => {
            console.log(response);
            if(response.data == null || response.data.error){
                toaster.push(errormessage,{placement, duration: 5000} );
                return;
            }
            else{
                toaster.push(successmessage, {placement, duration: 5000});
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleTrtIDChange = (data) =>{
        settrtlist({...trtlist, trt_id: data});
    }
    const handleSiteNameChange = (data) => {
        settrtlist({...trtlist, siteName: data});
    }
    const handleSiteWebsiteChange = (data) => {
        settrtlist({...trtlist, siteWebsite: data});
    }
    const handleSiteAddressChange = (data) => {
        settrtlist({...trtlist, siteAddress: data});
    }
    const handleSitePhoneChange = (data) => {
        settrtlist({...trtlist, phone: data});
    }
    return (
        <CustomProvider theme='lite'>
            <Form ref={formRef} model={model} onChange={setFormValue} formValue={formValue}>
                <TextField name="userEmail" label="Email" />
            </Form>
            <div style={{display: 'flex', flexDirection:'column', margin: 35, justifyContent:'space-between'}}>
                <label style={{marginLeft:7}}>TRT_ID</label>
                <TagInput 
                    onChange={handleTrtIDChange}
                    style={{width: 300,margin:4}}
                />
            </div>
            <div style={{display: 'flex', flexDirection:'column', margin: 35, justifyContent:'space-between'}}>
                <label style={{marginLeft:7}}>Site_name</label>
                <TagInput 
                    onChange={handleSiteNameChange}
                    style={{width: 300,margin:4}}
                />
            </div>
            <div style={{display: 'flex', flexDirection:'column', margin: 35, justifyContent:'space-between'}}>
                <label style={{marginLeft:7}}>Site_Website</label>
                <TagInput 
                    onChange={handleSiteWebsiteChange}
                    style={{width: 300,margin:4}}
                />
            </div>
            <div style={{display: 'flex', flexDirection:'column', margin: 35, justifyContent:'space-between'}}>
                <label style={{marginLeft:7}}>Site_Address</label>
                <TagInput 
                    onChange={handleSiteAddressChange}
                    style={{width: 300,margin:4}}
                />
            </div>
            <div style={{display: 'flex', flexDirection:'column', margin: 35, justifyContent:'space-between'}}>
                <label style={{marginLeft:7}}>Site_Phone</label>
                <TagInput 
                    onChange={handleSitePhoneChange}
                    style={{width: 300,margin:4}}
                />
            </div>
            <ButtonToolbar>
                <Button appearance='primary' type="submit" onClick={handleSubmit} color="#3885ff">
                    Submit
                </Button>
            </ButtonToolbar>
        </CustomProvider>
    );
}