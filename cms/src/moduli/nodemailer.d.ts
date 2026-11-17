// nodemailer non ha tipi propri e @types/nodemailer non è installato: bastano le due funzioni usate.
declare module 'nodemailer' {
  interface Trasporto {
    sendMail(messaggio: Record<string, unknown>): Promise<unknown>
    verify(): Promise<unknown>
  }
  const nodemailer: { createTransport(opzioni: Record<string, unknown>): Trasporto }
  export default nodemailer
}
