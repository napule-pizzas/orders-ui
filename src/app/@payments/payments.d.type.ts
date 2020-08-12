export enum PAYMENT_STATUS {
  PENDING = 'pending', // El usuario no completo el proceso de pago todavía.
  AUTHORIZED = 'authorized', // El pago fue autorizado pero no capturado todavía.
  IN_PROCESS = 'in_process', // El pago está en revisión.
  APPROVED = 'approved', // El pago fue aprobado y acreditado.
  IN_MEDIATION = 'in_mediation', // El usuario inició una disputa.
  REJECTED = 'rejected', // El pago fue rechazado. El usuario podría reintentar el pago.
  CANCELLED = 'cancelled', // El pago fue cancelado por una de las partes o el pago expiró.
  REFUNDED = 'refunded', // El pago fue devuelto al usuario.
  CHARGED_BACK = 'charged_back' // Se ha realizado un contracargo en la tarjeta de crédito del comprador.
}
