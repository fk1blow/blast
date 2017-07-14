import IRequestAdapter from './irequestadapter';

interface IResourceTask {
  (adapter: IRequestAdapter, resource: string, params: object, headers: object): Promise<any>
}

export default IResourceTask;
