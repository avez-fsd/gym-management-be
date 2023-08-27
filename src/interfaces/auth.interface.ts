export interface BusinessSignUpRequest {
    email:string,
    name: string,
    phoneNumber: string,
    address: string,
    pincode: string,
    state: string,
    country: string,
    password: string
}

export interface BusinessSignInRequest {
    email: string,
    password: string
}