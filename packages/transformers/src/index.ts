import { DrawerState } from 'use-drawer';

declare class Page<T> {
  size: number;
  number: number;
  totalElements: number;
  content: T[];
}

type RequestHandler<T> = (pagination: DrawerState['pagination'], params: T) => T;
type ResponseHandler<T extends Page<any>> = (response: T) => ({ list: T['content'], total: T['totalElements'] });
// drawer 接口处理器
export function drawerApiHandler<A extends (...args: any[]) => any>(requestHandler: RequestHandler<Parameters<A>>, responseHandler: ResponseHandler<ReturnType<A>>) {
  return (api: A) => async (
    pagination: DrawerState['pagination'],
    params: any,
  ) => {
    const apiParams = requestHandler(pagination, params);
    const response = await api(...apiParams);
    return responseHandler(response);
  }
};

export function splitRequestHandler<T>(pagination: DrawerState['pagination'], params: T) {
  return [{ ...params, page: pagination.page - 1, size: pagination.pageSize }];
}

// export function requestHandlerA<T>(pagination: DrawerState['pagination'], params: T) {
//   return [{ form: { ...params, page: pagination.page - 1, size: pagination.pageSize } }];
// }

export function commonResponseHandler<T extends Page<any>>(response: T){
  return ({ list: response.content, total: response.totalElements });
}