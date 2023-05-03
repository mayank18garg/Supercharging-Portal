import { callExternalApi } from "./external-api.service";

// const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
const apiServerUrl = '';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getSessionData = async ({dateData, trt_Id}) => {
  
  const start_date = formatDate(dateData.start_date);
  const end_date = formatDate(dateData.end_date);
  console.log(start_date, end_date);
  const config = {
    url: `${apiServerUrl}/api/sessionData/`,
    method: "GET",
    params:{
        trt_id: trt_Id,
        start_date: start_date,
        end_date: end_date
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

  const start_date = formatDate(dateData.start_date);
  const end_date = formatDate(dateData.end_date);
  const config = {
    url: `${apiServerUrl}/api/kpiData/`,
    method: "GET",
    params:{
        trt_id: trt_Id,
        start_date: start_date,
        end_date: end_date
    },
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

export const sendFormData = async ({formValue, userEmail, trt_id, site_name, filelist}) => {

  // console.log("Type:", formValue.textarea);
  // const dataSend = JSON.stringify(formValue)
  let formdata = new FormData();
  formdata.append("userEmail", userEmail);
  formdata.append("trt_id", trt_id);
  formdata.append("site_name", site_name);
  formdata.append("title", formValue.title);
  formdata.append("description", formValue.description);
  formdata.append("file", filelist);
  // console.log("FileValue:", filelist);
  // console.log(formdata);
  for (var pair of formdata.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
  const config = {
    url: `${apiServerUrl}/api/issueTicket/`,
    method: "post",
    // params:{
    //     trt_id: trt_Id,
    //     start_date: dateData.start_date,
    //     end_date: dateData.end_date
    // },
    data: formdata,
    headers: {
      "Content-Type": 'multipart/form-data',
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


export const getMedianStallOccData = async ({dateData, trt_Id}) => {

  const start_date = formatDate(dateData.start_date);
  const end_date = formatDate(dateData.end_date);
  const config = {
    url: `${apiServerUrl}/api/medianStallData/`,
    method: "GET",
    params:{
        trt_id: trt_Id,
        start_date: start_date,
        end_date: end_date
    },
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

export const getUptimePercData = async ({dateData, trt_Id}) => {

  const start_date = formatDate(dateData.start_date);
  const end_date = formatDate(dateData.end_date);
  const config = {
    url: `${apiServerUrl}/api/uptimePercData/`,
    method: "GET",
    params:{
        trt_id: trt_Id,
        start_date: start_date,
        end_date: end_date
    },
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