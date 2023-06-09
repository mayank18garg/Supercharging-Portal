import React, { useRef, useState } from 'react';
import { Form, Button, ButtonToolbar, Schema, CustomProvider, Input, Message, useToaster, Radio, RadioGroup, SelectPicker } from 'rsuite';
import { updateContactInfo } from '../../services/message.service';
import ReactGA from 'react-ga4';
import { Mixpanel } from '../../Mixpanel';

const { StringType } = Schema.Types;

const model = Schema.Model({
  firstName: StringType().isRequired('This field is required.'),
  lastName: StringType().isRequired('This field is required.'),
  phone: StringType().isRequired('This field is required.'), 
  email: StringType().isRequired('This field is required'),
  address: StringType().isRequired('This field is required.')
});

const contactTypeData = ['Business contact', 'On-site contact', 'Technical contact', 'Other contact'].map(
  item => ({label: item, value: item})
);

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
      Contact will be updated in 72 hours!
    </Message>
);

const errormessage = (
  <Message showIcon type='error' closable>
    Error: Not submitted
  </Message>
);


export const ContactInformation = ({trt_id, userEmail}) => {

    const [contactType, setContactType] = useState("Business contact");
    const [formValue, setFormValue] = useState({
        firstName:"",
        lastName: "",
        phone: "",
        email: "",
        address: ""
    });
    const toaster = useToaster();
    const placement = 'topEnd';
    const formRef = useRef();

    const handleContactType = (value) => {
      setContactType(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formRef.current.check() || contactType == null){
            console.error("Form Error: Please fill all the fields");
            return;
        }
        ReactGA.event({
          category: "Submit button",
          action: "Contact Information Submitted"
        })
        updateContactInfo({trt_id, contactType, formValue}).then((response) => {

            if(response == null || response.data == null || response.data.error){
                toaster.push(errormessage,{placement, duration: 5000} );
                return;
            }
            else{
                setFormValue({
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email:"",
                    address: ""
                })
                setContactType(null);
                toaster.push(successmessage, {placement, duration: 5000});
            }
        }).catch((error) => {
            console.log(error);
        });
        Mixpanel.identify(userEmail);
        Mixpanel.track('Update Contact Info Submit');
        Mixpanel.people.set({$email: userEmail});

    }

    return (
        <CustomProvider theme='lite'>
            {/* <Form.Group controlId="contactType">
                <RadioGroup name="contactType" inline value={contactType} onChange={setContactType}>
                    <Radio value="Business Partner">Business Partner</Radio>
                    <Radio value="Legal Notice Address">Legal Notice Address</Radio>
                    <Radio value="Emergency">Emergency</Radio>
                    <Radio value="Prop Mgt"> Prop Mgt </Radio>
                </RadioGroup>
            </Form.Group> */}
            <Form ref={formRef} model={model} onChange={formValue => setFormValue(formValue)} formValue={formValue} >
                <TextField name="firstName" label="First Name" />
                <TextField name="lastName" label="Last Name" />
                <TextField name="phone" label="Phone" />
                <TextField name="email" label="Email" />
                <TextField name="address" label="Address" />
                <TextField name="contactType" label="Contact Type" accepter={SelectPicker} block={true} data={contactTypeData} onChange={handleContactType}
                  defaultValue="Business contact"
                  value={contactType}
                  cleanable={false}
                  searchable={false}
                 />
                <ButtonToolbar>
                  <Button appearance='primary' type="submit" onClick={handleSubmit}>
                      Submit
                  </Button>
                </ButtonToolbar>
            </Form>
        </CustomProvider>
    );
}