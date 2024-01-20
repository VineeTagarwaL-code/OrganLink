// AUTH ENDPOINTS
export const authEndpoints = {
  SIGNUP_API: import.meta.env.VITE_BASE_URL + "/api/v1/accounts" + "/register",
  LOGIN_API: import.meta.env.VITE_BASE_URL + "/api/v1/accounts" + "/login",

  ADMINREQ_API: import.meta.env.VITE_BASE_URL + "/api/v1/admin" + "/requests",
  ADMINAPPROVE_API:
    import.meta.env.VITE_BASE_URL + "/api/v1/admin" + "/approve",
};

export const userEndpoints = {
  DONATE_API: import.meta.env.VITE_BASE_URL + "/api/v1/organs",
  GET_INSTITUTE_ORGANS:
    import.meta.env.VITE_BASE_URL + "/api/v1/organs/hospital",
  GET_ONE_ORGAN: import.meta.env.VITE_BASE_URL + "/api/v1/organs/one",
  GET_ALL_ORGANS: import.meta.env.VITE_BASE_URL + "/api/v1/organs/all",
  UPLOAD_CERTIFICATE_API:
    import.meta.env.VITE_BASE_URL + "/api/v1/files/upload",
  FILTER_ORGAN_API: import.meta.env.VITE_BASE_URL + "/api/v1/organs/filter",
  SEND_MESSAGE_API: import.meta.env.VITE_BASE_URL + "/api/v1/messages/send",
  GET_MESSAGES_FOR_HOSPITAL:
    import.meta.env.VITE_BASE_URL + "/api/v1/messages/users",
  GET_CONVERSATION:
    import.meta.env.VITE_BASE_URL + "/api/v1/messages/conversation",
  GET_USER: import.meta.env.VITE_BASE_URL + "/api/v1/users/",
  GET_ALL_USERS: import.meta.env.VITE_BASE_URL + "/api/v1/users/all",
};

export const announcementEndpoints = {
  GET_ANNOUNCEMENTS: import.meta.env.VITE_BASE_URL + "/api/v1/announcements",
  POST_ANNOUNCEMENTS: import.meta.env.VITE_BASE_URL + "/api/v1/announcements",
};
