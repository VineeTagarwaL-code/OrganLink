import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosInstance = axios.create({});

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
type UrlString = string;
type BodyData = unknown;
type Headers = Record<string, string> | null;
type Params = Record<string, unknown> | null;

export const apiConnector = async <T>(
    method: HttpMethod,
    url: UrlString,
    bodyData: BodyData,
    headers: Headers = {},
    params: Params = {}
): Promise<AxiosResponse<T>> => {

    const config: AxiosRequestConfig = {
        method,
        url,
        data: bodyData || null,
        headers: headers || {},
        params: params || null,
    };

    return axiosInstance(config);
};