export const END_POINTS = {
  AUTH: {
    /** Post */
    login: '/auth/signin',
    /** Post */
    register: '/auth/signup',
    /** Post */
    forgotPassword: 'auth/forgotPassword',
    /** Post */
    resetPassword: 'auth/resetPassword',
  },
  FLATS: {
    /** Get and Post */
    flats: '/flats',
    /** Get, Put and Delete */
    flatById: '/flats/:id',
  },
  BLOCKS: {
    /** Get and Post */
    blocks: '/blocks',
    /** Get, Put and Delete */
    blockById: '/blocks/:id',
  },
  APARTMENTS: {
    /** Get and Post */
    apartments: '/apartments',
    /** Get, Put and Delete */
    apartmentById: '/apartments/:id',
  },
  DOORS: {
    /** Get and Post */
    doors: '/doors',
    /** Get, Put and Delete */
    doorById: '/doors/:id',
  },
  CARS: {
    /** Get and Post */
    cars: '/cars',
    /** Get, Put and Delete */
    carById: '/car/:id',
  },
  USERS: {
    /** Get and Post */
    users: '/users',
    /** Get, Put and Delete */
    userById: '/users/:id',
  },
  ROLES: {
    /** Get and Post */
    roles: '/roles',
    /** Get, Put and Delete */
    roleById: '/users/:id',
  },
  REQUEST_CALLS: {
    /** Get and Post */
    requestCalls: '/requestCalls',
    /** Get, Put and Delete */
    requestCallById: '/requestCalls/:id',
  },
  GATE_PROCESSES: {
    /** Get and Post */
    gateProcesses: '/gateProcesses',
    /** Get, Put and Delete */
    gateProcessById: '/gateProcesses/:id',
  },
};
