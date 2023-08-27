
export default interface PaymentChannelInteface {

    getPayloadRequest():any;
    initiatePayment():any;
    getPaymentReference():any;
    requestRefund():any;
    getPaymentStatus():any;

}