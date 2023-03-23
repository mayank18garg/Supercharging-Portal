import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getSessionData = async ({dateData, trt_Id}) => {

  const config = {
    url: `${apiServerUrl}/api/sessionData/`,
    method: "GET",
    params:{
        trt_id: trt_Id,
        start_date: dateData.start_date,
        end_date: dateData.end_date
    },
    // headers: {
    //   "content-type": "application/json",
    // },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getKPIData = async ({dateData, trt_Id}) => {

  const config = {
    url: `${apiServerUrl}/api/kpiData/`,
    method: "GET",
    params:{
        trt_id: trt_Id,
        start_date: dateData.start_date,
        end_date: dateData.end_date
    },
    // headers: {
    //   "content-type": "application/json",
    // },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getProtectedResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/protected`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getAdminResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const sendFormData = async ({formValue, userEmail, trt_id, site_name}) => {

  console.log("Type:", formValue.textarea);
  // const dataSend = JSON.stringify(formValue)

  const config = {
    url: `${apiServerUrl}/api/issueTicket/`,
    method: "post",
    // params:{
    //     trt_id: trt_Id,
    //     start_date: dateData.start_date,
    //     end_date: dateData.end_date
    // },
    data: {
      userEmail: userEmail,
      trt_id: trt_id,
      site_name: site_name,
      title: formValue.title,
      type: formValue.type,
      description: formValue.description
    },
    headers: {
      "Content-Type": "application/json",
    },
    
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getissueTickets = async(trt_id) => {
  
  const config = {
    url: `${apiServerUrl}/api/issueTicket/`,
    method: "GET",
    params:{
      trt_id: trt_id
    },
    headers:{
      "Content-Type": "application/json"
    }
  };

  const { data, error } = await callExternalApi({config});

  return {
    data: data || null,
    error,
  };
}

export const getAllUserData = async() => {
  const config = {
    url: `${apiServerUrl}/api/userData/admin/getUsersData`,
    method: "GET",
    headers:{
      "Content-Type": "application/json"
    }
  }

  const {data, error} = await callExternalApi({config});

  return {
    data: data || null,
    error,
  };
}

export const getUserData = async(userEmail) => {
  const config = {
    url: `${apiServerUrl}/api/userData/`,
    method: "GET",
    params:{
      userEmail: userEmail
    },
    headers:{
      "Content-Type": "application/json"
    }
  }

  const {data, error} = await callExternalApi({config});

  return {
    data: data || null,
    error,
  };
}

export const getContactInfo = async({trt_id, contactType}) => {
  const config = {
    url: `${apiServerUrl}/api/contactInfo/getContact/`,
    method: "GET",
    params:{
      trt_id,
      contactType
    },
    headers:{
      "Content-Type": "application/json"
    }
  };

  const {data, error} = await callExternalApi({config});

  return {
    data: data || null,
    error,
  };
}

export const updateContactInfo = async({trt_id, contactType, formValue}) => {
  const config = {
    url: `${apiServerUrl}/api/contactInfo/updateContact/`,
    method: "PUT",
    data:{
      trt_id,
      contactType,
      formValue
    },
    headers:{
      "Content-Type": "application/json"
    }
  }
  const {data, error} = await callExternalApi({config});

  return {
    data: data || null,
    error,
  }
}

export const getSiteInfo = async({userEmail, trt_id}) => {
  console.log("getSiteInfo:", userEmail, trt_id);
  const config = {
    url: `${apiServerUrl}/api/siteInfo/getSite/`,
    method: "GET",
    params:{
      userEmail: userEmail,
      trt_id: trt_id
    },
    headers:{
      "Content-Type": "application/json"
    }
  };

  const {data, error} = await callExternalApi({config});

  return {
    data: data || null,
    error,
  };
}

export const updateSiteInfo = async({userEmail, trt_id, formValue}) => {
  const config = {
    url: `${apiServerUrl}/api/siteInfo/updateSite/`,
    method: "PUT",
    data:{
      userEmail,
      trt_id,
      formValue
    },
    headers:{
      "Content-Type": "application/json"
    }
  }
  const {data, error} = await callExternalApi({config});

  return {
    data: data || null,
    error,
  }
}


export const createOnBoardingForm = async ({formValue, trtlist}) => {

  const config = {
    url: `${apiServerUrl}/api/userData/admin/createUserData/`,
    method: "post",
    data: {
      userEmail: formValue.userEmail,
      contact:{
        firstName: formValue.contactfirstName,
        lastName: formValue.contactlastName,
        address: formValue.contactAddress,
        phone: formValue.contactPhone
      },
      trtlist: trtlist
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};