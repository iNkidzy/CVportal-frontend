export interface ChatClient {
  // this is an interface, but also a model object. This domain info has to be
  // identical to the one on the backend in order to be able to send  it over the socket!:)
  id: string;
  nickname: string;
}
