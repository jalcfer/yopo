// export this to see the original selection
export const flavour = 'staging'

// use the secrets
export const secrets = true

// the base configuration
export const default_config={
  APP_CITY: 'Yopal',
  APP_CURRENCY: 'Yopo',
  APP_WEBSITE: '',
  TXT2PAY_NO: '+44 7441 906260',
  CASH_ONLY_TEXT: 'Cash Only Business',
  CYCLOS: {
    host: 'communities.cyclos.org',
    cyclosPrefix: 'cyclos',
    network: 'elyopo',
    wsPrefix: '',
    channel: undefined,
  },
  DIRECTORY: {
    host: 'api.bristolpound.org',
    cyclosPrefix: '',
    network: '',
    wsPrefix: '',
    apiVersion: '2'
  },
  ALLOW_LOGIN: true,
  DEFAULT_COORDINATES: { latitude: 51.454513, longitude:  -2.58791 },
  MAP_MAX_DISTANCE: 75,
  CASH_POINT_1: 'Here everyone can swap Sterling for Bristol Pounds, account holders can withdraw paper notes and businesses can deposit them.',
  CASH_POINT_2: 'Here everyone can swap Sterling for Bristol Pounds.',
  PRVACY_POLICY: `<div><p>Al utilizar la aplicación móvil Bristol Pound, presta su consentimiento a los términos de esta política de privacidad y a la recopilación, procesamiento y almacenamiento de su información personal para los fines establecidos en este documento. Si no está de acuerdo con esta política de privacidad, le pedimos que desista de utilizarla como una forma de exclusión. </ P> <p> Nos reservamos el derecho, a nuestra discreción, de cambiar esta política de privacidad en cualquier momento. . Dicho cambio entrará en vigencia 30 días después de la publicación de la política de privacidad revisada, y el uso continuado de los Servicios a partir de entonces significa que usted acepta esos cambios. </ P> <p> La aplicación móvil Bristol Pound recopila información con el fin de mejorar la servicios que ofrecemos, y para promocionar servicios de manera efectiva para usted. La aplicación recopila datos como información agregada no identificable personalmente. Esto incluye fechas y horas de transacción, tipos de usuario, geolocalizaciones aproximadas, patrones de uso y datos sobre el funcionamiento de la aplicación. No se almacena información sobre pagos personales, ni información personal identificable sobre su historial de transacciones o hábitos personales de compra. Todos los datos de pago se extraen y almacenan en el servidor de banca en línea administrado por Bristol Credit Union (BCU) y están cubiertos por su acuerdo de protección de datos por separado directamente con la BCU. </ P> <p> Sus derechos de acceso a los datos almacenados acerca de usted permanecerá de acuerdo con nuestra política de protección de datos en: <a href="https://bristolpound.org/data-protection-pledge" target="_blank"> https://bristolpound.org/data-protection-pledge</a></p></div>`,
}

// customisations for individual flavours are added here
export const configurations={
  staging: {
    APP_CURRENCY: 'Yopo Staging',
  },
  development: {
    APP_CURRENCY: 'Yopo Devel',
    CYCLOS: {
      host: 'dev-bristol.community-currency.org',
    },
  },
  production: {
    APP_CURRENCY: 'Yopo',
    TXT2PAY_NO: '+44 7441 900 333​',
    CYCLOS: {
      host: 'bristol.community-currency.org',
    }
  }
}

export default config = {}
