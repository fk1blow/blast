interface IRequestAdapter {
  (endpoint: string, params: object, headers: object): () => Promise<any>;
}

export default IRequestAdapter;
